const db = require('../data')

const getSchemeName = async (schemeId, schemeCache) => {
  if (schemeCache.has(schemeId)) {
    return schemeCache.get(schemeId)
  }
  const scheme = await db.scheme.findOne({
    where: { schemeId }
  })
  const name = scheme ? scheme.name : null
  schemeCache.set(schemeId, name)
  return name
}

const getContacts = async () => {
  const contacts = await db.contact.findAll({
    where: {
      removedAt: null
    },
    raw: true,
    attributes: ['contactId', 'emailAddress', 'batch_rejected', 'batch_quarantined', 'payment_rejected', 'payment_dax_rejected', 'payment_invalid_bank', 'payment_processing_failed', 'payment_settlement_unsettled', 'payment_settlement_unmatched', 'response_rejected', 'payment_request_blocked', 'payment_dax_unavailable', 'receiver_connection_failed', 'demographics_processing_failed', 'demographics_update_failed', 'event_save_alert', 'table_create_alert']
  })

  const schemeCache = new Map()

  const transformedContacts = await Promise.all(
    contacts.map(async contact => {
      const contactObj = contact.get ? contact.get() : contact

      const transformed = {}

      for (const [key, value] of Object.entries(contactObj)) {
        if (Array.isArray(value)) {
          const replacedArray = await Promise.all(
            value.map(async (schemeId) => {
              if (typeof schemeId === 'number') {
                return getSchemeName(schemeId, schemeCache)
              }
              return schemeId
            })
          )
          transformed[key] = replacedArray
        } else {
          transformed[key] = value
        }
      }
      return transformed
    })
  )
  return transformedContacts
}

module.exports = {
  getContacts
}
