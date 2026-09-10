const { messageConfig } = require('../config')
const { processAlertMessage } = require('./process-alert-message')
const { createServiceBusClient, createReceiver, subscribeReceiver } = require('./service-bus')

let sbClient
let receiver

const createDiagnosticsHandler = name => error => {
  console.error(`Error in ${name}:`, error)
}

const start = async () => {
  await stop()

  sbClient = createServiceBusClient(messageConfig.alertSubscription)
  receiver = createReceiver(sbClient, messageConfig.alertSubscription)
  const action = (message, receiver) => processAlertMessage(message, receiver)
  subscribeReceiver(receiver, action, createDiagnosticsHandler('alert-receiver'), messageConfig.alertSubscription)

  console.info('Ready to process alerts')
}

const stop = async () => {
  if (receiver) {
    try {
      await receiver.close()
    } catch (err) {
      console.error('Error closing receiver:', err)
    }
    receiver = null
  }

  if (sbClient) {
    try {
      await sbClient.close()
    } catch (err) {
      console.error('Error closing Service Bus client:', err)
    }
    sbClient = null
  }
}

module.exports = { start, stop }
