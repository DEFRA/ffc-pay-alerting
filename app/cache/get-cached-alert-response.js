const { get } = require('./get')

const getCachedAlertMessage = async (cache, key) => {
  const cacheData = await get(cache, key)
  console.log(cacheData ? 'Using cached value' : 'No cached value available')
  return cacheData
}

module.exports = {
  getCachedAlertMessage
}
