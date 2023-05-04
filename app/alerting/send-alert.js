const NotifyClient = require('notifications-node-client').NotifyClient
const { alertConfig } = require('../config')

const sendAlert = async (recipient, templateId, event) => {
  const notifyClient = new NotifyClient(alertConfig.notifyApiKey)
  await notifyClient.sendEmail(templateId, recipient, {
    personalisation: {
      message: event.message,
      reference: event.id
    }
  })
  console.log(`Sent alert to ${recipient}`)
}

module.exports = {
  sendAlert
}
