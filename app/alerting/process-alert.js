const { getRecipients } = require('./get-recipients')
const templateMap = require('../constants/template-map')
const { sendAlerts } = require('./send-alerts')
const sourceSystems = require('../constants/source-systems')
const { generateReturnFile } = require('./generate-return-file')

const processAlert = async (event) => {
  const recipients = getRecipients(event)
  const templateId = templateMap[event.type]
  if (templateId) {
    await sendAlerts(recipients, templateId, event)
  } else {
    console.log(`No alert template found for event type: ${event.type}, skipping`)
  }
  if (event?.data?.sourceSystem === sourceSystems.FC) {
    await generateReturnFile(event)
  }
}

module.exports = {
  processAlert
}
