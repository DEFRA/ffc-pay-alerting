const alertConfig = require('../config/alert')
const events = require('./events')
const sourceSystems = require('./source-systems')

const COHT_FULL = `${alertConfig.apTeamEmails};${alertConfig.esfioDAXEmails};${alertConfig.cshtEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`
const COHT_NO_AP = `${alertConfig.esfioDAXEmails};${alertConfig.cshtEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`
const COHT_CSHT_OPS_DEV = `${alertConfig.cshtEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`

const setCOHT = (map, value) => {
  map[sourceSystems.COHT_REVENUE] = value
  map[sourceSystems.COHT_CAPITAL] = value
}

const batchRejected = {
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
}
setCOHT(batchRejected, COHT_FULL)

const batchQuarantined = {
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: alertConfig.devTeamEmails
}
setCOHT(batchQuarantined, COHT_FULL)

const paymentRejected = {
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
}
setCOHT(paymentRejected, COHT_FULL)

const paymentDaxRejected = {
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.apTeamEmails};${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: alertConfig.devTeamEmails
}
setCOHT(paymentDaxRejected, COHT_FULL)

const paymentInvalidBank = {
  [sourceSystems.FC]: `${alertConfig.fcEmails};${alertConfig.invalidBankDetailsEmails}`,
  [sourceSystems.BPS]: `${alertConfig.opsAnalysisEmails};${alertConfig.bpsEmails}`,
  [sourceSystems.CS]: `${alertConfig.opsAnalysisEmails};${alertConfig.csEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.apTeamEmails};${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails}`,
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.VET_VISITS]: `${alertConfig.vetVisitsEmails};${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`,
  default: `${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`
}
setCOHT(paymentInvalidBank, COHT_FULL)

const paymentProcessingFailed = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: alertConfig.devTeamEmails
}
setCOHT(paymentProcessingFailed, COHT_FULL)

const paymentSettlementUnsettled = {
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails}`,
  default: alertConfig.d365UnsettledEmails
}
// COHT entries for this event use only opsAnalysisEmails (same for both)
setCOHT(paymentSettlementUnsettled, `${alertConfig.opsAnalysisEmails}`)

const paymentSettlementUnmatched = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: alertConfig.devTeamEmails
}
setCOHT(paymentSettlementUnmatched, COHT_NO_AP)

const responseRejected = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: alertConfig.devTeamEmails
}
setCOHT(responseRejected, COHT_NO_AP)

const paymentRequestBlocked = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.debtEnrichmentEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.sfiEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails}`,
  default: alertConfig.debtEnrichmentEmails
}
setCOHT(paymentRequestBlocked, COHT_CSHT_OPS_DEV)

const paymentDaxUnavailable = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.apTeamEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: `${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`
}
setCOHT(paymentDaxUnavailable, COHT_FULL)

const receiverConnectionFailed = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.apTeamEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: alertConfig.devTeamEmails
}
setCOHT(receiverConnectionFailed, COHT_FULL)

const demographicsProcessingFailed = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
}
setCOHT(demographicsProcessingFailed, COHT_NO_AP)

const demographicsUpdateFailed = {
  [sourceSystems.DELINKED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI_EXPANDED]: `${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.CS]: `${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.BPS]: `${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`,
  [sourceSystems.SFI]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFI23]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.SFIP]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  [sourceSystems.LUMP_SUMS]: `${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`,
  default: `${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`
}
setCOHT(demographicsUpdateFailed, COHT_NO_AP)

const tableCreateAlert = {
  default: alertConfig.devTeamEmails
}

const eventSaveAlert = {
  default: alertConfig.devTeamEmails
}

module.exports = {
  [events.BATCH_REJECTED]: batchRejected,
  [events.BATCH_QUARANTINED]: batchQuarantined,
  [events.PAYMENT_REJECTED]: paymentRejected,
  [events.PAYMENT_DAX_REJECTED]: paymentDaxRejected,
  [events.PAYMENT_INVALID_BANK]: paymentInvalidBank,
  [events.PAYMENT_PROCESSING_FAILED]: paymentProcessingFailed,
  [events.PAYMENT_SETTLEMENT_UNSETTLED]: paymentSettlementUnsettled,
  [events.PAYMENT_SETTLEMENT_UNMATCHED]: paymentSettlementUnmatched,
  [events.RESPONSE_REJECTED]: responseRejected,
  [events.PAYMENT_REQUEST_BLOCKED]: paymentRequestBlocked,
  [events.PAYMENT_DAX_UNAVAILABLE]: paymentDaxUnavailable,
  [events.RECEIVER_CONNECTION_FAILED]: receiverConnectionFailed,
  [events.DEMOGRAPHICS_PROCESSING_FAILED]: demographicsProcessingFailed,
  [events.DEMOGRAPHICS_UPDATE_FAILED]: demographicsUpdateFailed,
  [events.TABLE_CREATE_ALERT]: tableCreateAlert,
  [events.EVENT_SAVE_ALERT]: eventSaveAlert
}
