const { get } = require('./get')
const { set } = require('./set')

const setCachedAlertMessage = async (cacheName, key, data) => {
  const cacheData = await get(cacheName, key)
  if (!cacheData) {
    console.log('Caching value')
    await set(cacheName, key, data)
  }
}

module.exports = {
  setCachedAlertMessage
}
