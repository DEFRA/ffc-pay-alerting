const moment = require('moment')
const { getInboundBlobClient } = require('../storage')
const { getReturnFileContent } = require('./get-return-file-content')

const publishReturnFile = async (returnFilename, returnFileContent) => {
  const blobClient = await getInboundBlobClient(returnFilename)
  await blobClient.upload(returnFileContent, returnFileContent.length)
  console.info(`Published ${returnFilename}`)
}

const generateReturnFile = async (event) => {
  const currentDate = moment()
  // hard coded sequence because it will be correctly generated in pay responses service
  const sequenceString = 'XXXX'
  const returnFilename = `FCAP_${sequenceString}_RPA_${currentDate.format('YYMMDDHHmmss')}_NO_RETURN_FILE.dat`
  const content = getReturnFileContent(event)
  return publishReturnFile(returnFilename, content)
}

module.exports = {
  generateReturnFile
}
