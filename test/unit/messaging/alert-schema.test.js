const schema = require('../../../app/messaging/alert-schema')

let event

describe('alertSchema', () => {
  beforeEach(() => {
    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test('should validate a valid event', () => {
    expect(schema.validate(event, { allowUnknown: true }).error).toBeUndefined()
  })

  describe('type field validation', () => {
    test.each([undefined, null, '', 'missing'])(
      'should not validate an event with %s type',
      (value) => {
        if (value === 'missing') delete event.type
        else event.type = value
        expect(schema.validate(event, { allowUnknown: true }).error).toBeDefined()
      }
    )
  })

  describe('source field validation', () => {
    test.each([undefined, null, '', 'missing'])(
      'should not validate an event with %s source',
      (value) => {
        if (value === 'missing') delete event.source
        else event.source = value
        expect(schema.validate(event, { allowUnknown: true }).error).toBeDefined()
      }
    )
  })

  describe('id field validation', () => {
    test.each([undefined, null, '', 'missing', 'a-non-uuid'])(
      'should not validate an event with %s id',
      (value) => {
        if (value === 'missing') delete event.id
        else event.id = value
        expect(schema.validate(event, { allowUnknown: true }).error).toBeDefined()
      }
    )
  })

  describe('time field validation', () => {
    test.each([undefined, null, '', 'a-non-date', 'missing'])(
      'should not validate an event with %s time',
      (value) => {
        if (value === 'missing') delete event.time
        else event.time = value
        expect(schema.validate(event, { allowUnknown: true }).error).toBeDefined()
      }
    )
  })

  describe('data field validation', () => {
    test.each([undefined, null, '', 'missing'])(
      'should not validate an event with %s data',
      (value) => {
        if (value === 'missing') delete event.data
        else event.data = value
        expect(schema.validate(event, { allowUnknown: true }).error).toBeDefined()
      }
    )

    test('should not validate an event without a message', () => {
      delete event.data.message
      expect(schema.validate(event, { allowUnknown: true }).error).toBeDefined()
    })
  })
})
