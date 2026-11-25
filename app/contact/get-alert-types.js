const events = require('../constants/events')

const NON_SCHEME_EVENTS = new Set([
  'RETENTION_DATA_REJECTED',
  'RETENTION_FILE_REJECTED'
])

const getAlertTypes = () => {
  return Object.keys(events)
    .filter(key => !NON_SCHEME_EVENTS.has(key))
    .map(key => key.toLowerCase())
}

module.exports = {
  getAlertTypes
}
