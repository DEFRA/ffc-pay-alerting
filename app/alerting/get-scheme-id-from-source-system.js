const db = require('../data')

const getSchemeIdFromSourceSystem = async (sourceSystem = 'Default') => {
  return db.scheme.findOne({
    attributes: ['schemeId'],
    where: {
      sourceSystem
    }
  })
}

module.exports = {
  getSchemeIdFromSourceSystem
}
