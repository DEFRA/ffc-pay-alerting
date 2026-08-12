const db = require('../data')
const events = require('../constants/events')

const CONTACT_ATTRIBUTES = [
  'contactId',
  'emailAddress',
  ...Object.keys(events).map((key) => key.toLowerCase())
]

const ARRAY_FIELDS = CONTACT_ATTRIBUTES.filter((field) => field !== 'contactId' && field !== 'emailAddress')

const getContactsByScheme = async (schemeId) => {
  const where = {
    removedAt: null
  }

  if (schemeId !== undefined && schemeId !== null) {
    const parsedSchemeId = Number(schemeId)

    if (!Number.isNaN(parsedSchemeId)) {
      where[db.Sequelize.Op.or] = ARRAY_FIELDS.map((field) => ({
        [field]: {
          [db.Sequelize.Op.contains]: [parsedSchemeId]
        }
      }))
    }
  }

  return db.contact.findAll({
    where,
    raw: true,
    attributes: CONTACT_ATTRIBUTES
  })
}

module.exports = {
  getContactsByScheme
}
