const { contact } = require('../database')
const events = require('../constants/events')

const CONTACT_ATTRIBUTES = [
  'contactId',
  'emailAddress',
  ...Object.keys(events).map((key) => key.toLowerCase())
]

const ARRAY_FIELDS = CONTACT_ATTRIBUTES.filter((field) => field !== 'contactId' && field !== 'emailAddress')

const getContactsByScheme = async (schemeId) => {
  const query = contact()
    .select(CONTACT_ATTRIBUTES)
    .whereNull('removedAt')

  if (schemeId !== undefined && schemeId !== null) {
    const parsedSchemeId = Number(schemeId)

    if (!Number.isNaN(parsedSchemeId)) {
      query.where(function () {
        for (const field of ARRAY_FIELDS) {
          this.orWhere(field, '@>', [parsedSchemeId])
        }
      })
    }
  }

  return query
}

module.exports = {
  getContactsByScheme
}
