const { OK } = require('../../../../app/constants/ok')
const { OK: OK_STATUS } = require('../../../../app/constants/status')
const healthz = require('../../../../app/server/routes/healthz')

describe('/healthz route', () => {
  let hMock

  beforeEach(() => {
    hMock = {
      response: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    }
  })

  test('should respond with OK and correct status code', () => {
    const request = {}

    const response = healthz.handler(request, hMock)

    expect(hMock.response).toHaveBeenCalledWith(OK)
    expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)

    expect(response).toBe(hMock)
  })
})
