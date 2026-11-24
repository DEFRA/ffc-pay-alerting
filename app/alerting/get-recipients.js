const { getSchemeIdFromSourceSystem } = require('ffc-pay-schemes')
const { alertConfig } = require('../config')
const {
  SCHEME_ADDED,
  RETENTION_DATA_REJECTED,
  RETENTION_FILE_REJECTED
} = require('../constants/events')
const { getEmailAddresses } = require('./get-email-addresses')

const SCHEME_ADDED_SCHEME_ID = 0

const RETENTION_EVENTS = [
  RETENTION_DATA_REJECTED,
  RETENTION_FILE_REJECTED
]

const getRecipients = async (event) => {
  // Retention alerts use the configured development team recipients
  if (RETENTION_EVENTS.includes(event.type)) {
    return alertConfig.devTeamEmails
      ? alertConfig.devTeamEmails
        .split(';')
        .map(email => email.trim())
        .filter(email => email.length)
      : []
  }

  const { schemeId: eventSchemeId, sourceSystem } = event.data ?? {}
  let emailAddresses = []

  if (event.type === SCHEME_ADDED) {
    emailAddresses = await getEmailAddresses(event.type, SCHEME_ADDED_SCHEME_ID)
  } else if (eventSchemeId || sourceSystem) {
    const schemeId = eventSchemeId || await getSchemeIdFromSourceSystem(sourceSystem)

    if (schemeId) {
      emailAddresses = await getEmailAddresses(event.type, schemeId)
    }
  } else {
    console.log('No SchemeId Identified')
  }

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
