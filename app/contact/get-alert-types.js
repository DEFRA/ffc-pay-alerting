const events = require('../constants/events')

const getAlertTypes = () => {
  return Object.keys(events).map(key => key.toLowerCase())
}

module.exports = {
  getAlertTypes
}
