const {
  BATCH_REJECTED,
  BATCH_QUARANTINED,
  PAYMENT_REJECTED,
  PAYMENT_DAX_REJECTED,
  PAYMENT_INVALID_BANK,
  PAYMENT_PROCESSING_FAILED,
  PAYMENT_SETTLEMENT_UNMATCHED,
  RESPONSE_REJECTED,
  PAYMENT_REQUEST_BLOCKED,
  PAYMENT_DAX_UNAVAILABLE,
  RECEIVER_CONNECTION_FAILED
} = require('../constants/events')

const {
  SFI,
  SFIP,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  ES,
  FC,
  IMPS,
  SFI23
} = require('../constants/source-systems')

const { alertConfig } = require('../config')

const getEmailAddresses = (eventType, sourceSystem) => {
  switch (eventType) {
    case BATCH_REJECTED:
      if ([SFI, SFIP, LUMP_SUMS, CS, BPS, FDMR, SFI23].includes(sourceSystem)) {
        return `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if (sourceSystem === ES) {
        return `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if (sourceSystem === FC) {
        return `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if (sourceSystem === IMPS) {
        return `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case BATCH_QUARANTINED:
      return alertConfig.devTeamEmails
    case PAYMENT_REJECTED:
      if ([SFI, SFIP, LUMP_SUMS, CS, BPS, FDMR, SFI23].includes(sourceSystem)) {
        return `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if (sourceSystem === VET_VISITS) {
        return `${alertConfig.vetVisitsEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if (sourceSystem === ES) {
        return `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if (sourceSystem === FC) {
        return `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if (sourceSystem === IMPS) {
        return `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
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
    case PAYMENT_DAX_UNAVAILABLE:
      return alertConfig.devTeamEmails
    case RECEIVER_CONNECTION_FAILED:
      return alertConfig.devTeamEmails
    default:
      return undefined
  }
}

module.exports = {
  getEmailAddresses
}
