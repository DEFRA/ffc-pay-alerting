const db = require('../data')

const getContactById = async (contactId) => {
  return db.contact.findOne({
    where: {
      removedAt: null,
      contactId
    },
    raw: true,
    attributes: ['contactId', 'emailAddress', 'batch_rejected', 'batch_quarantined', 'payment_rejected', 'payment_dax_rejected', 'payment_invalid_bank', 'payment_processing_failed', 'payment_settlement_unsettled', 'payment_settlement_unmatched', 'response_rejected', 'payment_request_blocked', 'payment_dax_unavailable', 'receiver_connection_failed', 'demographics_processing_failed', 'demographics_update_failed', 'event_save_alert', 'table_create_alert']
  })
}

module.exports = {
  getContactById
}
