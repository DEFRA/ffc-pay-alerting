const db = require('../data')

/* eslint-disable camelcase */
const updateContact = async (payload) => {
  console.log(payload)
  const {
    contactId,
    emailAddress,
    modifiedBy,
    batch_rejected,
    batch_quarantined,
    payment_rejected,
    payment_dax_rejected,
    payment_invalid_bank,
    payment_processing_failed,
    payment_settlement_unsettled,
    payment_settlement_unmatched,
    response_rejected,
    payment_request_blocked,
    payment_dax_unavailable,
    receiver_connection_failed,
    demographics_processing_failed,
    demographics_update_failed,
    event_save_alert,
    table_create_alert
  } = payload

  if (contactId) {
    await db.contact.update({
      emailAddress,
      modifiedBy,
      modifiedAt: Date.now(),
      batch_rejected,
      batch_quarantined,
      payment_rejected,
      payment_dax_rejected,
      payment_invalid_bank,
      payment_processing_failed,
      payment_settlement_unsettled,
      payment_settlement_unmatched,
      response_rejected,
      payment_request_blocked,
      payment_dax_unavailable,
      receiver_connection_failed,
      demographics_processing_failed,
      demographics_update_failed,
      event_save_alert,
      table_create_alert
    }, {
      where: {
        contactId
      }
    })
  } else {
    await db.contact.create({
      emailAddress,
      modifiedBy,
      modifiedAt: Date.now(),
      batch_rejected,
      batch_quarantined,
      payment_rejected,
      payment_dax_rejected,
      payment_invalid_bank,
      payment_processing_failed,
      payment_settlement_unsettled,
      payment_settlement_unmatched,
      response_rejected,
      payment_request_blocked,
      payment_dax_unavailable,
      receiver_connection_failed,
      demographics_processing_failed,
      demographics_update_failed,
      event_save_alert,
      table_create_alert
    })
  }
}

module.exports = {
  updateContact
}
