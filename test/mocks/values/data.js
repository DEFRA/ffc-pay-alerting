const { CONTRACT_NUMBER } = require('./contract-number')
const { FRN } = require('./frn')
const { INVOICE_NUMBER } = require('./invoice-number')
const { MESSAGE } = require('./message')
const { SCHEME_ID } = require('./scheme-id')

module.exports = {
  DATA: {
    message: MESSAGE,
    frn: FRN,
    invoiceNumber: INVOICE_NUMBER,
    schemeId: SCHEME_ID,
    contractNumber: CONTRACT_NUMBER
  }
}
