const events = require('../constants/events')
const { contact } = require('../database')

const getEmailAddresses = async (eventType, schemeId) => {
  let eventKey
  for (const [key, value] of Object.entries(events)) {
    if (value === eventType) {
      eventKey = key
    }
  }

  if (schemeId === 0 || !eventKey) {
    return []
  }

  const emails = await contact()
    .select('emailAddress')
    .whereNull('removedAt')
    .where(eventKey.toLocaleLowerCase(), '@>', [schemeId])
  return emails.map(({ emailAddress }) => emailAddress)
}

module.exports = {
  getEmailAddresses
}
