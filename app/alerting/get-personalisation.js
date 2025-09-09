const moment = require('moment')
const { getEnvironment } = require('./get-environment')
const { getScheme } = require('./get-scheme')
const { DATE } = require('../constants/date-format')
const { UNKNOWN } = require('../constants/unknown')

const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') {
    return string
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const formatOriginalEvent = (originalEvent) => {
  if (typeof originalEvent !== 'object' || originalEvent === null) {
    return UNKNOWN
  }

  const flattenObject = (obj, prefix = '') => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const newKey = prefix ? `${prefix}.${capitalizeFirstLetter(key)}` : capitalizeFirstLetter(key)
      if (typeof value === 'object' && value !== null) {
        return flattenObject(value, newKey)
      }
      return `${newKey}: ${value}`
    })
  }

  const formattedEvent = flattenObject(originalEvent).join('\n')
  return formattedEvent.length === 0 ? UNKNOWN : formattedEvent
}

const getPersonalisation = (event) => {
  return {
    ...event.data,
    environment: getEnvironment(),
    eventId: event.id,
    source: event.source,
    timestamp: moment(event.time).format(DATE),
    frn: event.data?.frn ?? UNKNOWN,
    invoiceNumber: event.data?.invoiceNumber ?? UNKNOWN,
    contractNumber: event.data?.contractNumber ?? UNKNOWN,
    paymentRequestNumber: event.data?.paymentRequestNumber ?? UNKNOWN,
    scheme: getScheme(event.data?.schemeId),
    context: capitalizeFirstLetter(event.data?.context ?? UNKNOWN),
    originalEvent: formatOriginalEvent(event.data?.originalEvent ?? UNKNOWN)
  }
}

module.exports = {
  getPersonalisation
}
