const util = require('util')
const { VALIDATION } = require('../constants/errors')
const { validateEvent } = require('./validate-event')

const processEventMessage = async (message, receiver) => {
  try {
    const alert = message.body
    console.log('Event received:', util.inspect(alert, false, null, true))
    validateEvent(alert)
    // TODO sent alert
    await receiver.completeMessage(message)
  } catch (err) {
    console.error('Unable to process event:', err)
    if (err.category === VALIDATION) {
      await receiver.deadLetterMessage(message)
    }
  }
}

module.exports = {
  processEventMessage
}
