jest.mock('../../app/messaging', () => ({
  start: jest.fn(),
  stop: jest.fn()
}))

jest.mock('../../app/cache', () => ({
  start: jest.fn(),
  stop: jest.fn()
}))

jest.mock('../../app/server', () => ({
  start: jest.fn()
}))

jest.mock('../../app/update-schemes-database', () => ({
  updateSchemesDatabase: jest.fn()
}))

const mockMessaging = require('../../app/messaging')
const mockCache = require('../../app/cache')
const mockServer = require('../../app/server')
const mockUpdateSchemesDatabase = require('../../app/update-schemes-database')

describe('app', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('starts all expected functions', async () => {
    await jest.isolateModulesAsync(async () => {
      await require('../../app')
    })

    expect(mockCache.start).toHaveBeenCalled()
    expect(mockServer.start).toHaveBeenCalled()
    expect(mockUpdateSchemesDatabase.updateSchemesDatabase).toHaveBeenCalled()
    expect(mockMessaging.start).toHaveBeenCalled()
  })
})
