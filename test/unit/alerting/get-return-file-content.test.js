const { getReturnFileContent } = require('../../../app/alerting/get-return-file-content')
const { UNKNOWN } = require('../../../app/constants/unknown')

describe('getReturnFileContent', () => {
  test('should return CSV string with provided data', () => {
    const event = {
      data: {
        sbi: '123456',
        frn: '654321',
        caseNumber: 'CASE123',
        claimNumber: 'CLAIM456',
        claimFileData: 'FileData',
        amount: '1000',
        inboundFileNumber: 'INBOUND789',
        errorCode: 'ERR001',
        errorMessage: 'Error message'
      }
    }

    const expectedCSV = '123456,654321,CASE123,CLAIM456,FileData,1000,,,INBOUND789,ERR001,Error message'
    const result = getReturnFileContent(event)
    expect(result).toBe(expectedCSV)
  })

  test('should return CSV string with UNKNOWN for missing data', () => {
    const event = {
      data: {}
    }

    const expectedCSV = `${UNKNOWN},${UNKNOWN},${UNKNOWN},${UNKNOWN},${UNKNOWN},${UNKNOWN},,,${UNKNOWN},${UNKNOWN},${UNKNOWN}`
    const result = getReturnFileContent(event)
    expect(result).toBe(expectedCSV)
  })
})
