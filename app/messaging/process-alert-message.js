const util = require('util')
const { VALIDATION } = require('../constants/errors')
const { validateAlert } = require('./validate-alert')
const { processAlert } = require('../alerting')
const { getAlertCacheKey, getCachedAlertMessage, setCachedAlertMessage } = require('../cache')
const { cacheConfig } = require('../config')

const processAlertMessage = async (message, receiver) => {
  try {
    const alert = message.body
    console.log('Alert received:', util.inspect(alert, false, null, true))
    validateAlert(alert)

    const { type, source, data } = alert
    const key = getAlertCacheKey(type, source, data)
    const cachedAlert = await getCachedAlertMessage(cacheConfig.cache, key)
    if (!cachedAlert) {
      await processAlert(alert)
      await setCachedAlertMessage(cacheConfig.cache, key, alert)
    }
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process alert:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = {
  processAlertMessage
}
