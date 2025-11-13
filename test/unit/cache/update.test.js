jest.mock('../../../app/cache/get')
const { get: mockGet } = require('../../../app/cache/get')

jest.mock('../../../app/cache/set')
const { set: mockSet } = require('../../../app/cache/set')

const { NAME } = require('../../mocks/cache/name')
const { KEY } = require('../../mocks/cache/key')
const { VALUE } = require('../../mocks/cache/value')

const { update } = require('../../../app/cache/update')

describe('cacheUpdateAllCases', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should get existing item from cache', async () => {
    mockGet.mockResolvedValue({})
    await update(NAME, KEY, VALUE)
    expect(mockGet).toHaveBeenCalledWith(NAME, KEY)
  })

  const scenarios = [
    ['should set value as is if no existing value', {}, VALUE, VALUE],
    ['should merge existing object with new value', { a: 1, b: 2 }, VALUE, { a: 1, b: 2, ...VALUE }],
    ['should overwrite arrays instead of merging', { a: [1, 2, 3] }, { a: [4, 5, 6] }, { a: [4, 5, 6] }]
  ]

  test.each(scenarios)('%s', async (_, existing, newValue, expected) => {
    mockGet.mockResolvedValue(existing)
    await update(NAME, KEY, newValue)
    expect(mockSet).toHaveBeenCalledWith(NAME, KEY, expected)
  })
})
