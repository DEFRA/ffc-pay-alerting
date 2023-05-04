const { getRecipients } = require('./get-recipients')
const { getTemplateId } = require('./get-template-id')
const { sendAlerts } = require('./send-alerts')

const processEvent = async (event) => {
  const recipients = getRecipients(event)
  const templateId = getTemplateId(event)
  await sendAlerts(recipients, templateId, event)
}

module.exports = {
  processEvent
}
