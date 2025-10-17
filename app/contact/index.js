const { addContact } = require('./add-contact')
const { getContacts } = require('./get-contacts')
const { removeContactById } = require('./remove-contact-by-id')

module.exports = {
  addContact,
  getContacts,
  removeContactById
}
