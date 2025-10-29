const { OK } = require('../../constants/ok')
const { OK: OK_STATUS } = require('../../constants/status')

module.exports = {
  method: 'GET',
  path: '/healthz',
  handler: (_request, h) => {
    return h.response(OK).code(OK_STATUS)
  }
}
