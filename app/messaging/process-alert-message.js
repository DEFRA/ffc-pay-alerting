const util = require('util')
const { VALIDATION } = require('../constants/errors')
const { validateEvent } = require('./validate-event')
const { processAlert } = require('../alerting')

const processEventMessage = async (message, receiver) => {
  try {
    const alert = message.body
    console.log('Alert received:', util.inspect(alert, false, null, true))
    validateEvent(alert)
    await processAlert(alert)
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process alert:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = {
  processEventMessage
}
