jest.mock('../../../app/alerting/get-recipients')
const { getRecipients: mockGetRecipients } = require('../../../app/alerting/get-recipients')

jest.mock('../../../app/alerting/generate-return-file')
const { generateReturnFile: mockGenerateReturnFile } = require('../../../app/alerting/generate-return-file')

jest.mock('../../../app/alerting/send-alerts')
const { sendAlerts: mockSendAlerts } = require('../../../app/alerting/send-alerts')

const { RECIPIENTS } = require('../../mocks/values/recipients')
const { PAYMENT_REJECTED: PAYMENT_REJECTED_TEMPLATE } = require('../../../app/constants/templates')
const { processAlert } = require('../../../app/alerting/process-alert')
const sourceSystems = require('../../../app/constants/source-systems')
const {
  BATCH_REJECTED,
  DEMOGRAPHICS_UPDATE_FAILED
} = require('../../../app/constants/events')

let event

describe('processAlertAllCases', () => {
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
    expect(mockSendAlerts).toHaveBeenCalledWith(RECIPIENTS, PAYMENT_REJECTED_TEMPLATE, event)
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  test('should not send the alerts if template not found', async () => {
    event.type = 'unknown'
    await processAlert(event)
    expect(mockSendAlerts).not.toHaveBeenCalled()
    expect(mockGenerateReturnFile).not.toHaveBeenCalled()
  })

  const returnFileScenarios = [
    ['should generate return file if FC and event type matches', sourceSystems.FC, BATCH_REJECTED, true],
    ['should not generate return file if source system is not FC', 'OTHER_SYSTEM', BATCH_REJECTED, false],
    ['should not generate return file if event type does not match', sourceSystems.FC, DEMOGRAPHICS_UPDATE_FAILED, false]
  ]

  test.each(returnFileScenarios)(
    '%s',
    async (_, sourceSystem, type, shouldGenerate) => {
      event.data.sourceSystem = sourceSystem
      event.type = type

      await processAlert(event)

      expect(mockSendAlerts).toHaveBeenCalled()
      if (shouldGenerate) {
        expect(mockGenerateReturnFile).toHaveBeenCalledWith(event)
      } else {
        expect(mockGenerateReturnFile).not.toHaveBeenCalled()
      }
    }
  )
})
