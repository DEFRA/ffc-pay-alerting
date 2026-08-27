const sourceSystems = {
  FC: 'GLOS'
}

jest.mock('ffc-pay-schemes', () => {
  const actual = jest.requireActual('ffc-pay-schemes')

  return {
    ...actual,
    getSourceSystems: jest.fn(() => sourceSystems)
  }
})

const { getSourceSystems: mockGetSourceSystems } = require('ffc-pay-schemes')

jest.mock('../../../app/alerting/get-recipients')
const { getRecipients: mockGetRecipients } = require('../../../app/alerting/get-recipients')

jest.mock('../../../app/alerting/generate-return-file')
const { generateReturnFile: mockGenerateReturnFile } = require('../../../app/alerting/generate-return-file')

jest.mock('../../../app/alerting/send-alerts')
const { sendAlerts: mockSendAlerts } = require('../../../app/alerting/send-alerts')

const { RECIPIENTS } = require('../../mocks/values/recipients')
const { PAYMENT_REJECTED: PAYMENT_REJECTED_TEMPLATE } = require('../../../app/constants/templates')
const {
  BATCH_REJECTED,
  DUPLICATE_PAYMENT,
  DEMOGRAPHICS_UPDATE_FAILED
} = require('../../../app/constants/events')
const { processAlert } = require('../../../app/alerting/process-alert')

let event

describe('process alert', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockGetRecipients.mockResolvedValue(RECIPIENTS)
    mockGetSourceSystems.mockReturnValue(sourceSystems)
    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test('should get the recipients from the event', async () => {
    await processAlert(event)
    expect(mockGetRecipients).toHaveBeenCalledWith(event)
  })

  test('should send the alerts if a template is found', async () => {
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(
      RECIPIENTS,
      PAYMENT_REJECTED_TEMPLATE,
      event
    )
  })

  test('should not send the alerts if a template is not found', async () => {
    event.type = 'unknown'
    await processAlert(event)
    expect(mockSendAlerts).not.toHaveBeenCalled()
  })

  test('should generate a return file if the source system is FC and the event type is supported', async () => {
    event.data.sourceSystem = sourceSystems.FC
    event.type = BATCH_REJECTED
    await processAlert(event)
    expect(mockGenerateReturnFile).toHaveBeenCalledWith(event)
  })

  test('should generate a return file for duplicate payments from FC', async () => {
    event.data.sourceSystem = sourceSystems.FC
    event.type = DUPLICATE_PAYMENT
    await processAlert(event)
    expect(mockGenerateReturnFile).toHaveBeenCalledWith(event)
  })

  test('should not generate a return file if the source system is not FC', async () => {
    event.data.sourceSystem = 'OTHER_SYSTEM'
    event.type = BATCH_REJECTED
    await processAlert(event)
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  test('should not generate a return file if the event type is not supported', async () => {
    event.data.sourceSystem = sourceSystems.FC
    event.type = DEMOGRAPHICS_UPDATE_FAILED
    await processAlert(event)
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  test('should not generate a return file if the source system is missing', async () => {
    delete event.data.sourceSystem
    event.type = BATCH_REJECTED
    await processAlert(event)
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  test('should send alerts and generate a return file for a supported FC event', async () => {
    event.data.sourceSystem = sourceSystems.FC
    event.type = BATCH_REJECTED

    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(
      RECIPIENTS,
      expect.any(String),
      event
    )
    expect(mockGenerateReturnFile).toHaveBeenCalledWith(event)
  })
})
