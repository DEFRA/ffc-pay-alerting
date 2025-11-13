const mockAlertConfig = require('../../mocks/alert-config')
const mockEmailConfig = require('../../mocks/email-config')

jest.mock('../../../app/config', () => ({
  alertConfig: mockAlertConfig
}))

jest.mock('../../../app/config/alert', () => mockAlertConfig)

const { alertConfig } = require('../../../app/config')
const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

const { BATCH_REJECTED } = require('../../../app/constants/events')

describe('getEmailAddressesAllEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    alertConfig.pdsTeamEmails = null
  })

  test('pdsTeamEmails should be added if not empty', () => {
    alertConfig.pdsTeamEmails = 'testPDS@test.com'

    const result = getEmailAddresses(BATCH_REJECTED, 'UNKNOWN_SYSTEM')

    expect(result).toContain(alertConfig.pdsTeamEmails)
  })

  Object.entries(mockEmailConfig).forEach(([event, systems]) => {
    describe(event, () => {
      const testCases = Object.entries(systems).filter(([sourceSystem]) => sourceSystem !== 'default')

      if (testCases.length > 0) {
        test.each(testCases)(
          'should return correct emails for source system %s',
          (sourceSystem, emails) => {
            const result = getEmailAddresses(event, sourceSystem)
            expect(result).toBe(emails)
          }
        )
      }

      if (systems.default) {
        test('should return default emails for unknown source system', () => {
          const result = getEmailAddresses(event, 'UNKNOWN_SYSTEM')
          expect(result).toBe(systems.default)
        })
      }
    })
  })
})
