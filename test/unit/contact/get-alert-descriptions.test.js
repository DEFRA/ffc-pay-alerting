const eventDescriptions = require('../../../app/constants/event-descriptions')
const { getAlertDescriptions } = require('../../../app/contact')

test('should return an array of objects with type and description from eventDescriptions', () => {
  const expected = Object.entries(eventDescriptions).map(([type, description]) => ({
    type,
    description
  }))
  const result = getAlertDescriptions()
  expect(result).toEqual(expected)
})
