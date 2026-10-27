const TABLES = require('./tables')

const PRIMARY_KEYS = {
  [TABLES.contact]: 'contactId'
}

const COLUMNS = {
  [TABLES.contact]: [
    'contactId',
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
    'tracking_update_failure',
    'scheme_added'
  ],
  [TABLES.scheme]: [
    'schemeId',
    'name',
    'sourceSystem'
  ]
}

const pickColumns = (record, table) => {
  return Object.fromEntries(
    Object.entries(record)
      .filter(([column]) => COLUMNS[table].includes(column))
      .filter(([column]) => column !== PRIMARY_KEYS[table])
  )
}

module.exports = {
  PRIMARY_KEYS,
  COLUMNS,
  pickColumns
}
