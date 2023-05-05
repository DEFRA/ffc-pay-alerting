const { alertConfig } = require('../config')
const { LOCAL, DEVELOPMENT, TEST, PRE_PRODUCTION, PRODUCTION } = require('../constants/environment-codes')
const { LOCAL_NAME, DEVELOPMENT_NAME, TEST_NAME, PRE_PRODUCTION_NAME, PRODUCTION_NAME } = require('../constants/environment-names')
const { UNKNOWN } = require('../constants/unknown')

const getEnvironment = () => {
  switch (alertConfig.environment) {
    case LOCAL:
      return LOCAL_NAME
    case DEVELOPMENT:
      return DEVELOPMENT_NAME
    case TEST:
      return TEST_NAME
    case PRE_PRODUCTION:
      return PRE_PRODUCTION_NAME
    case PRODUCTION:
      return PRODUCTION_NAME
    default:
      return UNKNOWN
  }
}

module.exports = {
  getEnvironment
}
