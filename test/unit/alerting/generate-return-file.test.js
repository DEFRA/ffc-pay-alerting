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
    const mockEvent = {
      data: {
        sbi: 'sbiTest',
        frn: 'frnTest',
        agreementNumber: 'agreementNumberTest',
        claimNumber: 'claimNumberTest',
        claimDate: 'claimDateTest',
        value: 'amountTest',
        batch: 'FCAP_1234_567890123456.dat',
        message: 'errorMessageTest'
      }
    }
    const expectedContent = 'sbiTest,frnTest,agreementNumberTest,claimNumberTest,claimDateTest,amountTest,,,1234,F,errorMessageTest'
    const mockBlobClient = {
      upload: jest.fn().mockResolvedValue()
    }
    const mockMoment = {
      format: jest.fn().mockReturnValue('240101010101')
    }

    moment.mockReturnValue(mockMoment)
    getInboundBlobClient.mockResolvedValue(mockBlobClient)

    await generateReturnFile(mockEvent)

    expect(getInboundBlobClient).toHaveBeenCalledWith('FCAP_XXXX_RPA_240101010101_NO_RETURN_MESSAGE.dat')
    expect(mockBlobClient.upload).toHaveBeenCalledWith(expectedContent, expectedContent.length)
    expect(console.info).toHaveBeenCalledWith('Published FCAP_XXXX_RPA_240101010101_NO_RETURN_MESSAGE.dat')
  })
})
