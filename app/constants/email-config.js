const alertConfig = require('../config/alert')
const events = require('./events')
const sourceSystems = require('./source-systems')

module.exports = {
  [events.BATCH_REJECTED]: {
    [sourceSystems.SFI]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.FDMR]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.ES]: `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.IMPS]: `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.BATCH_QUARANTINED]: {
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_REJECTED]: {
    [sourceSystems.SFI]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.FDMR]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.VET_VISITS]: `${alertConfig.vetVisitsEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.ES]: `${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.IMPS]: `${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_DAX_REJECTED]: {
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_INVALID_BANK]: {
    [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.invalidBankDetailsEmails}`,
    [sourceSystems.BPS]: `${alertConfig.opsAnalysisEmails};${alertConfig.bpsEmails}`,
    [sourceSystems.CS]: `${alertConfig.opsAnalysisEmails};${alertConfig.csEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.VET_VISITS]: `${alertConfig.vetVisitsEmails};${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`,
    default: `${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`
  },
  [events.PAYMENT_PROCESSING_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_SETTLEMENT_UNSETTLED]: {
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails}`,
    default: alertConfig.d365UnsettledEmails
  },
  [events.PAYMENT_SETTLEMENT_UNMATCHED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.RESPONSE_REJECTED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.PAYMENT_REQUEST_BLOCKED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.debtEnrichmentEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.sfiEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails}`,
    default: alertConfig.debtEnrichmentEmails
  },
  [events.PAYMENT_DAX_UNAVAILABLE]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`
  },
  [events.RECEIVER_CONNECTION_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: alertConfig.devTeamEmails
  },
  [events.DEMOGRAPHICS_PROCESSING_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  },
  [events.DEMOGRAPHICS_UPDATE_FAILED]: {
    [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
    [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
    default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
  },
  [events.TABLE_CREATE_ALERT]: {
    default: alertConfig.devTeamEmails
  },
  [events.EVENT_SAVE_ALERT]: {
    default: alertConfig.devTeamEmails
  }
}
