const { getEmailAddresses } = require('./get-email-addresses')
const { getSchemeIdFromSourceSystem } = require('./get-scheme-id-from-source-system')

const getRecipients = async (event) => {
  const schemeId = await getSchemeIdFromSourceSystem(event.data?.sourceSystem)
  const emailAddresses = await getEmailAddresses(event.type, schemeId)
  if (!emailAddresses) {
    return []
  }
  return emailAddresses.map(email => email.trim()).filter(email => email.length)
}

module.exports = {
  getRecipients
}
