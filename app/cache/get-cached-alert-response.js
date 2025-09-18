const { get } = require('./get')

const getCachedAlertMessage = async (cache, key) => {
  const cacheData = await get(cache, key)
  const hasCache = cacheData && Object.keys(cacheData).length > 0
  console.log(hasCache ? 'Cached value found' : 'No cached value found')
  return hasCache ? cacheData : null
}

module.exports = {
  getCachedAlertMessage
}
