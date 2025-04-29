const emailConfig = require('../constants/email-config')
const alertConfig = require('../config/alert')

const getEmailAddresses = (eventType, sourceSystem) => {
  let emailAddresses = emailConfig[eventType]?.[sourceSystem] || emailConfig[eventType]?.default
  if (emailAddresses && alertConfig.pdsTeamEmails) { emailAddresses = emailAddresses.concat(`;${alertConfig.pdsTeamEmails}`) }

  return emailAddresses
}

module.exports = {
  getEmailAddresses
}
