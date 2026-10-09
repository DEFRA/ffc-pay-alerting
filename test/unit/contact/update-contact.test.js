const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['contact'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { updateContact } = require('../../../app/contact')

beforeEach(() => {
  jest.clearAllMocks()
  mockDb.builder.resolves()
})

test('should update the contact when contactId is provided', async () => {
  const payload = {
    contactId: 1,
    emailAddress: 'test@example.com',
    modifiedBy: 'user',
    batch_rejected: true,
    batch_quarantined: false,
    payment_rejected: false,
    payment_dax_rejected: false,
    payment_invalid_bank: false,
    payment_processing_failed: false,
    payment_settlement_unsettled: false,
    payment_settlement_unmatched: false,
    response_rejected: false,
    payment_request_blocked: false,
    payment_dax_unavailable: false,
    receiver_connection_failed: false,
    demographics_processing_failed: false,
    demographics_update_failed: false,
    event_save_alert: false,
    table_create_alert: false,
    responses_processing_failed: false,
    customer_update_processing_failed: false,
    tracking_update_failure: false
  }

  const beforeCall = Date.now()
  await updateContact(payload)
  const afterCall = Date.now()

  expect(mockDb.tables.contact).toHaveBeenCalledTimes(1)
  expect(mockDb.builder.where).toHaveBeenCalledWith({ contactId: payload.contactId })
  expect(mockDb.builder.update).toHaveBeenCalledTimes(1)
  expect(mockDb.builder.insert).not.toHaveBeenCalled()

  const updateArg = mockDb.builder.update.mock.calls[0][0]

  expect(updateArg).not.toHaveProperty('contactId')
  expect(updateArg.emailAddress).toBe(payload.emailAddress)
  expect(updateArg.modifiedBy).toBe(payload.modifiedBy)
  expect(updateArg.modifiedAt).toBeInstanceOf(Date)
  expect(updateArg.modifiedAt.getTime()).toBeGreaterThanOrEqual(beforeCall)
  expect(updateArg.modifiedAt.getTime()).toBeLessThanOrEqual(afterCall)
  expect(updateArg.batch_rejected).toBe(payload.batch_rejected)
  expect(updateArg.batch_quarantined).toBe(payload.batch_quarantined)
  expect(updateArg.payment_rejected).toBe(payload.payment_rejected)
  expect(updateArg.payment_dax_rejected).toBe(payload.payment_dax_rejected)
  expect(updateArg.payment_invalid_bank).toBe(payload.payment_invalid_bank)
  expect(updateArg.payment_processing_failed).toBe(payload.payment_processing_failed)
  expect(updateArg.payment_settlement_unsettled).toBe(payload.payment_settlement_unsettled)
  expect(updateArg.payment_settlement_unmatched).toBe(payload.payment_settlement_unmatched)
  expect(updateArg.response_rejected).toBe(payload.response_rejected)
  expect(updateArg.payment_request_blocked).toBe(payload.payment_request_blocked)
  expect(updateArg.payment_dax_unavailable).toBe(payload.payment_dax_unavailable)
  expect(updateArg.receiver_connection_failed).toBe(payload.receiver_connection_failed)
  expect(updateArg.demographics_processing_failed).toBe(payload.demographics_processing_failed)
  expect(updateArg.demographics_update_failed).toBe(payload.demographics_update_failed)
  expect(updateArg.event_save_alert).toBe(payload.event_save_alert)
  expect(updateArg.table_create_alert).toBe(payload.table_create_alert)
  expect(updateArg.responses_processing_failed).toBe(payload.responses_processing_failed)
  expect(updateArg.customer_update_processing_failed).toBe(payload.customer_update_processing_failed)
  expect(updateArg.tracking_update_failure).toBe(payload.tracking_update_failure)
})

test('should insert a contact when contactId is not provided', async () => {
  const payload = {
    emailAddress: 'new@example.com',
    modifiedBy: 'creator',
    batch_rejected: false,
    batch_quarantined: true,
    payment_rejected: true,
    payment_dax_rejected: true,
    payment_invalid_bank: true,
    payment_processing_failed: true,
    payment_settlement_unsettled: true,
    payment_settlement_unmatched: true,
    response_rejected: true,
    payment_request_blocked: true,
    payment_dax_unavailable: true,
    receiver_connection_failed: true,
    demographics_processing_failed: true,
    demographics_update_failed: true,
    event_save_alert: true,
    table_create_alert: true,
    responses_processing_failed: true,
    customer_update_processing_failed: true,
    tracking_update_failure: true

  }

  const beforeCall = Date.now()
  await updateContact(payload)
  const afterCall = Date.now()

  expect(mockDb.tables.contact).toHaveBeenCalledTimes(1)
  expect(mockDb.builder.insert).toHaveBeenCalledTimes(1)
  expect(mockDb.builder.update).not.toHaveBeenCalled()

  const createArg = mockDb.builder.insert.mock.calls[0][0]

  expect(createArg).not.toHaveProperty('contactId')

  expect(createArg.emailAddress).toBe(payload.emailAddress)
  expect(createArg.modifiedBy).toBe(payload.modifiedBy)
  expect(createArg.modifiedAt).toBeInstanceOf(Date)
  expect(createArg.modifiedAt.getTime()).toBeGreaterThanOrEqual(beforeCall)
  expect(createArg.modifiedAt.getTime()).toBeLessThanOrEqual(afterCall)
  expect(createArg.batch_rejected).toBe(payload.batch_rejected)
  expect(createArg.batch_quarantined).toBe(payload.batch_quarantined)
  expect(createArg.payment_rejected).toBe(payload.payment_rejected)
  expect(createArg.payment_dax_rejected).toBe(payload.payment_dax_rejected)
  expect(createArg.payment_invalid_bank).toBe(payload.payment_invalid_bank)
  expect(createArg.payment_processing_failed).toBe(payload.payment_processing_failed)
  expect(createArg.payment_settlement_unsettled).toBe(payload.payment_settlement_unsettled)
  expect(createArg.payment_settlement_unmatched).toBe(payload.payment_settlement_unmatched)
  expect(createArg.response_rejected).toBe(payload.response_rejected)
  expect(createArg.payment_request_blocked).toBe(payload.payment_request_blocked)
  expect(createArg.payment_dax_unavailable).toBe(payload.payment_dax_unavailable)
  expect(createArg.receiver_connection_failed).toBe(payload.receiver_connection_failed)
  expect(createArg.demographics_processing_failed).toBe(payload.demographics_processing_failed)
  expect(createArg.demographics_update_failed).toBe(payload.demographics_update_failed)
  expect(createArg.event_save_alert).toBe(payload.event_save_alert)
  expect(createArg.table_create_alert).toBe(payload.table_create_alert)
  expect(createArg.responses_processing_failed).toBe(payload.responses_processing_failed)
  expect(createArg.customer_update_processing_failed).toBe(payload.customer_update_processing_failed)
  expect(createArg.tracking_update_failure).toBe(payload.tracking_update_failure)
})

test('should only pass contact columns to the insert', async () => {
  await updateContact({ emailAddress: 'new@example.com', modifiedBy: 'creator', notAColumn: 'value' })

  const createArg = mockDb.builder.insert.mock.calls[0][0]

  expect(createArg).not.toHaveProperty('notAColumn')
  expect(Object.keys(createArg)).toEqual([
    'emailAddress',
    'modifiedBy',
    'modifiedAt',
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
  ])
})

test('should propagate a database failure', async () => {
  mockDb.builder.rejects(new Error('DB error'))

  await expect(updateContact({ contactId: 1, emailAddress: 'test@example.com' })).rejects.toThrow('DB error')
})
