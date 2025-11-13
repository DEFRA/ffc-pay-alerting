const { updateContact } = require('../../../app/contact')
const db = require('../../../app/data')

jest.mock('../../../app/data', () => ({
  contact: {
    update: jest.fn(),
    create: jest.fn()
  }
}))

beforeEach(() => {
  jest.clearAllMocks()
})

test('should call db.contact.update when contactId is provided', async () => {
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
    table_create_alert: false
  }

  const beforeCall = Date.now()
  await updateContact(payload)
  const afterCall = Date.now()

  expect(db.contact.update).toHaveBeenCalledTimes(1)
  expect(db.contact.create).not.toHaveBeenCalled()

  const updateArg = db.contact.update.mock.calls[0][0]
  const whereArg = db.contact.update.mock.calls[0][1]

  expect(whereArg).toEqual({ where: { contactId: payload.contactId } })
  expect(updateArg.emailAddress).toBe(payload.emailAddress)
  expect(updateArg.modifiedBy).toBe(payload.modifiedBy)
  expect(typeof updateArg.modifiedAt).toBe('number')
  expect(updateArg.modifiedAt).toBeGreaterThanOrEqual(beforeCall)
  expect(updateArg.modifiedAt).toBeLessThanOrEqual(afterCall)
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
})

test('should call db.contact.create when contactId is not provided', async () => {
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
    table_create_alert: true
  }

  const beforeCall = Date.now()
  await updateContact(payload)
  const afterCall = Date.now()

  expect(db.contact.create).toHaveBeenCalledTimes(1)
  expect(db.contact.update).not.toHaveBeenCalled()

  const createArg = db.contact.create.mock.calls[0][0]

  expect(createArg.emailAddress).toBe(payload.emailAddress)
  expect(createArg.modifiedBy).toBe(payload.modifiedBy)
  expect(typeof createArg.modifiedAt).toBe('number')
  expect(createArg.modifiedAt).toBeGreaterThanOrEqual(beforeCall)
  expect(createArg.modifiedAt).toBeLessThanOrEqual(afterCall)
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
})
