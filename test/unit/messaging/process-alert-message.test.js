const { VALIDATION } = require('../../../app/constants/errors')

jest.mock('../../../app/cache', () => ({
  getAlertCacheKey: jest.fn(() => 'test-key'),
  getCachedAlertMessage: jest.fn(),
  setCachedAlertMessage: jest.fn()
}))
const { getCachedAlertMessage, setCachedAlertMessage } = require('../../../app/cache')

jest.mock('../../../app/alerting')
const { processAlert: mockProcessAlert } = require('../../../app/alerting')

jest.mock('../../../app/messaging/validate-alert')
const { validateAlert: mockValidateAlert } = require('../../../app/messaging/validate-alert')

const mockEvent = require('../../mocks/event')
const message = { body: mockEvent }

const { processAlertMessage } = require('../../../app/messaging/process-alert-message')

const receiver = {
  completeMessage: jest.fn(),
  deadLetterMessage: jest.fn()
}

describe('process event message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockValidateAlert.mockReset()
    getCachedAlertMessage.mockReset()
    setCachedAlertMessage.mockReset()
  })

  test('should set cached alert message if not cached', async () => {
    getCachedAlertMessage.mockResolvedValue(undefined)
    await processAlertMessage(message, receiver)
    expect(setCachedAlertMessage).toHaveBeenCalledWith(expect.anything(), 'test-key', message.body)
  })

  test('should not set cached alert message if already cached', async () => {
    getCachedAlertMessage.mockResolvedValue({ some: 'data' })
    await processAlertMessage(message, receiver)
    expect(setCachedAlertMessage).not.toHaveBeenCalled()
  })

  test('should validate message body', async () => {
    await processAlertMessage(message, receiver)
    expect(mockValidateAlert).toHaveBeenCalledWith(message.body)
  })

  test('should process event', async () => {
    await processAlertMessage(message, receiver)
    expect(mockProcessAlert).toHaveBeenCalledWith(message.body)
  })

  test('should complete message if validation and processing do not throw error', async () => {
    await processAlertMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })

  test.each([
    ['validation error', () => {
      const err = new Error('Validation error'); err.category = VALIDATION; throw err
    }, 'deadLetterMessage', true],
    ['processing error', () => {
      throw new Error('Processing error')
    }, 'completeMessage', false]
  ])('should handle %s correctly', async (_, mockFn, method, shouldCall) => {
    mockFn.name === 'validation error' ? mockValidateAlert.mockImplementation(mockFn) : mockProcessAlert.mockImplementation(mockFn)
    await processAlertMessage(message, receiver)
    const receiverMethod = receiver[method]
    if (shouldCall) {
      expect(receiverMethod).toHaveBeenCalledWith(message)
    } else {
      expect(receiverMethod).not.toHaveBeenCalledWith(message)
    }
  })
})
