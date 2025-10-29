const eventDescriptions = require('../constants/event-descriptions')

const getAlertDescriptions = () => {
  return Object.entries(eventDescriptions).map(([type, description]) => ({
    type,
    description
  }))
}

module.exports = {
  getAlertDescriptions
}
