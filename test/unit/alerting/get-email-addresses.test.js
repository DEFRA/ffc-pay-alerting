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
  DEMOGRAPHICS_UPDATE_FAILED
} = require('../../../app/constants/events')

const { SFI, SFIP, LUMP_SUMS, VET_VISITS, CS, BPS, FDMR, ES, FC, IMPS, SFI23 } = require('../../../app/constants/source-systems')

const { alertConfig } = require('../../../app/config')

const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('get email addresses', () => {
  test.each([
    SFI,
    SFIP,
    LUMP_SUMS,
    CS,
    BPS,
    FDMR,
    SFI23
  ])('should return core solutions, finance and dev emails for batch rejected warning if Siti agri scheme or FDMR', (sourceSystem) => {
    const result = getEmailAddresses(BATCH_REJECTED, sourceSystem)
    expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ES, finance and dev emails for batch rejected warning if ES', () => {
    const result = getEmailAddresses(BATCH_REJECTED, ES)
    expect(result).toBe(`${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return FC, finance and dev emails for batch rejected warning if FC', () => {
    const result = getEmailAddresses(BATCH_REJECTED, FC)
    expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return Trader, finance and dev emails for batch rejected warning if IMPS', () => {
    const result = getEmailAddresses(BATCH_REJECTED, IMPS)
    expect(result).toBe(`${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for batch quarantined warning', () => {
    const result = getEmailAddresses(BATCH_QUARANTINED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test.each([
    SFI,
    SFIP,
    LUMP_SUMS,
    CS,
    BPS,
    FDMR,
    SFI23
  ])('should return core solutions, finance and dev emails for payment rejected warning if Siti agri scheme or FDMR', (sourceSystem) => {
    const result = getEmailAddresses(PAYMENT_REJECTED, sourceSystem)
    expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return vet visits, finance and dev emails for payment rejected warning if vet visits', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, VET_VISITS)
    expect(result).toBe(`${alertConfig.vetVisitsEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return ES, finance and dev emails for payment rejected warning if ES', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, ES)
    expect(result).toBe(`${alertConfig.esEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return FC, finance and dev emails for payment rejected warning if FC', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, FC)
    expect(result).toBe(`${alertConfig.fcEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return Trader, finance and dev emails for payment rejected warning if IMPS', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, IMPS)
    expect(result).toBe(`${alertConfig.traderEmails};${alertConfig.financeEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for payment dax rejected warning', () => {
    const result = getEmailAddresses(PAYMENT_DAX_REJECTED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return invalid bank details emails for payment invalid bank warning', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK)
    expect(result).toBe(alertConfig.invalidBankDetailsEmails)
  })

  test('should return dev emails for payment processing failed warning', () => {
    const result = getEmailAddresses(PAYMENT_PROCESSING_FAILED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return dev emails for payment settlement unmatched warning', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNMATCHED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return dev emails for response rejected warning', () => {
    const result = getEmailAddresses(RESPONSE_REJECTED)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return debt enrichment emails for payment request blocked warning', () => {
    const result = getEmailAddresses(PAYMENT_REQUEST_BLOCKED)
    expect(result).toBe(alertConfig.debtEnrichmentEmails)
  })

  test('should return demographics emails for demographics updates failed warning', () => {
    const result = getEmailAddresses(DEMOGRAPHICS_UPDATE_FAILED)
    expect(result).toBe(alertConfig.demographicsEmails)
  })

  test('should not return any emails not set', () => {
    alertConfig.esEmails = ''
    alertConfig.financeEmails = ''
    alertConfig.devTeamEmails = ''
    const result = getEmailAddresses(BATCH_REJECTED, ES)
    expect(result).toBe(';;')
  })

  test('should return dev emails for dax unavailable warning', () => {
    const result = getEmailAddresses(PAYMENT_DAX_UNAVAILABLE)
    expect(result).toBe(alertConfig.devTeamEmails)
  })
})
