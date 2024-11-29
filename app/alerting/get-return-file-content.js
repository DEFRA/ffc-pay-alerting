const { UNKNOWN } = require('../constants/unknown')

const getCSVString = (data) => {
  const csvString = `${data.sbi},${data.frn},${data.agreementNumber},${data.claimNumber},${data.claimDate},${data.amount},,,${data.inboundFileNumber},${data.errorCode},${data.errorMessage}`
  return csvString
}

const getReturnFileContent = (event) => {
  const regex = /(?<=^[A-Z]{4}_)\d{4}/
  const batch = event.data?.batch || UNKNOWN
  const match = batch.match(regex)
  const inboundFileNumber = match ? match[0] : UNKNOWN
  return getCSVString({
    sbi: event.data?.sbi ?? UNKNOWN,
    frn: event.data?.frn ?? UNKNOWN,
    agreementNumber: event.data?.agreementNumber ?? UNKNOWN,
    claimNumber: event.data?.claimNumber ?? UNKNOWN,
    claimDate: event.data?.claimDate ?? UNKNOWN,
    amount: event.data?.value ?? UNKNOWN,
    inboundFileNumber,
    errorCode: 'F',
    errorMessage: event.data?.message ?? UNKNOWN
  })
}

module.exports = {
  getReturnFileContent
}
