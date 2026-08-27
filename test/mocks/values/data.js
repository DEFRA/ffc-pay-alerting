const { getSchemeIds, getSourceSystems } = require('ffc-pay-schemes')
const { CONTRACT_NUMBER } = require('./contract-number')
const { FRN } = require('./frn')
const { INVOICE_NUMBER } = require('./invoice-number')
const { MESSAGE } = require('./message')
const { PAYMENT_REQUEST_NUMBER } = require('./payment-request-number')

const schemeIds = getSchemeIds()
const sourceSystems = getSourceSystems()

module.exports = {
  DATA: {
    message: MESSAGE,
    frn: FRN,
    invoiceNumber: INVOICE_NUMBER,
    schemeId: schemeIds.SFI,
    contractNumber: CONTRACT_NUMBER,
    paymentRequestNumber: PAYMENT_REQUEST_NUMBER,
    sourceSystem: sourceSystems.SFI
  }
}
