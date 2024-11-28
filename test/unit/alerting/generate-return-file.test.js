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
        caseNumber: 'caseNumberTest',
        claimNumber: 'claimNumberTest',
        claimFileData: 'claimFileDataTest',
        amount: 'amountTest',
        inboundFileNumber: 'inboundFileNumberTest',
        errorCode: 'errorCodeTest',
        errorMessage: 'errorMessageTest'
      }
    }
    const expectedContent = 'sbiTest,frnTest,caseNumberTest,claimNumberTest,claimFileDataTest,amountTest,,,inboundFileNumberTest,errorCodeTest,errorMessageTest'
    const mockBlobClient = {
      upload: jest.fn().mockResolvedValue()
    }
    const mockMoment = {
      format: jest.fn().mockReturnValue('240101010101')
    }

    moment.mockReturnValue(mockMoment)
    getInboundBlobClient.mockResolvedValue(mockBlobClient)

    await generateReturnFile(mockEvent)

    expect(getInboundBlobClient).toHaveBeenCalledWith('FCAP_XXXX_RPA_240101010101_NO_RETURN_FILE.dat')
    expect(mockBlobClient.upload).toHaveBeenCalledWith(expectedContent, expectedContent.length)
    expect(console.info).toHaveBeenCalledWith('Published FCAP_XXXX_RPA_240101010101_NO_RETURN_FILE.dat')
  })
})
