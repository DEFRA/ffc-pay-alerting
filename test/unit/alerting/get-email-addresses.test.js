const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['contact'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const events = require('../../../app/constants/events')
const { getEmailAddresses } = require('../../../app/alerting/get-email-addresses')

describe('getEmailAddresses', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves([])
  })

  const mockContacts = emails => emails.map(email => ({ emailAddress: email }))

  test('returns empty array if eventType is unknown', async () => {
    const result = await getEmailAddresses('unknown_eventType', 1)
    expect(result).toEqual([])
    expect(mockDb.tables.contact).not.toHaveBeenCalled()
  })

  test('returns empty array if schemeId is 0', async () => {
    const result = await getEmailAddresses(events.BATCH_REJECTED, 0)
    expect(result).toEqual([])
    expect(mockDb.tables.contact).not.toHaveBeenCalled()
  })

  test('queries contacts with correct predicates based on event and schemeId', async () => {
    const eventType = events.PAYMENT_REJECTED
    const schemeId = 123

    mockDb.builder.resolves(mockContacts(['a@test.com', 'b@test.com']))

    const result = await getEmailAddresses(eventType, schemeId)

    expect(mockDb.tables.contact).toHaveBeenCalledTimes(1)
    expect(mockDb.builder.select).toHaveBeenCalledWith('emailAddress')
    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('removedAt')
    expect(mockDb.builder.where).toHaveBeenCalledWith('payment_rejected', '@>', [schemeId])

    expect(result).toEqual(['a@test.com', 'b@test.com'])
  })

  test('works correctly for different event types and schemeIds', async () => {
    const testCases = [
      { event: events.BATCH_REJECTED, key: 'batch_rejected', schemeId: 1, emails: ['x@example.com'] },
      { event: events.DEMOGRAPHICS_UPDATE_FAILED, key: 'demographics_update_failed', schemeId: 42, emails: ['demog@test.com', 'dev@test.com'] },
      { event: events.TABLE_CREATE_ALERT, key: 'table_create_alert', schemeId: 5, emails: [] }
    ]

    for (const { event, key, schemeId, emails } of testCases) {
      mockDb.builder.resolves(mockContacts(emails))

      const result = await getEmailAddresses(event, schemeId)

      expect(mockDb.builder.where).toHaveBeenCalledWith(key, '@>', [schemeId])

      expect(result).toEqual(emails)
    }
  })

  test('returns empty array if no contacts found', async () => {
    mockDb.builder.resolves([])

    const result = await getEmailAddresses(events.BATCH_REJECTED, 10)

    expect(result).toEqual([])
  })

  test('handles multiple schemeIds as numbers and strings (schemeId as number)', async () => {
    const schemeId = 99
    mockDb.builder.resolves(mockContacts(['multi@test.com']))

    const result = await getEmailAddresses(events.RESPONSE_REJECTED, schemeId)

    expect(mockDb.builder.where).toHaveBeenCalledWith('response_rejected', '@>', [schemeId])
    expect(result).toEqual(['multi@test.com'])
  })

  test('propagates a database failure', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(getEmailAddresses(events.BATCH_REJECTED, 1)).rejects.toThrow('DB error')
  })
})
