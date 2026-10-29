jest.mock('ffc-pay-schemes', () => ({
  getSchemeIdFromSourceSystem: jest.fn()
}))
const { getSchemeIdFromSourceSystem } = require('ffc-pay-schemes')

jest.mock('../../../app/alerting/get-email-addresses', () => ({
  getEmailAddresses: jest.fn()
}))
const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

jest.mock('../../../app/config', () => ({
  alertConfig: {
    pdsTeamEmails: '',
    devTeamEmails: ''
  }
}))
const { alertConfig } = require('../../../app/config')

const { SCHEME_ADDED } = require('../../../app/constants/events')

const { getRecipients } = require('../../../app/alerting/get-recipients')

describe('getRecipients', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('returns combined and trimmed email addresses from all sources', async () => {
    const event = {
      type: 'eventType1',
      data: {
        sourceSystem: 'source1'
      }
    }
    getSchemeIdFromSourceSystem.mockResolvedValue('scheme123')
    getEmailAddresses.mockResolvedValue([' user1@example.com ', 'user2@example.com'])
    alertConfig.pdsTeamEmails = 'pds1@example.com ; pds2@example.com '
    alertConfig.devTeamEmails = 'dev1@example.com;dev2@example.com '

    const result = await getRecipients(event)

    expect(getSchemeIdFromSourceSystem).toHaveBeenCalledWith('source1')
    expect(getEmailAddresses).toHaveBeenCalledWith('eventType1', 'scheme123')
    expect(result).toEqual([
      'user1@example.com',
      'user2@example.com',
      'pds1@example.com',
      'pds2@example.com',
      'dev1@example.com',
      'dev2@example.com'
    ])
  })

  test.each([
    ['empty data', {}],
    ['missing data', undefined],
    ['null schemeId and sourceSystem', { schemeId: null, sourceSystem: null }]
  ])('skips contact lookup and returns default emails when no schemeId or sourceSystem (%s)', async (_, data) => {
    const event = {
      type: 'eventType2',
      data
    }
    alertConfig.pdsTeamEmails = 'pds@example.com'
    alertConfig.devTeamEmails = 'dev@example.com'

    const result = await getRecipients(event)

    expect(getSchemeIdFromSourceSystem).not.toHaveBeenCalled()
    expect(getEmailAddresses).not.toHaveBeenCalled()
    expect(result).toEqual(['pds@example.com', 'dev@example.com'])
  })

  test('uses schemeId from event without looking up sourceSystem', async () => {
    const event = {
      type: 'eventType5',
      data: {
        schemeId: 7
      }
    }
    getEmailAddresses.mockResolvedValue(['user@example.com'])
    alertConfig.pdsTeamEmails = ''
    alertConfig.devTeamEmails = ''

    const result = await getRecipients(event)

    expect(getSchemeIdFromSourceSystem).not.toHaveBeenCalled()
    expect(getEmailAddresses).toHaveBeenCalledWith('eventType5', 7)
    expect(result).toEqual(['user@example.com'])
  })

  test('looks up sourceSystem when schemeId from event is 0', async () => {
    const event = {
      type: 'eventType6',
      data: {
        schemeId: 0,
        sourceSystem: 'source6'
      }
    }
    getSchemeIdFromSourceSystem.mockResolvedValue(6)
    getEmailAddresses.mockResolvedValue(['user@example.com'])
    alertConfig.pdsTeamEmails = ''
    alertConfig.devTeamEmails = ''

    const result = await getRecipients(event)

    expect(getSchemeIdFromSourceSystem).toHaveBeenCalledWith('source6')
    expect(getEmailAddresses).toHaveBeenCalledWith('eventType6', 6)
    expect(result).toEqual(['user@example.com'])
  })

  test('skips contact lookup when schemeId from event is 0 and no sourceSystem', async () => {
    const event = {
      type: 'eventType7',
      data: {
        schemeId: 0
      }
    }
    alertConfig.pdsTeamEmails = 'pds@example.com'
    alertConfig.devTeamEmails = ''

    const result = await getRecipients(event)

    expect(getSchemeIdFromSourceSystem).not.toHaveBeenCalled()
    expect(getEmailAddresses).not.toHaveBeenCalled()
    expect(result).toEqual(['pds@example.com'])
  })

  test.each([undefined, 0])('skips contact lookup when sourceSystem resolves to scheme %p', async (resolvedSchemeId) => {
    const event = {
      type: 'eventType8',
      data: {
        sourceSystem: 'source8'
      }
    }
    getSchemeIdFromSourceSystem.mockResolvedValue(resolvedSchemeId)
    alertConfig.pdsTeamEmails = 'pds@example.com'
    alertConfig.devTeamEmails = ''

    const result = await getRecipients(event)

    expect(getSchemeIdFromSourceSystem).toHaveBeenCalledWith('source8')
    expect(getEmailAddresses).not.toHaveBeenCalled()
    expect(result).toEqual(['pds@example.com'])
  })

  test.each([
    { schemeId: 0 },
    { schemeId: 7, sourceSystem: 'source9' },
    {}
  ])('looks up scheme added contacts with scheme 0 for event data %p', async (data) => {
    const event = {
      type: SCHEME_ADDED,
      data
    }
    getEmailAddresses.mockResolvedValue(['subscribed@example.com'])
    alertConfig.pdsTeamEmails = ''
    alertConfig.devTeamEmails = ''

    const result = await getRecipients(event)

    expect(getSchemeIdFromSourceSystem).not.toHaveBeenCalled()
    expect(getEmailAddresses).toHaveBeenCalledWith(SCHEME_ADDED, 0)
    expect(result).toEqual(['subscribed@example.com'])
  })

  test('handles empty email addresses and team emails', async () => {
    const event = {
      type: 'eventType3',
      data: {
        sourceSystem: 'source3'
      }
    }
    getSchemeIdFromSourceSystem.mockResolvedValue('scheme3')
    getEmailAddresses.mockResolvedValue([])
    alertConfig.pdsTeamEmails = ''
    alertConfig.devTeamEmails = ''

    const result = await getRecipients(event)

    expect(result).toEqual([])
  })

  test('filters out empty and whitespace-only emails from all sources', async () => {
    const event = {
      type: 'eventType4',
      data: {
        sourceSystem: 'source4'
      }
    }
    getSchemeIdFromSourceSystem.mockResolvedValue('scheme4')
    getEmailAddresses.mockResolvedValue(['', ' ', 'valid@example.com'])
    alertConfig.pdsTeamEmails = ' ; pds@example.com; '
    alertConfig.devTeamEmails = '   ;dev@example.com'

    const result = await getRecipients(event)

    expect(result).toEqual(['valid@example.com', 'pds@example.com', 'dev@example.com'])
  })
})
