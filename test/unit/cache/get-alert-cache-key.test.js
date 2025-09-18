const { CATEGORY } = require('../../mocks/values/category')
const { REQUEST_VALUE } = require('../../mocks/cache/request-value')

const { getAlertCacheKey } = require('../../../app/cache/get-alert-cache-key')

describe('get alert cache key', () => {
  test('should return alert cache key as sha256 hex string', () => {
    const key = getAlertCacheKey(CATEGORY, REQUEST_VALUE)
    expect(typeof key).toBe('string')
    expect(key).toHaveLength(64)
    expect(key).toMatch(/^[a-f0-9]{64}$/i)
  })
})
