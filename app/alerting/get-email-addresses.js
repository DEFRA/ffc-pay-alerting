const db = require('../data')

const getEmailAddresses = async (eventType, schemeId) => {
  const emails = await db.contact.findAll({
    attributes: ['emailAddress'],
    where: {
      removedAt: null,
      [eventType]: {
        [db.Sequelize.Op.contains]: [schemeId]
      }
    }
  })
  return emails.map(contact => contact.emailAddress)
}

module.exports = {
  getEmailAddresses
}
