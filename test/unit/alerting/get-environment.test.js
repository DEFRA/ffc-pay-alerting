jest.mock('../../../app/config')
const { alertConfig: mockAlertConfig } = require('../../../app/config')

const {
  LOCAL,
  SANDPIT,
  DEVELOPMENT,
  TEST,
  PRE_PRODUCTION,
  PRODUCTION
} = require('../../../app/constants/environment-codes')

const {
  LOCAL_NAME,
  SANDPIT_NAME,
  DEVELOPMENT_NAME,
  TEST_NAME,
  PRE_PRODUCTION_NAME,
  PRODUCTION_NAME
} = require('../../../app/constants/environment-names')

const { UNKNOWN } = require('../../../app/constants/unknown')

const { getEnvironment } = require('../../../app/alerting/get-environment')

describe('getEnvironmentAllCases', () => {
  const testCases = [
    [LOCAL, LOCAL_NAME],
    [SANDPIT, SANDPIT_NAME],
    [DEVELOPMENT, DEVELOPMENT_NAME],
    [TEST, TEST_NAME],
    [PRE_PRODUCTION, PRE_PRODUCTION_NAME],
    [PRODUCTION, PRODUCTION_NAME],
    ['snd2', UNKNOWN] // unknown environment
  ]

  test.each(testCases)(
    'should return correct name for environment %s',
    (envCode, expectedName) => {
      mockAlertConfig.environment = envCode
      const result = getEnvironment()
      expect(result).toBe(expectedName)
    }
  )
})
