const { getReturnFileContent } = require('../../../app/alerting/get-return-file-content')

describe('getReturnFileContentAllCases', () => {
  const testCases = [
    [
      'should return CSV string with provided data',
      {
        data: {
          sbi: '123456',
          frn: '654321',
          agreementNumber: 'CASE123',
          contractNumber: 'CLAIM456',
          claimDate: '01/02/2003',
          value: 1000,
          batch: 'FCAP_5678_1234555.dat',
          errorCode: 'ERR001',
          message: 'Error message'
        }
      },
      'XXXX\r\n1\r\n10\r\n123456,654321,CASE123,CLAIM456,01/02/2003,10,,,5678,F,"Error message"'
    ],
    [
      'should return CSV string with empty strings for missing data',
      { data: {} },
      'XXXX\r\n1\r\n\r\n,,,,,,,,,F,""'
    ],
    [
      'should handle non-integer amount correctly',
      { data: { value: '1000.50' } },
      'XXXX\r\n1\r\n1000.50\r\n,,,,,1000.50,,,,F,""'
    ],
    [
      'should handle integer amount correctly',
      { data: { value: 1000 } },
      'XXXX\r\n1\r\n10\r\n,,,,,10,,,,F,""'
    ]
  ]

  test.each(testCases)('%s', (_, event, expectedCSV) => {
    const result = getReturnFileContent(event)
    expect(result).toBe(expectedCSV)
  })
})
