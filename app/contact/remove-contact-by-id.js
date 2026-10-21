const { contact } = require('../database')

const removeContactById = async (contactId, removedBy) => {
  await contact()
    .where({ contactId })
    .update({ removedBy, removedAt: new Date() })
}

module.exports = {
  removeContactById
}
