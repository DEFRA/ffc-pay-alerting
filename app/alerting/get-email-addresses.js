const events = require('../constants/events')
const db = require('../data')

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

  const emails = await db.contact.findAll({
    attributes: ['emailAddress'],
    where: {
      removedAt: null,
      [eventKey.toLocaleLowerCase()]: {
        [db.Sequelize.Op.contains]: [schemeId]
      }
    }
  })
  return emails.map(contact => contact.emailAddress)
}

module.exports = {
  getEmailAddresses
}
