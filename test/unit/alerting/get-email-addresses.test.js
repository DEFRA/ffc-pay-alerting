const events = require('../../../app/constants/events')
const db = require('../../../app/data')
const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('getEmailAddresses (new implementation)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const OpContains = Symbol('contains')
  beforeAll(() => {
    db.Sequelize = {
      Op: {
        contains: OpContains
      }
    }
  })

  beforeEach(() => {
    db.contact = {
      findAll: jest.fn()
    }
  })

  const mockContacts = emails => emails.map(email => ({ emailAddress: email }))

  test('returns empty array if eventType is unknown', async () => {
    const result = await getEmailAddresses('unknown_eventType', 1)
    expect(result).toEqual([])
    expect(db.contact.findAll).not.toHaveBeenCalled()
  })

  test('returns empty array if schemeId is 0', async () => {
    const result = await getEmailAddresses(events.BATCH_REJECTED, 0)
    expect(result).toEqual([])
    expect(db.contact.findAll).not.toHaveBeenCalled()
  })

  test('calls db.contact.findAll with correct where clause based on event and schemeId', async () => {
    const eventType = events.PAYMENT_REJECTED
    const schemeId = 123

    db.contact.findAll.mockResolvedValueOnce(mockContacts(['a@test.com', 'b@test.com']))

    const result = await getEmailAddresses(eventType, schemeId)

    expect(db.contact.findAll).toHaveBeenCalledWith({
      attributes: ['emailAddress'],
      where: {
        removedAt: null,
        payment_rejected: {
          [OpContains]: [schemeId]
        }
      }
    })

    expect(result).toEqual(['a@test.com', 'b@test.com'])
  })

  test('works correctly for different event types and schemeIds', async () => {
    const testCases = [
      { event: events.BATCH_REJECTED, key: 'batch_rejected', schemeId: 1, emails: ['x@example.com'] },
      { event: events.DEMOGRAPHICS_UPDATE_FAILED, key: 'demographics_update_failed', schemeId: 42, emails: ['demog@test.com', 'dev@test.com'] },
      { event: events.TABLE_CREATE_ALERT, key: 'table_create_alert', schemeId: 5, emails: [] }
    ]

    for (const { event, key, schemeId, emails } of testCases) {
      db.contact.findAll.mockResolvedValueOnce(mockContacts(emails))

      const result = await getEmailAddresses(event, schemeId)

      expect(db.contact.findAll).toHaveBeenCalledWith({
        attributes: ['emailAddress'],
        where: {
          removedAt: null,
          [key]: {
            [OpContains]: [schemeId]
          }
        }
      })

      expect(result).toEqual(emails)
    }
  })

  test('returns empty array if no contacts found', async () => {
    db.contact.findAll.mockResolvedValueOnce([])

    const result = await getEmailAddresses(events.BATCH_REJECTED, 10)

    expect(result).toEqual([])
  })

  test('handles multiple schemeIds as numbers and strings (schemeId as number)', async () => {
    const schemeId = 99
    db.contact.findAll.mockResolvedValueOnce(mockContacts(['multi@test.com']))

    const result = await getEmailAddresses(events.RESPONSE_REJECTED, schemeId)

    expect(db.contact.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          response_rejected: {
            [OpContains]: [schemeId]
          }
        })
      })
    )
    expect(result).toEqual(['multi@test.com'])
  })
})
