const moment = require('moment')
const { getInboundBlobClient } = require('../storage')

const publishReturnFile = async (returnFilename, returnFileContent) => {
  const blobClient = await getInboundBlobClient(returnFilename)
  await blobClient.upload(returnFileContent, returnFileContent.length)
  console.info(`Published ${returnFilename}`)
}

const generateReturnFile = async (event) => {
  const currentDate = moment()
  const sequenceString = '123'
  const returnFilename = `FCAP_${sequenceString}_RPA_${currentDate.format('YYMMDDHHmmss')}_NO_RETURN_FILE.dat`
  return publishReturnFile(returnFilename, event)
}

module.exports = {
  generateReturnFile
}
