const {
  BATCH_REJECTED,
  BATCH_QUARANTINED,
  PAYMENT_REJECTED,
  PAYMENT_DAX_REJECTED,
  PAYMENT_INVALID_BANK,
  PAYMENT_PROCESSING_FAILED,
  PAYMENT_SETTLEMENT_UNMATCHED,
  RESPONSE_REJECTED,
  PAYMENT_REQUEST_BLOCKED
} = require('./events')

const { alertConfig } = require('../config')

module.exports = {
  [BATCH_REJECTED]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.devTeamEmails}`,
  [BATCH_QUARANTINED]: `${alertConfig.devTeamEmails}`,
  [PAYMENT_REJECTED]: `${alertConfig.devTeamEmails}`,
}
