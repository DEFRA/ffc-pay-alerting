jest.mock('../../../app/alerting/get-environment')
const { getEnvironment: mockGetEnvironment } = require('../../../app/alerting/get-environment')

jest.mock('../../../app/alerting/get-scheme')
const { getScheme: mockGetScheme } = require('../../../app/alerting/get-scheme')

const { getPersonalisation } = require('../../../app/alerting/get-personalisation')

let event

describe('get personalisation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    event = JSON.parse(JSON.stringify(require('../../mocks/events/event')))
  })

  test('should return message from event data', () => {
    const result = getPersonalisation(event)
    expect(result.message).toBe(event.data.message)
  })
})
