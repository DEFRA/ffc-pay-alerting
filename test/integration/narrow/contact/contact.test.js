const db = require('../../../../app/database')
const { truncate } = require('../../../helpers/truncate')

const events = require('../../../../app/constants/events')
const { getEmailAddresses } = require('../../../../app/alerting/get-email-addresses')
const {
  getContactByEmail,
  getContactById,
  getContactsByScheme,
  removeContactById,
  updateContact
} = require('../../../../app/contact')

const schemeId = 5
const otherSchemeId = 6

describe('contact queries', () => {
  beforeEach(async () => {
    await truncate()
  })

  afterAll(async () => {
    await truncate()
    await db.close()
  })

  test('updateContact inserts a new contact with only contact columns', async () => {
    await updateContact({ emailAddress: 'new@example.com', modifiedBy: 'creator', batch_rejected: [schemeId], notAColumn: 'ignored' })

    const [saved] = await db.contact()
    expect(saved.emailAddress).toBe('new@example.com')
    expect(saved.modifiedBy).toBe('creator')
    expect(saved.modifiedAt).toBeInstanceOf(Date)
    expect(saved.batch_rejected).toEqual([schemeId])
    expect(saved.payment_rejected).toBeNull()
  })

  test('updateContact updates an existing contact and leaves omitted columns unchanged', async () => {
    const [{ contactId }] = await db.contact().insert({ emailAddress: 'old@example.com', removedBy: 'someone' }).returning('contactId')

    await updateContact({ contactId, emailAddress: 'updated@example.com', modifiedBy: 'editor', payment_rejected: [schemeId, otherSchemeId] })

    const saved = await db.contact().where({ contactId }).first()
    expect(saved.emailAddress).toBe('updated@example.com')
    expect(saved.modifiedBy).toBe('editor')
    expect(saved.modifiedAt).toBeInstanceOf(Date)
    expect(saved.payment_rejected).toEqual([schemeId, otherSchemeId])
    expect(saved.removedBy).toBe('someone')
  })

  test('removeContactById sets removedBy and removedAt', async () => {
    const [{ contactId }] = await db.contact().insert({ emailAddress: 'remove@example.com' }).returning('contactId')

    await removeContactById(contactId, 'admin')

    const saved = await db.contact().where({ contactId }).first()
    expect(saved.removedBy).toBe('admin')
    expect(saved.removedAt).toBeInstanceOf(Date)
  })

  test('getContactById returns an active contact and null for a removed one', async () => {
    const [{ contactId: activeId }] = await db.contact().insert({ emailAddress: 'active@example.com', batch_rejected: [schemeId] }).returning('contactId')
    const [{ contactId: removedId }] = await db.contact().insert({ emailAddress: 'removed@example.com', removedAt: new Date() }).returning('contactId')

    const active = await getContactById(activeId)
    expect(active.contactId).toBe(activeId)
    expect(active.emailAddress).toBe('active@example.com')
    expect(active.batch_rejected).toEqual([schemeId])
    expect(active).not.toHaveProperty('removedAt')

    expect(await getContactById(removedId)).toBeNull()
  })

  test('getContactByEmail matches case-insensitively and ignores removed contacts', async () => {
    await db.contact().insert([
      { emailAddress: 'Mixed.Case@Example.com' },
      { emailAddress: 'gone@example.com', removedAt: new Date() }
    ])

    const found = await getContactByEmail('  mixed.case@EXAMPLE.COM ')
    expect(found.emailAddress).toBe('Mixed.Case@Example.com')

    expect(await getContactByEmail('gone@example.com')).toBeNull()
    expect(await getContactByEmail('missing@example.com')).toBeNull()
  })

  test('getContactsByScheme returns active contacts subscribed to the scheme on any alert', async () => {
    await db.contact().insert([
      { emailAddress: 'batch@example.com', batch_rejected: [schemeId] },
      { emailAddress: 'tracking@example.com', tracking_update_failure: [otherSchemeId, schemeId] },
      { emailAddress: 'other@example.com', payment_rejected: [otherSchemeId] },
      { emailAddress: 'none@example.com' },
      { emailAddress: 'removed@example.com', batch_rejected: [schemeId], removedAt: new Date() }
    ])

    const filtered = await getContactsByScheme(String(schemeId))
    expect(filtered.map(({ emailAddress }) => emailAddress).sort()).toEqual(['batch@example.com', 'tracking@example.com'])

    const all = await getContactsByScheme()
    expect(all).toHaveLength(4)
  })

  test('getEmailAddresses returns active contacts whose event array contains the scheme', async () => {
    await db.contact().insert([
      { emailAddress: 'match@example.com', payment_rejected: [otherSchemeId, schemeId] },
      { emailAddress: 'wrong-scheme@example.com', payment_rejected: [otherSchemeId] },
      { emailAddress: 'wrong-event@example.com', batch_rejected: [schemeId] },
      { emailAddress: 'removed@example.com', payment_rejected: [schemeId], removedAt: new Date() }
    ])

    const emails = await getEmailAddresses(events.PAYMENT_REJECTED, schemeId)

    expect(emails).toEqual(['match@example.com'])
  })
})
