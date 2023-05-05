const { getRecipients } = require('./get-recipients')
const templateMap = require('../constants/template-map')
const { sendAlerts } = require('./send-alerts')

const processEvent = async (event) => {
  const recipients = getRecipients(event)
  const templateId = templateMap[event.type]
  if (templateId) {
    await sendAlerts(recipients, templateId, event)
  }
}

module.exports = {
  processEvent
}
