const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['contact'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { getContactByEmail } = require('../../../app/contact')

const attributes = [
  'contactId',
  'emailAddress',
  'batch_rejected',
  'batch_quarantined',
  'duplicate_payment',
  'payment_rejected',
  'payment_dax_rejected',
  'payment_invalid_bank',
  'payment_processing_failed',
  'payment_settlement_unsettled',
  'payment_settlement_unmatched',
  'response_rejected',
  'payment_request_blocked',
  'payment_dax_unavailable',
  'receiver_connection_failed',
  'demographics_processing_failed',
  'demographics_update_failed',
  'event_save_alert',
  'table_create_alert',
  'responses_processing_failed',
  'customer_update_processing_failed',
  'tracking_update_failure'
]

describe('getContactByEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves()
  })

  test('should query contacts with a case-insensitive email predicate', async () => {
    const email = 'test@example.com'

    await getContactByEmail(email)

    expect(mockDb.tables.contact).toHaveBeenCalledTimes(1)
    expect(mockDb.builder.select).toHaveBeenCalledWith(...attributes)
    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('removedAt')
    expect(mockDb.builder.whereRaw).toHaveBeenCalledWith('LOWER(??) = ?', ['emailAddress', email])
    expect(mockDb.builder.first).toHaveBeenCalledTimes(1)
  })

  test('should trim and convert the email address to lowercase before querying', async () => {
    await getContactByEmail('  Test.User@Example.COM  ')

    expect(mockDb.builder.whereRaw).toHaveBeenCalledWith('LOWER(??) = ?', ['emailAddress', 'test.user@example.com'])
  })

  test('should return contact when found', async () => {
    const contactData = {
      contactId: 1,
      emailAddress: 'found@example.com',
      batch_rejected: false
    }
    mockDb.builder.resolves(contactData)

    const result = await getContactByEmail('FOUND@EXAMPLE.COM')

    expect(result).toEqual(contactData)
  })

  test('should return null when no contact is found', async () => {
    mockDb.builder.resolves(undefined)

    const result = await getContactByEmail('notfound@example.com')

    expect(result).toBeNull()
  })

  test('should propagate a database failure', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(getContactByEmail('test@example.com')).rejects.toThrow('DB error')
  })
})
