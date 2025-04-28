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
  DEMOGRAPHICS_UPDATE_FAILED
} = require('../../../app/constants/events')

const { SFI, SFIP, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, ES, FC, IMPS, SFI23, DELINKED, SFI_EXPANDED } = require('../../../app/constants/source-systems')

const { alertConfig } = require('../../../app/config')

const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('get email addresses', () => {
  describe('getEmailAddresses - BATCH_REJECTED', () => {
    const event = BATCH_REJECTED

    test.each([
      SFI,
      SFIP,
      SFI23
    ])('should return sfiEmails, coreSolutionsTeamEmails, financeEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test.each([
      LUMP_SUMS,
      FDMR
    ])('should return coreSolutionsTeamEmails, financeEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return csEmails and devTeamEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return bpsEmails and devTeamEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return opsAnalysisEmails and devTeamEmails for ES', () => {
      const result = getEmailAddresses(event, ES)
      expect(result).toBe(`${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return opsAnalysisEmails and devTeamEmails for FC', () => {
      const result = getEmailAddresses(event, FC)
      expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return opsAnalysisEmails and devTeamEmails for IMPS', () => {
      const result = getEmailAddresses(event, IMPS)
      expect(result).toBe(`${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return opsAnalysisEmails and devTeamEmails for DELINKED', () => {
      const result = getEmailAddresses(event, DELINKED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return sfiEmails, opsAnalysisEmails and devTeamEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return devTeamEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - BATCH_QUARANTINED', () => {
    const event = BATCH_QUARANTINED

    test('should return bpsEmails, devTeamEmails, and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return csEmails, devTeamEmails, and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test.each([
      SFI,
      SFI23,
      SFIP,
      SFI_EXPANDED,
      DELINKED,
      LUMP_SUMS
    ])('should return opsAnalysisEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return devTeamEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - PAYMENT_REJECTED', () => {
    const event = PAYMENT_REJECTED

    test.each([
      SFI,
      SFIP,
      LUMP_SUMS
    ])('should return coreSolutionsTeamEmails, financeEmails, devTeamEmails, and opsAnalysisEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return csEmails, devTeamEmails, and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return vetVisitsEmails, financeEmails, and devTeamEmails for VET_VISITS', () => {
      const result = getEmailAddresses(event, VET_VISITS)
      expect(result).toBe(`${alertConfig.vetVisitsEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return bpsEmails, devTeamEmails, and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test.each([
      DELINKED,
      SFI_EXPANDED
    ])('should return opsAnalysisEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return coreSolutionsTeamEmails, financeEmails and devTeamEmails for DELINKED', () => {
      const result = getEmailAddresses(event, FDMR)
      expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return esEmails, financeEmails and devTeamEmails for  for ES', () => {
      const result = getEmailAddresses(event, ES)
      expect(result).toBe(`${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return fcEmails, financeEmails and devTeamEmails for  for ES', () => {
      const result = getEmailAddresses(event, FC)
      expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return traderEmails, financeEmails and devTeamEmails for  for ES', () => {
      const result = getEmailAddresses(event, IMPS)
      expect(result).toBe(`${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return devTeamEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - PAYMENT_DAX_REJECTED', () => {
    const event = PAYMENT_DAX_REJECTED

    test('should return bpsEmails, devTeamEmails, and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return csEmails, devTeamEmails, and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test.each([
      SFI,
      SFIP,
      SFI23,
      DELINKED,
      LUMP_SUMS
    ])('should return opsAnalysisEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return opsAnalysisEmails and devTeamEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return devTeamEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - PAYMENT_INVALID_BANK', () => {
    const event = PAYMENT_INVALID_BANK

    test('should return fcEmails and invalidBankDetailsEmails for FC', () => {
      const result = getEmailAddresses(event, FC)
      expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.invalidBankDetailsEmails}`)
    })

    test('should return opsAnalysisEmails and bpsEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.bpsEmails}`)
    })

    test('should return opsAnalysisEmails and csEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.csEmails}`)
    })

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysisEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails}`)
    })

    test('should return opsAnalysisEmails and esfioDAXEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.esfioDAXEmails}`)
    })

    test('should return opsAnalysisEmails and invalidBankDetailsEmails for DELINKED', () => {
      const result = getEmailAddresses(event, DELINKED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`)
    })

    test('should return opsAnalysisEmails and invalidBankDetailsEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.invalidBankDetailsEmails}`)
    })
  })

  describe('getEmailAddresses - PAYMENT_PROCESSING_FAILED', () => {
    const event = PAYMENT_PROCESSING_FAILED

    test('should return opsAnalysisEmails and devTeamEmails for DELINKED', () => {
      const result = getEmailAddresses(event, DELINKED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return sfiEmails, opsAnalysisEmails, and devTeamEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return csEmails, opsAnalysisEmails, and devTeamEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return bpsEmails, opsAnalysisEmails, and devTeamEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysisEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return devTeamEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - PAYMENT_SETTLEMENT_UNSETTLED', () => {
    const event = PAYMENT_SETTLEMENT_UNSETTLED

    test('should return csEmails and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return opsAnalysisEmails for DELINKED', () => {
      const result = getEmailAddresses(event, DELINKED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails}`)
    })

    test('should return sfiEmails and opsAnalysisEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysisEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails}`)
    })

    test('should return d365UnsettledEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.d365UnsettledEmails)
    })
  })

  describe('getEmailAddresses - PAYMENT_SETTLEMENT_UNMATCHED', () => {
    const event = PAYMENT_SETTLEMENT_UNMATCHED

    test('should return opsAnalysisEmails and devTeamEmails for DELINKED', () => {
      const result = getEmailAddresses(event, DELINKED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return sfiEmails, opsAnalysisEmails, and devTeamEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.sfiEmails};${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return csEmails, devTeamEmails, and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails, devTeamEmails, and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysisEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return devTeamEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - RESPONSE_REJECTED', () => {
    const event = RESPONSE_REJECTED

    test.each([
      DELINKED,
      SFI_EXPANDED,
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysisEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return csEmails, devTeamEmails, and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails, devTeamEmails, and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return devTeamEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - PAYMENT_REQUEST_BLOCKED', () => {
    const event = PAYMENT_REQUEST_BLOCKED

    test('should return opsAnalysisEmails and debtEnrichmentEmails for DELINKED', () => {
      const result = getEmailAddresses(event, DELINKED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.debtEnrichmentEmails}`)
    })

    test('should return opsAnalysisEmails and sfiEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.sfiEmails}`)
    })

    test('should return csEmails and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysisEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails}`)
    })

    test('should return debtEnrichmentEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.debtEnrichmentEmails)
    })
  })

  describe('getEmailAddresses - PAYMENT_DAX_UNAVAILABLE', () => {
    const event = PAYMENT_DAX_UNAVAILABLE

    test('should return opsAnalysisEmails, devTeamEmails, and daxUnavailableEmails for DELINKED', () => {
      const result = getEmailAddresses(event, DELINKED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`)
    })

    test('should return opsAnalysisEmails, devTeamEmails, and esfioDAXEmails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`)
    })

    test('should return csEmails, devTeamEmails, and opsAnalysisEmails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails, devTeamEmails, and opsAnalysisEmails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysisEmails and devTeamEmails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return devTeamEmails and daxUnavailableEmails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(`${alertConfig.devTeamEmails};${alertConfig.daxUnavailableEmails}`)
    })
  })

  describe('getEmailAddresses - RECEIVER_CONNECTION_FAILED', () => {
    const event = RECEIVER_CONNECTION_FAILED

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS,
      DELINKED
    ])('should return opsAnalysis and dev emails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return opsAnalysis, dev and esfioDAX emails for SFI_EXPANDED', () => {
      const result = getEmailAddresses(event, SFI_EXPANDED)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails};${alertConfig.esfioDAXEmails}`)
    })

    test('should return csEmails, dev and opsAnalysis emails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails, dev and opsAnalysis emails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return dev emails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(alertConfig.devTeamEmails)
    })
  })

  describe('getEmailAddresses - DEMOGRAPHICS_PROCESSING_FAILED', () => {
    const event = DEMOGRAPHICS_PROCESSING_FAILED

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysis and dev emails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test.each([
      DELINKED,
      SFI_EXPANDED
    ])('should return opsAnalysis, demographics, and dev emails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return csEmails, dev and opsAnalysis emails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails, dev and opsAnalysis emails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return demographics and dev emails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(`${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
    })
  })

  describe('getEmailAddresses - DEMOGRAPHICS_UPDATE_FAILED', () => {
    const event = DEMOGRAPHICS_UPDATE_FAILED

    test.each([
      SFI,
      SFI23,
      SFIP,
      LUMP_SUMS
    ])('should return opsAnalysis, demographics and dev emails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.devTeamEmails}`)
    })

    test.each([
      DELINKED,
      SFI_EXPANDED
    ])('should return opsAnalysis, demographics, and dev emails for %s', (sourceSystem) => {
      const result = getEmailAddresses(event, sourceSystem)
      expect(result).toBe(`${alertConfig.opsAnalysisEmails};${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
    })

    test('should return csEmails, dev and opsAnalysis emails for CS', () => {
      const result = getEmailAddresses(event, CS)
      expect(result).toBe(`${alertConfig.csEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return bpsEmails, dev and opsAnalysis emails for BPS', () => {
      const result = getEmailAddresses(event, BPS)
      expect(result).toBe(`${alertConfig.bpsEmails};${alertConfig.devTeamEmails};${alertConfig.opsAnalysisEmails}`)
    })

    test('should return demographics and dev emails for unknown sourceSystem (default)', () => {
      const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
      expect(result).toBe(`${alertConfig.demographicsEmails};${alertConfig.devTeamEmails}`)
    })
  })
})
