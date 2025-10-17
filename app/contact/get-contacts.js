const db = require('../data')

const getContacts = async () => {
  return db.contact.findAll({
    where: {
      removedAt: null
    }
  })
}

module.exports = {
  getContacts
}
