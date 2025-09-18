jest.mock('../../../app/cache/get')
const { get: mockGet } = require('../../../app/cache/get')

const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')

const { getCachedAlertMessage } = require('../../../app/cache/get-cached-alert-response')

describe('getCachedAlertMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call cache get with name and key', async () => {
    await getCachedAlertMessage(NAME, KEY)
    expect(mockGet).toHaveBeenCalledWith(NAME, KEY)
  })
})
