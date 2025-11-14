const { alertConfig } = require('../config')
const { getEmailAddresses } = require('./get-email-addresses')
const { getSchemeIdFromSourceSystem } = require('./get-scheme-id-from-source-system')

const getRecipients = async (event) => {
  const schemeId = await getSchemeIdFromSourceSystem(event.data?.sourceSystem)
  const emailAddresses = await getEmailAddresses(event.type, schemeId)
  const pdsEmails = alertConfig.pdsTeamEmails
    ? alertConfig.pdsTeamEmails.split(';').map(email => email.trim()).filter(email => email.length)
    : []
  const devEmails = alertConfig.devTeamEmails
    ? alertConfig.devTeamEmails.split(';').map(email => email.trim()).filter(email => email.length)
    : []
  emailAddresses.push(...pdsEmails, ...devEmails)
  return emailAddresses?.map(email => email.trim()).filter(email => email.length)
}

module.exports = {
  getRecipients
}
