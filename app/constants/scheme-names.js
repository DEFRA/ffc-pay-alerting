const {
  SFI,
  SFIP,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  MANUAL,
  ES,
  FC,
  IMPS
} = require('./schemes')

module.exports = {
  [SFI]: 'SFI',
  [SFIP]: 'SFI Pilot',
  [LUMP_SUMS]: 'Lump Sums',
  [VET_VISITS]: 'Vet Visits',
  [CS]: 'Countryside Stewardship',
  [BPS]: 'BPS',
  [FDMR]: 'FDMR',
  [MANUAL]: 'Manual Invoice',
  [ES]: 'Environmental Stewardship',
  [FC]: 'Forestry Commission',
  [IMPS]: 'IMPS'
}
