const db = require('../data')

const prepareContactData = (payload) => ({
  emailAddress: payload.emailAddress,
  modifiedBy: payload.modifiedBy,
  modifiedAt: Date.now(),
  batch_rejected: payload.batch_rejected,
  batch_quarantined: payload.batch_quarantined,
  payment_rejected: payload.payment_rejected,
  payment_dax_rejected: payload.payment_dax_rejected,
  payment_invalid_bank: payload.payment_invalid_bank,
  payment_processing_failed: payload.payment_processing_failed,
  payment_settlement_unsettled: payload.payment_settlement_unsettled,
  payment_settlement_unmatched: payload.payment_settlement_unmatched,
  response_rejected: payload.response_rejected,
  payment_request_blocked: payload.payment_request_blocked,
  payment_dax_unavailable: payload.payment_dax_unavailable,
  receiver_connection_failed: payload.receiver_connection_failed,
  demographics_processing_failed: payload.demographics_processing_failed,
  demographics_update_failed: payload.demographics_update_failed,
  event_save_alert: payload.event_save_alert,
  table_create_alert: payload.table_create_alert,
  responses_processing_failed: payload.responses_processing_failed,
  customer_update_processing_failed: payload.customer_update_processing_failed,
  tracking_update_failure: payload.tracking_update_failure
})

const updateContactRecord = async (contactId, data) => {
  await db.contact.update(data, { where: { contactId } })
}

const createContactRecord = async (data) => {
  await db.contact.create(data)
}

const updateContact = async (payload) => {
  const { contactId } = payload
  const contactData = prepareContactData(payload)

  if (contactId !== undefined && contactId !== null) {
    await updateContactRecord(contactId, contactData)
  } else {
    await createContactRecord(contactData)
  }
}

module.exports = {
  updateContact
}
