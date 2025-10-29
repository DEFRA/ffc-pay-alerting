jest.mock('../../../app/alerting/get-email-addresses')
jest.mock('../../../app/alerting/get-scheme-id-from-source-system')

const { getEmailAddresses: mockGetEmailAddresses } = require('../../../app/alerting/get-email-addresses')
const { getSchemeIdFromSourceSystem: mockGetSchemeIdFromSourceSystem } = require('../../../app/alerting/get-scheme-id-from-source-system')

const { EMAIL } = require('../../mocks/values/email')
const event = require('../../mocks/event')

const { getRecipients } = require('../../../app/alerting/get-recipients')

describe('getRecipients', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetEmailAddresses.mockResolvedValue([EMAIL])
    mockGetSchemeIdFromSourceSystem.mockResolvedValue(event.data.sourceSystem)
  })

  test('should call getSchemeIdFromSourceSystem with event source system', async () => {
    await getRecipients(event)
    expect(mockGetSchemeIdFromSourceSystem).toHaveBeenCalledTimes(1)
    expect(mockGetSchemeIdFromSourceSystem).toHaveBeenCalledWith(event.data.sourceSystem)
  })

  test('should call getEmailAddresses with event type and schemeId', async () => {
    await getRecipients(event)
    expect(mockGetEmailAddresses).toHaveBeenCalledTimes(1)
    expect(mockGetEmailAddresses).toHaveBeenCalledWith(event.type, event.data.sourceSystem)
  })

  test('should return array of trimmed emails', async () => {
    mockGetEmailAddresses.mockResolvedValueOnce([`  ${EMAIL}  `])
    const result = await getRecipients(event)
    expect(result).toStrictEqual([EMAIL])
  })

  test('should return multiple emails split by semicolon and trimmed', async () => {
    const multiEmails = [`  ${EMAIL}  `, ` ${EMAIL} `]
    mockGetEmailAddresses.mockResolvedValueOnce(multiEmails)
    const result = await getRecipients(event)
    expect(result).toStrictEqual(multiEmails.map(e => e.trim()))
  })

  test('should filter out empty emails after trimming', async () => {
    mockGetEmailAddresses.mockResolvedValueOnce([` ${EMAIL} `, ' ', '', '   '])
    const result = await getRecipients(event)
    expect(result).toStrictEqual([EMAIL])
  })

  test('should add pdsTeamEmails when emailAddresses is empty array', async () => {
    mockGetEmailAddresses.mockResolvedValueOnce([])
    const result = await getRecipients(event)
    expect(result).toContain('testpds@example.com')
  })

  test('should handle event with missing sourceSystem gracefully', async () => {
    const eventWithoutSource = { ...event, data: {} }
    mockGetSchemeIdFromSourceSystem.mockResolvedValueOnce(undefined)
    mockGetEmailAddresses.mockResolvedValueOnce([EMAIL])
    const result = await getRecipients(eventWithoutSource)
    expect(mockGetSchemeIdFromSourceSystem).toHaveBeenCalledWith(undefined)
    expect(mockGetEmailAddresses).toHaveBeenCalledWith(event.type, undefined)
    expect(result).toStrictEqual([EMAIL])
  })
})
