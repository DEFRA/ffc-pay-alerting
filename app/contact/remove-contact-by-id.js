const db = require('../data')

const removeContactById = async (contactId, removedBy) => {
  await db.contact.update({ removedBy, removedAt: Date.now() }, { where: { contactId } })
}

module.exports = {
  removeContactById
}
