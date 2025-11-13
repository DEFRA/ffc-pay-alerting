const mockClient = {
  get: jest.fn()
}

jest.mock('../../../app/cache/base')
const { getClient: mockGetClient } = require('../../../app/cache/base')

jest.mock('../../../app/cache/get-full-key')
const { getFullKey: mockGetFullKey } = require('../../../app/cache/get-full-key')

const { PREFIX } = require('../../mocks/cache/prefix')
const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')
const { VALUE, VALUE_STRING } = require('../../mocks/cache/value')

const { get } = require('../../../app/cache/get')

describe('cacheGetAllCases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetClient.mockReturnValue(mockClient)
    mockGetFullKey.mockReturnValue(PREFIX)
  })

  test('should get full key using name and key', async () => {
    await get(NAME, KEY)
    expect(mockGetFullKey).toHaveBeenCalledWith(NAME, KEY)
  })

  test('should get value from cache using full key', async () => {
    await get(NAME, KEY)
    expect(mockClient.get).toHaveBeenCalledWith(PREFIX)
  })

  const valueScenarios = [
    ['should return parsed value from cache', VALUE_STRING, VALUE],
    ['should return empty object if cache returns null', null, {}]
  ]

  test.each(valueScenarios)('%s', async (_, mockValue, expected) => {
    mockClient.get.mockResolvedValue(mockValue)
    const value = await get(NAME, KEY)
    expect(value).toEqual(expected)
  })
})
