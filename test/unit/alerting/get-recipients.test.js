jest.mock('../../../app/alerting/get-email-addresses')
const { getEmailAddresses: mockGetEmailAddresses } = require('../../../app/alerting/get-email-addresses')

const { EMAIL } = require('../../mocks/values/email')
const event = require('../../mocks/event')

const { getRecipients } = require('../../../app/alerting/get-recipients')

describe('getRecipientsAllCases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEmailAddresses.mockReturnValue(EMAIL)
  })

  test('should get email addresses', () => {
    getRecipients(event)
    expect(mockGetEmailAddresses).toHaveBeenCalledTimes(1)
  })

  test('should get email addresses from event type and source', () => {
    getRecipients(event)
    expect(mockGetEmailAddresses).toHaveBeenCalledWith(event.type, event.data.sourceSystem)
  })

  const emailScenarios = [
    [EMAIL, [EMAIL]],
    [undefined, []],
    [`${EMAIL};${EMAIL}`, [EMAIL, EMAIL]],
    [` ${EMAIL} ; ${EMAIL} `, [EMAIL, EMAIL]],
    [` ${EMAIL} ;; ${EMAIL} `, [EMAIL, EMAIL]]
  ]

  test.each(emailScenarios)(
    'should correctly parse emails from mock value %p',
    (mockReturn, expected) => {
      mockGetEmailAddresses.mockReturnValue(mockReturn)
      const result = getRecipients(event)
      expect(result).toStrictEqual(expected)
    }
  )
})
