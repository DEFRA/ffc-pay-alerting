const TABLES = require('../../../app/constants/tables')
const { PRIMARY_KEYS, COLUMNS, pickColumns } = require('../../../app/constants/columns')

describe('pickColumns', () => {
  test('keeps properties that are columns on the table', () => {
    const record = { emailAddress: 1, modifiedBy: 'value' }

    expect(pickColumns(record, TABLES.contact)).toEqual(record)
  })

  test('drops properties that are not columns on the table', () => {
    const result = pickColumns({ emailAddress: 1, notAColumn: 'value' }, TABLES.contact)

    expect(result).toEqual({ emailAddress: 1 })
  })

  test('drops the primary key', () => {
    const result = pickColumns({ contactId: 1, emailAddress: 1 }, TABLES.contact)

    expect(result).toEqual({ emailAddress: 1 })
  })

  test('returns an empty object when given no properties', () => {
    expect(pickColumns({}, TABLES.contact)).toEqual({})
  })
})

describe('PRIMARY_KEYS', () => {
  test('each primary key is a column on its table', () => {
    for (const [table, primaryKey] of Object.entries(PRIMARY_KEYS)) {
      expect(COLUMNS[table]).toContain(primaryKey)
    }
  })
})
