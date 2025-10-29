const events = require('../../../app/constants/events')
const { getAlertTypes } = require('../../../app/contact')

test('should return an array of lowercased keys from events', () => {
  const expected = Object.keys(events).map(key => key.toLowerCase())
  const result = getAlertTypes()
  expect(result).toEqual(expected)
})
