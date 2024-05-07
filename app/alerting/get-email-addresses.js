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
  RECEIVER_CONNECTION_FAILED,
  DEMOGRAPHICS_PROCESSING_FAILED,
  DEMOGRAPHICS_UPDATE_FAILED
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
  SFI23,
  DELINKED
} = require('../constants/source-systems')

const { alertConfig } = require('../config')

const getEmailAddresses = (eventType, sourceSystem) => {
  switch (eventType) {
    case BATCH_REJECTED:
      if ([SFI, SFIP, SFI23].includes(sourceSystem)) {
        return `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`
      }
      if ([LUMP_SUMS, CS, BPS, FDMR].includes(sourceSystem)) {
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
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case BATCH_QUARANTINED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
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
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case PAYMENT_DAX_REJECTED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case PAYMENT_INVALID_BANK:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.invalidBankDetailsEmails}`
      }
      return alertConfig.invalidBankDetailsEmails
    case PAYMENT_PROCESSING_FAILED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case PAYMENT_SETTLEMENT_UNMATCHED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case RESPONSE_REJECTED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case PAYMENT_REQUEST_BLOCKED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.debtEnrichmentEmails}`
      }
      return alertConfig.debtEnrichmentEmails
    case PAYMENT_DAX_UNAVAILABLE:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`
      }
      return `${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`
    case RECEIVER_CONNECTION_FAILED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`
      }
      return alertConfig.devTeamEmails
    case DEMOGRAPHICS_PROCESSING_FAILED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
      }
      return `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
    case DEMOGRAPHICS_UPDATE_FAILED:
      if (sourceSystem === DELINKED) {
        return `${alertConfig.delinkedEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
      }
      return `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
    default:
      return undefined
  }
}

module.exports = {
  getEmailAddresses
}
