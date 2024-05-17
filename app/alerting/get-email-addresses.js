const alertConfig = require('../config/alert')
const events = require('../constants/events')
const sourceSystems = require('../constants/source-systems')

const getEmailAddresses = (eventType, sourceSystem) => {
  const lookupTable = {
    [events.BATCH_REJECTED]: {
      [sourceSystems.SFI]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.SFIP]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.SFI23]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.LUMP_SUMS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.CS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.BPS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.FDMR]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.ES]: `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.IMPS]: `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.BATCH_QUARANTINED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.PAYMENT_REJECTED]: {
      [sourceSystems.SFI]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.SFIP]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.LUMP_SUMS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.CS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.BPS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.FDMR]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.SFI23]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.VET_VISITS]: `${alertConfig.vetVisitsEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.ES]: `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.IMPS]: `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.PAYMENT_DAX_REJECTED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.PAYMENT_INVALID_BANK]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.invalidBankDetailsEmails}`,
      default: alertConfig.invalidBankDetailsEmails
    },
    [events.PAYMENT_PROCESSING_FAILED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.PAYMENT_SETTLEMENT_UNMATCHED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.RESPONSE_REJECTED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.PAYMENT_REQUEST_BLOCKED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.debtEnrichmentEmails}`,
      default: alertConfig.debtEnrichmentEmails
    },
    [events.PAYMENT_DAX_UNAVAILABLE]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`,
      default: `${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`
    },
    [events.RECEIVER_CONNECTION_FAILED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.devTeamEmails}`,
      default: alertConfig.devTeamEmails
    },
    [events.DEMOGRAPHICS_PROCESSING_FAILED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
      default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
    },
    [events.DEMOGRAPHICS_UPDATE_FAILED]: {
      [sourceSystems.DELINKED]: `${alertConfig.delinkedEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
      default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
    }
  }

  const emailAddresses = lookupTable[eventType]?.[sourceSystem] || lookupTable[eventType]?.default
  return emailAddresses
}

module.exports = {
  getEmailAddresses
}
