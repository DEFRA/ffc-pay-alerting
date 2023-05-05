const { alertConfig } = require('../config')
const { LOCAL, DEVELOPMENT, TEST, PRE_PRODUCTION, PRODUCTION, UNKNOWN } = require('../constants/environment-codes')

const getEnvironment = () => {
  switch (alertConfig.environment) {
    case LOCAL:
      return 'Local'
    case DEVELOPMENT:
      return 'Development'
    case TEST:
      return 'Test'
    case PRE_PRODUCTION:
      return 'Pre-Production'
    case PRODUCTION:
      return 'Production'
    default:
      return UNKNOWN
  }
}

module.exports = {
  getEnvironment
}
