jest.mock('../../app/messaging', () => ({
  start: jest.fn(),
  stop: jest.fn()
}))

jest.mock('../../app/cache', () => ({
  start: jest.fn(),
  stop: jest.fn()
}))

const mockMessaging = require('../../app/messaging')
const mockCache = require('../../app/cache')

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('starts messaging', async () => {
    await jest.isolateModulesAsync(async () => {
      await require('../../app')
    })

    expect(mockMessaging.start).toHaveBeenCalled()
    expect(mockCache.start).toHaveBeenCalled()
  })
})
