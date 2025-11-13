const mockAlertConfig = require('../mocks/alert-config')

jest.mock('../../app/config', () => ({
  alertConfig: mockAlertConfig
}))

jest.mock('../../app/config/alert', () => mockAlertConfig)

const {
  BATCH_REJECTED,
  BATCH_QUARANTINED,
  PAYMENT_REJECTED,
  PAYMENT_DAX_REJECTED,
  PAYMENT_INVALID_BANK,
  PAYMENT_PROCESSING_FAILED,
  PAYMENT_SETTLEMENT_UNSETTLED,
  PAYMENT_SETTLEMENT_UNMATCHED,
  RESPONSE_REJECTED,
  PAYMENT_REQUEST_BLOCKED,
  PAYMENT_DAX_UNAVAILABLE,
  RECEIVER_CONNECTION_FAILED,
  DEMOGRAPHICS_PROCESSING_FAILED,
  DEMOGRAPHICS_UPDATE_FAILED,
  EVENT_SAVE_ALERT,
  TABLE_CREATE_ALERT
} = require('../../app/constants/events')

const { SFI, SFIP, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, ES, FC, IMPS, SFI23, DELINKED, SFI_EXPANDED, COHT_REVENUE, COHT_CAPITAL } = require('../../app/constants/source-systems')

module.exports = {
  [BATCH_REJECTED]: {
    [SFI]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [SFIP]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI23]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails}`,
    [FDMR]: `${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [ES]: `${mockAlertConfig.esEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [FC]: `${mockAlertConfig.fcEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [IMPS]: `${mockAlertConfig.traderEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [BATCH_QUARANTINED]: {
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [PAYMENT_REJECTED]: {
    [SFI]: `${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [FDMR]: `${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI23]: `${mockAlertConfig.coreSolutionsTeamEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [VET_VISITS]: `${mockAlertConfig.vetVisitsEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [ES]: `${mockAlertConfig.esEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [FC]: `${mockAlertConfig.fcEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [IMPS]: `${mockAlertConfig.traderEmails};${mockAlertConfig.financeEmails};${mockAlertConfig.devTeamEmails}`,
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [PAYMENT_DAX_REJECTED]: {
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [PAYMENT_INVALID_BANK]: {
    [FC]: `${mockAlertConfig.fcEmails};${mockAlertConfig.invalidBankDetailsEmails}`,
    [BPS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.bpsEmails}`,
    [CS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.csEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.sfiEmails}`,
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.invalidBankDetailsEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails}`,
    [VET_VISITS]: `${mockAlertConfig.vetVisitsEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.invalidBankDetailsEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.invalidBankDetailsEmails}`
  },
  [PAYMENT_PROCESSING_FAILED]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [PAYMENT_SETTLEMENT_UNSETTLED]: {
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.opsAnalysisEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.opsAnalysisEmails}`,
    default: mockAlertConfig.d365UnsettledEmails
  },
  [PAYMENT_SETTLEMENT_UNMATCHED]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI23]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFIP]: `${mockAlertConfig.sfiEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [RESPONSE_REJECTED]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [PAYMENT_REQUEST_BLOCKED]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.debtEnrichmentEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.debtEnrichmentEmails
  },
  [PAYMENT_DAX_UNAVAILABLE]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.daxUnavailableEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.sfiEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: `${mockAlertConfig.devTeamEmails};${mockAlertConfig.daxUnavailableEmails}`
  },
  [RECEIVER_CONNECTION_FAILED]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.sfiEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.apTeamEmails};${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: mockAlertConfig.devTeamEmails
  },
  [DEMOGRAPHICS_PROCESSING_FAILED]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.demographicsEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.demographicsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: `${mockAlertConfig.demographicsEmails};${mockAlertConfig.devTeamEmails}`
  },
  [DEMOGRAPHICS_UPDATE_FAILED]: {
    [DELINKED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.demographicsEmails};${mockAlertConfig.devTeamEmails}`,
    [SFI_EXPANDED]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.demographicsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [CS]: `${mockAlertConfig.csEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [BPS]: `${mockAlertConfig.bpsEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.opsAnalysisEmails}`,
    [SFI]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFI23]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [SFIP]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails};${mockAlertConfig.sfiEmails}`,
    [LUMP_SUMS]: `${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_REVENUE]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    [COHT_CAPITAL]: `${mockAlertConfig.esfioDAXEmails};${mockAlertConfig.cshtEmails};${mockAlertConfig.opsAnalysisEmails};${mockAlertConfig.devTeamEmails}`,
    default: `${mockAlertConfig.demographicsEmails};${mockAlertConfig.devTeamEmails}`
  },
  [TABLE_CREATE_ALERT]: {
    default: mockAlertConfig.devTeamEmails
  },
  [EVENT_SAVE_ALERT]: {
    default: mockAlertConfig.devTeamEmails
  }
}
