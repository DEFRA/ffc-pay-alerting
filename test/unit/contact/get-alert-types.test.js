const events = require('../../../app/constants/events')
const { getAlertTypes } = require('../../../app/contact')

test('should return an array of lowercased keys from events', () => {
  const NON_SCHEME_EVENTS = [
    'RETENTION_DATA_REJECTED',
    'RETENTION_FILE_REJECTED'
  ]

  const expected = Object.keys(events)
    .filter(key => !NON_SCHEME_EVENTS.includes(key))
    .map(key => key.toLowerCase())

  const result = getAlertTypes()
  expect(result).toEqual(expected)
})
