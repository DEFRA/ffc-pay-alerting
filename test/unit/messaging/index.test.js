const config = require('../../../app/config/message')

jest.mock('../../../app/messaging/service-bus', () => ({
  createServiceBusClient: jest.fn(),
  createReceiver: jest.fn(),
  subscribeReceiver: jest.fn()
}))

jest.mock('../../../app/messaging/process-alert-message')

const { createServiceBusClient, createReceiver, subscribeReceiver } = require('../../../app/messaging/service-bus')
const { processAlertMessage: mockProcessAlertMessage } = require('../../../app/messaging/process-alert-message')

const messageService = require('../../../app/messaging')

describe('messaging', () => {
  let mockReceiver
  let mockClient
  let consoleErrorSpy

  beforeEach(() => {
    jest.clearAllMocks()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockReceiver = { close: jest.fn().mockResolvedValue() }
    mockClient = { close: jest.fn().mockResolvedValue() }
    createServiceBusClient.mockReturnValue(mockClient)
    createReceiver.mockReturnValue(mockReceiver)
  })

  afterEach(async () => {
    consoleErrorSpy.mockRestore()
    await messageService.stop()
  })

  test('creates client and receiver for alert topic', async () => {
    await messageService.start()
    expect(createServiceBusClient).toHaveBeenCalledWith(config.alertSubscription)
    expect(createReceiver).toHaveBeenCalledWith(mockClient, config.alertSubscription)
  })

  test('subscribes to topic with error handler', async () => {
    await messageService.start()
    expect(subscribeReceiver).toHaveBeenCalledWith(
      mockReceiver,
      expect.any(Function),
      expect.any(Function),
      config.alertSubscription
    )
  })

  test('subscribed action delegates to processAlertMessage', async () => {
    await messageService.start()
    const action = subscribeReceiver.mock.calls[0][1]
    const message = { body: { type: 'alert' } }
    await action(message, mockReceiver)
    expect(mockProcessAlertMessage).toHaveBeenCalledWith(message, mockReceiver)
  })

  test('diagnostics handler logs receiver errors', async () => {
    await messageService.start()
    const errorHandler = subscribeReceiver.mock.calls[0][2]
    const error = new Error('receiver error')
    errorHandler(error)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error in alert-receiver:', error)
  })

  test('closes receiver and client when stopped', async () => {
    await messageService.start()
    await messageService.stop()
    expect(mockReceiver.close).toHaveBeenCalledTimes(1)
    expect(mockClient.close).toHaveBeenCalledTimes(1)
  })

  test('logs error when receiver close fails', async () => {
    const error = new Error('receiver close failed')
    mockReceiver.close.mockRejectedValue(error)
    await messageService.start()
    await messageService.stop()
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error closing receiver:', error)
  })

  test('logs error when client close fails', async () => {
    const error = new Error('client close failed')
    mockClient.close.mockRejectedValue(error)
    await messageService.start()
    await messageService.stop()
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error closing Service Bus client:', error)
  })

  test('stop is safe before start', async () => {
    await messageService.stop()
    expect(mockReceiver.close).not.toHaveBeenCalled()
    expect(mockClient.close).not.toHaveBeenCalled()
  })

  test('start closes any existing resources before creating new ones', async () => {
    const firstReceiver = { close: jest.fn().mockResolvedValue() }
    const firstClient = { close: jest.fn().mockResolvedValue() }
    createServiceBusClient.mockReturnValueOnce(firstClient)
    createReceiver.mockReturnValueOnce(firstReceiver)

    await messageService.start()
    createServiceBusClient.mockReturnValue(mockClient)
    createReceiver.mockReturnValue(mockReceiver)
    await messageService.start()

    expect(firstReceiver.close).toHaveBeenCalledTimes(1)
    expect(firstClient.close).toHaveBeenCalledTimes(1)
    expect(createServiceBusClient).toHaveBeenCalledTimes(2)
    expect(createReceiver).toHaveBeenCalledTimes(2)
  })
})
