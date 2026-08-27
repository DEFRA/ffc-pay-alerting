jest.mock('ffc-pay-schemes', () => {
  const actual = jest.requireActual('ffc-pay-schemes')

  return {
    ...actual,
    getSchemeNameFromSchemeId: jest.fn()
  }
})

const {
  getSchemeNameFromSchemeId: mockGetSchemeNameFromSchemeId,
  getSchemeIds,
  getSchemeNames
} = require('ffc-pay-schemes')

jest.mock('../../../app/alerting/get-environment')
const { getEnvironment: mockGetEnvironment } = require('../../../app/alerting/get-environment')

const { TEST_NAME } = require('../../../app/constants/environment-names')
const { UNKNOWN } = require('../../../app/constants/unknown')

const schemeIds = getSchemeIds()
const schemeNames = getSchemeNames()

const { getPersonalisation } = require('../../../app/alerting/get-personalisation')

let event

describe('get personalisation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEnvironment.mockReturnValue(TEST_NAME)
    mockGetSchemeNameFromSchemeId.mockReturnValue(schemeNames.SFI)

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

  test('should return frn from event data if it exists', () => {
    const result = getPersonalisation(event)
    expect(result.frn).toBe(event.data.frn)
  })

  test('should return unknown frn if it does not exist', () => {
    delete event.data.frn
    const result = getPersonalisation(event)
    expect(result.frn).toBe(UNKNOWN)
  })

  test('should return invoice number from event data if it exists', () => {
    const result = getPersonalisation(event)
    expect(result.invoiceNumber).toBe(event.data.invoiceNumber)
  })

  test('should return unknown invoice number if it does not exist', () => {
    delete event.data.invoiceNumber
    const result = getPersonalisation(event)
    expect(result.invoiceNumber).toBe(UNKNOWN)
  })

  test('should return contract number from event data if it exists', () => {
    const result = getPersonalisation(event)
    expect(result.contractNumber).toBe(event.data.contractNumber)
  })

  test('should return unknown contract number if it does not exist', () => {
    delete event.data.contractNumber
    const result = getPersonalisation(event)
    expect(result.contractNumber).toBe(UNKNOWN)
  })

  test('should return payment request number from event data if it exists', () => {
    const result = getPersonalisation(event)
    expect(result.paymentRequestNumber).toBe(event.data.paymentRequestNumber)
  })

  test('should return unknown payment request number if it does not exist', () => {
    delete event.data.paymentRequestNumber
    const result = getPersonalisation(event)
    expect(result.paymentRequestNumber).toBe(UNKNOWN)
  })

  test('should get scheme name from scheme id', () => {
    getPersonalisation(event)
    expect(mockGetSchemeNameFromSchemeId).toHaveBeenCalledTimes(1)
    expect(mockGetSchemeNameFromSchemeId).toHaveBeenCalledWith(event.data.schemeId)
  })

  test('should return scheme name', () => {
    event.data.schemeId = schemeIds.SFI
    const result = getPersonalisation(event)
    expect(result.scheme).toBe(schemeNames.SFI)
  })

  test('should capitalize context if it exists', () => {
    event.data.context = 'test context'
    const result = getPersonalisation(event)
    expect(result.context).toBe('Test context')
  })

  test('should return unknown context if it does not exist', () => {
    delete event.data.context
    const result = getPersonalisation(event)
    expect(result.context).toBe(UNKNOWN)
  })

  test('should format original event if it exists', () => {
    event.data.originalEvent = {
      key1: 'value1',
      key2: 'value2'
    }

    const result = getPersonalisation(event)
    expect(result.originalEvent).toContain('Key1: value1')
    expect(result.originalEvent).toContain('Key2: value2')
  })

  test('should format nested original event', () => {
    event.data.originalEvent = {
      level1: {
        level2: {
          key: 'value'
        }
      }
    }
    const result = getPersonalisation(event)
    expect(result.originalEvent).toBe('Level1.Level2.Key: value')
  })

  test('should return unknown if original event is not an object', () => {
    event.data.originalEvent = 'not an object'
    const result = getPersonalisation(event)
    expect(result.originalEvent).toBe(UNKNOWN)
  })

  test('should return unknown if original event is null', () => {
    event.data.originalEvent = null
    const result = getPersonalisation(event)
    expect(result.originalEvent).toBe(UNKNOWN)
  })

  test('should return unknown for an empty original event', () => {
    event.data.originalEvent = {}
    const result = getPersonalisation(event)
    expect(result.originalEvent).toBe(UNKNOWN)
  })

  test('should return unknown if original event is undefined', () => {
    delete event.data.originalEvent
    const result = getPersonalisation(event)
    expect(result.originalEvent).toBe(UNKNOWN)
  })
})
