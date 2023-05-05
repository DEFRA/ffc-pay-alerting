const NotifyClient = require('notifications-node-client').NotifyClient
const { alertConfig } = require('../config')
const { getPersonalisation } = require('./get-personalisation')

const sendAlert = async (recipient, templateId, event) => {
  const notifyClient = new NotifyClient(alertConfig.notifyApiKey)
  await notifyClient.sendEmail(templateId, recipient, {
    personalisation: getPersonalisation(event)
  })
  console.log(`Sent alert to ${recipient}`)
}

module.exports = {
  sendAlert
}
