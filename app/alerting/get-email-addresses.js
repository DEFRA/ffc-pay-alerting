const events = require('../constants/events')
const { SCHEME_ADDED } = events
const { contact } = require('../database')

const getEmailAddresses = async (eventType, schemeId) => {
  let eventKey

  for (const [key, value] of Object.entries(events)) {
    if (value === eventType) {
      eventKey = key
    }
  }

  if (!eventKey) {
    return []
  }

  const subscribedSchemeId =
    eventType === SCHEME_ADDED ? 0 : schemeId

  if (subscribedSchemeId === 0 && eventType !== SCHEME_ADDED) {
    return []
  }

  const emails = await contact()
    .select('emailAddress')
    .whereNull('removedAt')
    .where(
      eventKey.toLocaleLowerCase(),
      '@>',
      [subscribedSchemeId]
    )

  return emails.map(({ emailAddress }) => emailAddress)
}

module.exports = {
  getEmailAddresses
}
