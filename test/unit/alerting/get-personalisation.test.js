jest.mock('../../../app/alerting/get-environment')
const { getEnvironment: mockGetEnvironment } = require('../../../app/alerting/get-environment')

jest.mock('../../../app/alerting/get-scheme')
const { getScheme: mockGetScheme } = require('../../../app/alerting/get-scheme')

const { TEST_NAME } = require('../../../app/constants/environment-names')
const { SFI } = require('../../../app/constants/schemes')
const { UNKNOWN } = require('../../../app/constants/unknown')
const schemeNames = require('../../../app/constants/scheme-names')

const { getPersonalisation } = require('../../../app/alerting/get-personalisation')

let event

describe('getPersonalisationAllCases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEnvironment.mockReturnValue(TEST_NAME)
    mockGetScheme.mockReturnValue(schemeNames[SFI])

    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test('should return message from event data', () => {
    const result = getPersonalisation(event)
    expect(result.message).toBe(event.data.message)
  })

  test('should get environment', () => {
    getPersonalisation(event)
    expect(mockGetEnvironment).toHaveBeenCalledTimes(1)
  })

  test('should return environment', () => {
    const result = getPersonalisation(event)
    expect(result.environment).toBe(TEST_NAME)
  })

  test('should return event id as eventId', () => {
    const result = getPersonalisation(event)
    expect(result.eventId).toBe(event.id)
  })

  test('should return source', () => {
    const result = getPersonalisation(event)
    expect(result.source).toBe(event.source)
  })

  test('should return event time as formatted timestamp', () => {
    const result = getPersonalisation(event)
    expect(result.timestamp).toBe('01/01/2021 00:00')
  })

  const optionalFields = [
    ['frn', 'frn'],
    ['invoiceNumber', 'invoiceNumber'],
    ['contractNumber', 'contractNumber'],
    ['paymentRequestNumber', 'paymentRequestNumber'],
    ['context', 'context']
  ]

  test.each(optionalFields)(
    'should return correct %s from event data or UNKNOWN if missing',
    (key, dataKey) => {
      // Test existing value
      let result = getPersonalisation(event)
      const expected = key === 'context'
        ? event.data[dataKey] ? event.data[dataKey].charAt(0).toUpperCase() + event.data[dataKey].slice(1) : UNKNOWN
        : event.data[dataKey] || UNKNOWN
      expect(result[key]).toBe(expected)

      // Test missing value
      delete event.data[dataKey]
      result = getPersonalisation(event)
      expect(result[key]).toBe(UNKNOWN)
    }
  )

  test('should get scheme name from scheme id', () => {
    getPersonalisation(event)
    expect(mockGetScheme).toHaveBeenCalledTimes(1)
    expect(mockGetScheme).toHaveBeenCalledWith(event.data.schemeId)
  })

  test('should return scheme name', () => {
    const result = getPersonalisation(event)
    expect(result.scheme).toBe(schemeNames[SFI])
  })

  describe('originalEvent formatting', () => {
    test.each([
      [{ key1: 'value1', key2: 'value2' }, true],
      [{}, false],
      [null, false],
      ['not an object', false],
      [12345, false],
      [{ level1: { level2: { key: 'value' } } }, true]
    ])('should handle originalEvent: %p', (originalEvent, shouldContain) => {
      event.data.originalEvent = originalEvent
      const result = getPersonalisation(event)
      if (shouldContain) {
        const keys = JSON.stringify(originalEvent).match(/"(\w+)":/g).map(k => k.replace(/"/g, '').replace(':', ''))
        keys.forEach(k => {
          expect(result.originalEvent).toContain(k.charAt(0).toUpperCase() + k.slice(1))
        })
      } else {
        expect(result.originalEvent).toBe(UNKNOWN)
      }
    })
  })
})
