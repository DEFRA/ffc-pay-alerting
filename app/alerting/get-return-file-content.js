const { UNKNOWN } = require('../constants/unknown')
const { ERROR_CODE } = require('../constants/return-file')

const getCSVString = (data) => {
  const csvString = `${data.sbi},${data.frn},${data.agreementNumber},${data.claimNumber},${data.claimDate},${data.amount},,,${data.inboundFileNumber},${data.errorCode},${data.errorMessage}`
  return csvString
}

const getInboundFileNumber = (batch) => {
  const regex = /(?<=^[A-Z]{4}_)\d{4}/
  const match = batch.match(regex)
  return match ? match[0] : UNKNOWN
}

const getReturnFileContent = (event) => {
  const batch = event.data?.batch || UNKNOWN
  const inboundFileNumber = getInboundFileNumber(batch)
  return getCSVString({
    sbi: event.data?.sbi ?? UNKNOWN,
    frn: event.data?.frn ?? UNKNOWN,
    agreementNumber: event.data?.agreementNumber ?? UNKNOWN,
    claimNumber: event.data?.claimNumber ?? UNKNOWN,
    claimDate: event.data?.claimDate ?? UNKNOWN,
    amount: event.data?.value ?? UNKNOWN,
    inboundFileNumber,
    errorCode: ERROR_CODE,
    errorMessage: event.data?.message ?? UNKNOWN
  })
}

module.exports = {
  getReturnFileContent
}
