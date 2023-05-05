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
} = require('../../../app/constants/events')

const { BATCH_PROCESSOR, ENRICHMENT } = require('../../../app/constants/sources')

const { alertConfig } = require('../../../app/config')

const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('get email addresses', () => {
  test('should return core solutions and dev emails for batch rejected warning', () => {
    const result = getEmailAddresses(BATCH_REJECTED, BATCH_PROCESSOR)
    expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for batch quarantined warning', () => {
    const result = getEmailAddresses(BATCH_QUARANTINED, BATCH_PROCESSOR)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return core solutions and dev emails for payment rejected warning if from batch processor', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, BATCH_PROCESSOR)
    expect(result).toBe(`${alertConfig.coreSolutionsTeamEmails};${alertConfig.devTeamEmails}`)
  })

  test('should return dev emails for payment rejected warning if not from batch processor', () => {
    const result = getEmailAddresses(PAYMENT_REJECTED, ENRICHMENT)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return dev emails for payment dax rejected warning', () => {
    const result = getEmailAddresses(PAYMENT_DAX_REJECTED, BATCH_PROCESSOR)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return invalid bank details emails for payment invalid bank warning', () => {
    const result = getEmailAddresses(PAYMENT_INVALID_BANK, BATCH_PROCESSOR)
    expect(result).toBe(alertConfig.invalidBankDetailsEmails)
  })

  test('should return dev emails for payment processing failed warning', () => {
    const result = getEmailAddresses(PAYMENT_PROCESSING_FAILED, BATCH_PROCESSOR)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return dev emails for payment settlement unmatched warning', () => {
    const result = getEmailAddresses(PAYMENT_SETTLEMENT_UNMATCHED, BATCH_PROCESSOR)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return dev emails for response rejected warning', () => {
    const result = getEmailAddresses(RESPONSE_REJECTED, BATCH_PROCESSOR)
    expect(result).toBe(alertConfig.devTeamEmails)
  })

  test('should return debt enrichment emails for payment request blocked warning', () => {
    const result = getEmailAddresses(PAYMENT_REQUEST_BLOCKED, BATCH_PROCESSOR)
    expect(result).toBe(alertConfig.debtEnrichmentEmails)
  })
})
