const { MessageReceiver } = require('ffc-messaging')
const { messageConfig } = require('../config')
const { processAlertMessage } = require('./process-alert-message')
let receiver

const start = async () => {
  const action = message => processAlertMessage(message, receiver)
  receiver = new MessageReceiver(messageConfig.alertSubscription, action)
  await receiver.subscribe()

  console.info('Ready to process alerts')
}

const stop = async () => {
  await receiver.closeConnection()
}

module.exports = { start, stop }
