const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['contact'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { getContactById } = require('../../../app/contact')

beforeEach(() => {
  jest.clearAllMocks()
  mockDb.builder.resolves()
})

test('should query contacts for a contact that has not been removed', async () => {
  const contactId = 123

  await getContactById(contactId)

  expect(mockDb.tables.contact).toHaveBeenCalledTimes(1)
  expect(mockDb.builder.select).toHaveBeenCalledWith(
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
  )
  expect(mockDb.builder.whereNull).toHaveBeenCalledWith('removedAt')
  expect(mockDb.builder.where).toHaveBeenCalledWith({ contactId })
  expect(mockDb.builder.first).toHaveBeenCalledTimes(1)
})

test('should return contact when found', async () => {
  const contactId = 456
  const contactData = {
    contactId,
    emailAddress: 'found@example.com',
    batch_rejected: false
  }
  mockDb.builder.resolves(contactData)

  const result = await getContactById(contactId)

  expect(result).toEqual(contactData)
})

test('should return null when no contact is found', async () => {
  mockDb.builder.resolves(undefined)

  const result = await getContactById(789)

  expect(result).toBeNull()
})

test('should propagate a database failure', async () => {
  mockDb.builder.rejects(new Error('DB error'))

  await expect(getContactById(1)).rejects.toThrow('DB error')
})
