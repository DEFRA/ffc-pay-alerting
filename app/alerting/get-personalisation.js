const moment = require('moment')
const { getEnvironment } = require('./get-environment')
const { DATE } = require('../constants/date-format')

const getPersonalisation = (event) => {
  return {
    environment: getEnvironment(),
    eventId: event.id,
    timestamp: moment(event.time).format(DATE),
    ...event.data
  }
}

module.exports = {
  getPersonalisation
}
