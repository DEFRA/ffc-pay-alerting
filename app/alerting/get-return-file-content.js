const { UNKNOWN } = require('../constants/unknown')

const getCSVString = (data) => {
  const csvString = `${data.sbi},${data.frn},${data.caseNumber},${data.claimNumber},${data.claimFileData},${data.amount},,,${data.inboundFileNumber},${data.errorCode},${data.errorMessage}`
  return csvString
}

const getReturnFileContent = (event) => {
  return getCSVString({
    sbi: event.data?.sbi ?? UNKNOWN,
    frn: event.data?.frn ?? UNKNOWN,
    caseNumber: event.data?.caseNumber ?? UNKNOWN,
    claimNumber: event.data?.claimNumber ?? UNKNOWN,
    claimFileData: event.data?.claimFileData ?? UNKNOWN,
    amount: event.data?.amount ?? UNKNOWN,
    inboundFileNumber: event.data?.inboundFileNumber ?? UNKNOWN,
    errorCode: event.data?.errorCode ?? UNKNOWN,
    errorMessage: event.data?.errorMessage ?? UNKNOWN
  })
}

module.exports = {
  getReturnFileContent
}
