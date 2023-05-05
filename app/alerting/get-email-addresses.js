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
} = require('../constants/events')

const { BATCH_PROCESSOR } = require('../constants/sources')

const { alertConfig } = require('../config')

const getEmailAddresses = (eventType, eventSource) => {
  switch (eventType) {
    case BATCH_REJECTED:
      return `${alertConfig.coreSolutionsTeamEmails};${alertConfig.devTeamEmails}`
    case BATCH_QUARANTINED:
      return alertConfig.devTeamEmails
    case PAYMENT_REJECTED:
      if (eventSource === BATCH_PROCESSOR) {
        return `${alertConfig.coreSolutionsTeamEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case PAYMENT_DAX_REJECTED:
      return alertConfig.devTeamEmails
    case PAYMENT_INVALID_BANK:
      return alertConfig.invalidBankDetailsEmails
    case PAYMENT_PROCESSING_FAILED:
      return alertConfig.devTeamEmails
    case PAYMENT_SETTLEMENT_UNMATCHED:
      return alertConfig.devTeamEmails
    case RESPONSE_REJECTED:
      return alertConfig.devTeamEmails
    case PAYMENT_REQUEST_BLOCKED:
      return alertConfig.debtEnrichmentEmails
    default:
      return undefined
  }
}

module.exports = {
  getEmailAddresses
}
