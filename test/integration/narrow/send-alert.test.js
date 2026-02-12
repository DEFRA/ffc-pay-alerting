jest.mock('../../../app/cache', () => ({
  getAlertCacheKey: jest.fn(() => 'test-key'),
  getCachedAlertMessage: jest.fn(() => undefined),
  setCachedAlertMessage: jest.fn()
}))

jest.mock('../../../app/alerting')
const { processAlert } = require('../../../app/alerting')

jest.mock('../../../app/config')
const { alertConfig } = require('../../../app/config')

const message = require('../../mocks/message')
const { processAlertMessage } = require('../../../app/messaging/process-alert-message')

const receiver = {
  completeMessage: jest.fn()
}

describe('send alert', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    alertConfig.sendAlerts = true
    processAlert.mockResolvedValue()
  })

  test('should send alert via notify', async () => {
    await processAlertMessage(message, receiver)
    expect(processAlert).toHaveBeenCalled()
  })

  test('should complete message', async () => {
    await processAlertMessage(message, receiver)
    expect(receiver.completeMessage).toHaveBeenCalledWith(message)
  })
})
