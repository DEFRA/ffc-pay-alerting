const crypto = require('crypto')

const getAlertCacheKey = (type, source, data) => {
  const input = `${type}:${source}:${JSON.stringify(data)}`
  return crypto.createHash('sha256').update(input).digest('hex')
}

module.exports = {
  getAlertCacheKey
}
