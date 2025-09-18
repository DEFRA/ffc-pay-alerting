const crypto = require('crypto')

const getAlertCacheKey = (type, source, subject, data) => {
  const input = `${type}:${source}:${subject}:${JSON.stringify(data)}`
  return crypto.createHash('sha256').update(input).digest('hex')
}

module.exports = {
  getAlertCacheKey
}
