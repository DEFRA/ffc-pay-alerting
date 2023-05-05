const {
  SFI,
  SFIP,
  LUMP_SUMS,
  VET_VISITS,
  CS,
  BPS,
  FDMR,
  MANUAL
} = require('./schemes')

module.exports = {
  [SFI]: 'SFI',
  [SFIP]: 'SFI Pilot',
  [LUMP_SUMS]: 'Lump Sums',
  [VET_VISITS]: 'Vet Visits',
  [CS]: 'Countryside Stewardship',
  [BPS]: 'BPS',
  [FDMR]: 'FDMR',
  [MANUAL]: 'Manual Invoice'
}
