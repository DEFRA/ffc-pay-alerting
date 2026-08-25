const { getAlertDescriptions } = require('./get-alert-descriptions')
const { getAlertTypes } = require('./get-alert-types')
const { getContactByEmail } = require('./get-contact-by-email')
const { getContactById } = require('./get-contact-by-id')
const { getContactsByScheme } = require('./get-contacts-by-scheme')
const { removeContactById } = require('./remove-contact-by-id')
const { updateContact } = require('./update-contact')

module.exports = {
  getAlertDescriptions,
  getAlertTypes,
  getContactByEmail,
  getContactById,
  getContactsByScheme,
  removeContactById,
  updateContact
}
