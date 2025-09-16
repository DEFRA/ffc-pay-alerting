jest.mock('../../../app/cache/get')
const { get: mockGet } = require('../../../app/cache/get')

jest.mock('../../../app/cache/set')
const { set: mockSet } = require('../../../app/cache/set')

const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')
const { DATA } = require('../../mocks/cache/data')

const { setCachedAlertMessage } = require('../../../app/cache/set-cached-alert-response')

describe('set cached response', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get from cache with name and key', async () => {
    mockGet.mockResolvedValue(DATA)
    await setCachedAlertMessage(NAME, KEY, DATA)
    expect(mockGet).toHaveBeenCalledWith(NAME, KEY)
  })

  test('should set cache if cacheData does not exist', async () => {
    mockGet.mockResolvedValue(undefined)
    await setCachedAlertMessage(NAME, KEY, DATA)
    expect(mockSet).toHaveBeenCalledWith(NAME, KEY, DATA)
  })

  test('should not set cache if cacheData exists', async () => {
    mockGet.mockResolvedValue(DATA)
    await setCachedAlertMessage(NAME, KEY, DATA)
    expect(mockSet).not.toHaveBeenCalled()
  })
})
