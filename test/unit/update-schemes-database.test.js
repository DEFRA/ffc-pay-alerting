jest.mock('ffc-pay-schemes', () => ({
  getSchemes: jest.fn()
}))
const { getSchemes: mockGetSchemes } = require('ffc-pay-schemes')

const { createKnexMock } = require('../helpers/mock-knex')

const mockDb = createKnexMock(['scheme'])

jest.mock('../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { updateSchemesDatabase } = require('../../app/update-schemes-database')

describe('update schemes database', () => {
  let consoleLogSpy

  beforeEach(() => {
    jest.clearAllMocks()
    mockDb.builder.resolves()
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  test('should get the schemes', async () => {
    mockGetSchemes.mockReturnValue([])

    await updateSchemesDatabase()

    expect(mockGetSchemes).toHaveBeenCalledTimes(1)
  })

  test('should create a record for a new scheme', async () => {
    const scheme = {
      schemeId: 1,
      schemeName: 'Sustainable Farming Incentive 22',
      sourceSystem: 'SFI'
    }

    mockGetSchemes.mockReturnValue([scheme])
    mockDb.builder.resolves(undefined)

    await updateSchemesDatabase()

    expect(mockDb.tables.scheme).toHaveBeenCalledTimes(2)
    expect(mockDb.builder.where).toHaveBeenCalledWith({ schemeId: scheme.schemeId })
    expect(mockDb.builder.first).toHaveBeenCalledTimes(1)

    expect(mockDb.builder.insert).toHaveBeenCalledWith({
      schemeId: scheme.schemeId,
      name: scheme.schemeName,
      sourceSystem: scheme.sourceSystem
    })
    expect(mockDb.builder.onConflict).toHaveBeenCalledWith('schemeId')
    expect(mockDb.builder.merge).toHaveBeenCalledTimes(1)

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `${scheme.schemeName} created`
    )
  })

  test('should update an existing scheme record', async () => {
    const scheme = {
      schemeId: 1,
      schemeName: 'Updated scheme name',
      sourceSystem: 'SFI'
    }

    mockGetSchemes.mockReturnValue([scheme])
    mockDb.builder.resolves({ schemeId: scheme.schemeId })

    await updateSchemesDatabase()

    expect(mockDb.builder.where).toHaveBeenCalledWith({ schemeId: scheme.schemeId })

    expect(mockDb.builder.insert).toHaveBeenCalledWith({
      schemeId: scheme.schemeId,
      name: scheme.schemeName,
      sourceSystem: scheme.sourceSystem
    })
    expect(mockDb.builder.onConflict).toHaveBeenCalledWith('schemeId')
    expect(mockDb.builder.merge).toHaveBeenCalledTimes(1)

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `${scheme.schemeName} updated`
    )
  })

  test('should upsert every scheme', async () => {
    const schemes = [
      {
        schemeId: 1,
        schemeName: 'Scheme one',
        sourceSystem: 'SOURCE_ONE'
      },
      {
        schemeId: 2,
        schemeName: 'Scheme two',
        sourceSystem: 'SOURCE_TWO'
      }
    ]

    mockGetSchemes.mockReturnValue(schemes)

    await updateSchemesDatabase()

    expect(mockDb.builder.first).toHaveBeenCalledTimes(schemes.length)
    expect(mockDb.builder.insert).toHaveBeenCalledTimes(schemes.length)
    expect(mockDb.builder.merge).toHaveBeenCalledTimes(schemes.length)

    for (const scheme of schemes) {
      expect(mockDb.builder.insert).toHaveBeenCalledWith({
        schemeId: scheme.schemeId,
        name: scheme.schemeName,
        sourceSystem: scheme.sourceSystem
      })
    }
  })

  test('should log that it is checking for updates', async () => {
    mockGetSchemes.mockReturnValue([])

    await updateSchemesDatabase()

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Checking for updates to supported schemes'
    )
  })

  test('should process schemes sequentially', async () => {
    const schemes = [
      {
        schemeId: 1,
        schemeName: 'Scheme one',
        sourceSystem: 'SOURCE_ONE'
      },
      {
        schemeId: 2,
        schemeName: 'Scheme two',
        sourceSystem: 'SOURCE_TWO'
      }
    ]

    const calls = []

    mockGetSchemes.mockReturnValue(schemes)
    mockDb.builder.insert.mockImplementation(({ schemeId }) => {
      calls.push(schemeId)
      return mockDb.builder
    })

    await updateSchemesDatabase()

    expect(calls).toEqual([1, 2])
  })

  test('should reject if the database fails', async () => {
    const error = new Error('Database error')

    mockGetSchemes.mockReturnValue([{
      schemeId: 1,
      schemeName: 'Scheme one',
      sourceSystem: 'SOURCE_ONE'
    }])
    mockDb.builder.rejects(error)

    await expect(updateSchemesDatabase()).rejects.toBe(error)
  })
})
