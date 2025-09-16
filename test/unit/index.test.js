jest.mock('../../app/messaging')
jest.mock('../../app/cache')
const mockMessaging = require('../../app/messaging')
const mockCache = require('../../app/cache')

describe('app', () => {
  beforeEach(() => {
    require('../../app')
  })

  test('starts messaging', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
    expect(mockCache.start).toHaveBeenCalled()
  })
})
