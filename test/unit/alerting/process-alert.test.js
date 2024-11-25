jest.mock('../../../app/alerting/get-recipients')
const { getRecipients: mockGetRecipients } = require('../../../app/alerting/get-recipients')

jest.mock('../../../app/alerting/generate-return-file')
const { generateReturnFile: mockGenerateReturnFile } = require('../../../app/alerting/generate-return-file')

jest.mock('../../../app/alerting/send-alerts')
const { sendAlerts: mockSendAlerts } = require('../../../app/alerting/send-alerts')

const { RECIPIENTS } = require('../../mocks/values/recipients')

const { PAYMENT_REJECTED } = require('../../../app/constants/templates')

const { processAlert } = require('../../../app/alerting/process-alert')
const sourceSystems = require('../../../app/constants/source-systems')

let event

describe('process alert', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockGetRecipients.mockReturnValue(RECIPIENTS)

    event = JSON.parse(JSON.stringify(require('../../mocks/event')))
  })

  test('should get the recipients from the event', async () => {
    await processAlert(event)
    expect(mockGetRecipients).toHaveBeenCalledWith(event)
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  test('should send the alerts if template found', async () => {
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, PAYMENT_REJECTED, event)
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  test('should not send the alerts if template not found', async () => {
    event.type = 'unknown'
    await processAlert(event)
    expect(mockSendAlerts).not.toHaveBeenCalled()
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  test('should generate return file if FC', async () => {
    event.data.sourceSystem = sourceSystems.FC
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalled()
    expect(mockGenerateReturnFile).toHaveBeenCalledWith(event)
  })
})
