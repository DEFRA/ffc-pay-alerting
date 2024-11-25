const moment = require('moment')
const { getInboundBlobClient } = require('../../../app/storage')
const { generateReturnFile } = require('../../../app/alerting/generate-return-file')

jest.mock('moment')
jest.mock('../../../app/storage')

describe('generateReturnFile', () => {
  beforeAll(() => {
    console.info = jest.fn()
  })

  afterAll(() => {
    console.info.mockRestore()
  })

  test('should generate return file and publish it', async () => {
    const mockEvent = { some: 'data' }
    const mockBlobClient = {
      upload: jest.fn().mockResolvedValue()
    }
    const mockMoment = {
      format: jest.fn().mockReturnValue('240101010101')
    }

    moment.mockReturnValue(mockMoment)
    getInboundBlobClient.mockResolvedValue(mockBlobClient)

    await generateReturnFile(mockEvent)

    expect(getInboundBlobClient).toHaveBeenCalledWith('FCAP_123_RPA_240101010101_NO_RETURN_FILE.dat')
    expect(mockBlobClient.upload).toHaveBeenCalledWith(mockEvent, mockEvent.length)
    expect(console.info).toHaveBeenCalledWith('Published FCAP_123_RPA_240101010101_NO_RETURN_FILE.dat')
  })
})
