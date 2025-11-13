const {
  SFI,
  SFIP,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  MANUAL,
  SFI23,
  DELINKED
} = require('../../../app/constants/schemes')

const { getScheme } = require('../../../app/alerting/get-scheme')

describe('getSchemeAllCases', () => {
  const testCases = [
    [SFI, 'SFI'],
    [SFIP, 'SFI Pilot'],
    [LUMP_SUMS, 'Lump Sums'],
    [VET_VISITS, 'Vet Visits'],
    [CS, 'Countryside Stewardship'],
    [BPS, 'BPS'],
    [FDMR, 'FDMR'],
    [MANUAL, 'Manual Invoice'],
    [SFI23, 'SFI 23'],
    [DELINKED, 'Delinked Payments'],
    ['LNR', 'Unknown'] // unknown scheme
  ]

  test.each(testCases)(
    'should return correct scheme name for %s',
    (schemeCode, expectedName) => {
      const result = getScheme(schemeCode)
      expect(result).toBe(expectedName)
    }
  )
})
