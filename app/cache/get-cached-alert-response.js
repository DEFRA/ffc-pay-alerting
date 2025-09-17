const { get } = require('./get')

const getCachedAlertMessage = async (cache, key) => {
  const cacheData = await get(cache, key)
  const hasCache = cacheData && Object.keys(cacheData).length > 0
  console.log(hasCache ? 'Using cached value' : 'No cached value available')
  return hasCache ? cacheData : null
}

module.exports = {
  getCachedAlertMessage
}
