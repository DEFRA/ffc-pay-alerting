const { get } = require('./get')
const { set } = require('./set')

const setCachedAlertMessage = async (cacheName, key, data) => {
  const cacheData = await get(cacheName, key)
  const hasCache = cacheData && Object.keys(cacheData).length > 0
  if (!hasCache) {
    console.log('Caching value:', key)
    await set(cacheName, key, data)
  }
}

module.exports = {
  setCachedAlertMessage
}
