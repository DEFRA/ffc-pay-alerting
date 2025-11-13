const db = require('../data')

const getSchemeIdFromSourceSystem = async (sourceSystem) => {
  if (!sourceSystem) {
    return 0
  }
  const scheme = await db.scheme.findOne({
    attributes: ['schemeId'],
    where: {
      sourceSystem
    }
  })
  return scheme ? scheme.schemeId : 0
}

module.exports = {
  getSchemeIdFromSourceSystem
}
