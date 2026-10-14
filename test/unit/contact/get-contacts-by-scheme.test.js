const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['contact'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const events = require('../../../app/constants/events')
const { getContactsByScheme } = require('../../../app/contact/get-contacts-by-scheme')

const arrayFields = Object.keys(events).map((key) => key.toLowerCase())

describe('getContactsByScheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves([])
  })

  test('should query contacts that have not been removed when no schemeId provided', async () => {
    await getContactsByScheme()

    expect(mockDb.tables.contact).toHaveBeenCalledTimes(1)
    expect(mockDb.builder.select).toHaveBeenCalledWith(['contactId', 'emailAddress', ...arrayFields])
    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('removedAt')
    expect(mockDb.builder.where).not.toHaveBeenCalled()
    expect(mockDb.builder.orWhere).not.toHaveBeenCalled()
  })

  test('should match any alert array containing the schemeId when valid numeric schemeId provided', async () => {
    await getContactsByScheme('5')

    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('removedAt')
    expect(mockDb.builder.where).toHaveBeenCalledTimes(1)
    expect(mockDb.builder.orWhere).toHaveBeenCalledTimes(arrayFields.length)
    for (const field of arrayFields) {
      expect(mockDb.builder.orWhere).toHaveBeenCalledWith(field, '@>', [5])
    }
  })

  test('should not filter by scheme when schemeId is non-numeric', async () => {
    await getContactsByScheme('not-a-number')

    expect(mockDb.builder.whereNull).toHaveBeenCalledWith('removedAt')
    expect(mockDb.builder.where).not.toHaveBeenCalled()
    expect(mockDb.builder.orWhere).not.toHaveBeenCalled()
  })

  test('should not filter by scheme when schemeId is null or undefined', async () => {
    await getContactsByScheme(null)
    expect(mockDb.builder.where).not.toHaveBeenCalled()

    jest.clearAllMocks()
    await getContactsByScheme(undefined)
    expect(mockDb.builder.where).not.toHaveBeenCalled()
  })

  test('should return the contacts found', async () => {
    const contacts = [{ contactId: 1, emailAddress: 'a@example.com' }]
    mockDb.builder.resolves(contacts)

    const result = await getContactsByScheme('5')

    expect(result).toEqual(contacts)
  })

  test('should propagate a database failure', async () => {
    mockDb.builder.rejects(new Error('DB error'))

    await expect(getContactsByScheme('5')).rejects.toThrow('DB error')
  })
})
