jest.mock('../../../app/alerting/get-recipients')
const { getRecipients: mockGetRecipients } = require('../../../app/alerting/get-recipients')

jest.mock('../../../app/alerting/send-alerts')
const { sendAlerts: mockSendAlerts } = require('../../../app/alerting/send-alerts')

const { RECIPIENTS } = require('../../mocks/values/recipients')

const { PAYMENT_REJECTED } = require('../../../app/constants/templates')

const { processAlert } = require('../../../app/alerting/process-alert')

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
  })

  test('should send the alerts if template found', async () => {
    await processAlert(event)
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, PAYMENT_REJECTED, event)
  })

  test('should not send the alerts if template not found', async () => {
    event.type = 'unknown'
    await processAlert(event)
    expect(mockSendAlerts).not.toHaveBeenCalled()
  })
})
