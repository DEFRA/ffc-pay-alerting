const { getContactsByScheme } = require('../../../app/contact/get-contacts-by-scheme')
const db = require('../../../app/data')

jest.mock('../../../app/data', () => ({
  contact: {
    findAll: jest.fn()
  },
  Sequelize: {
    Op: {
      or: 'or',
      contains: 'contains'
    }
  }
}))

describe('getContactsByScheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call db.contact.findAll with basic query when no schemeId provided', async () => {
    db.contact.findAll.mockResolvedValue([])

    await getContactsByScheme()

    expect(db.contact.findAll).toHaveBeenCalledWith({
      where: { removedAt: null },
      raw: true,
      attributes: expect.any(Array)
    })

    const calledAttrs = db.contact.findAll.mock.calls[0][0].attributes
    expect(calledAttrs).toContain('contactId')
    expect(calledAttrs).toContain('emailAddress')
  })

  test('should include Op.or when valid numeric schemeId provided', async () => {
    db.contact.findAll.mockResolvedValue([])

    await getContactsByScheme('5')

    const calledWhere = db.contact.findAll.mock.calls[0][0].where
    expect(calledWhere.removedAt).toBeNull()
    expect(Object.prototype.hasOwnProperty.call(calledWhere, db.Sequelize.Op.or)).toBe(true)

    const orArray = calledWhere[db.Sequelize.Op.or]
    expect(Array.isArray(orArray)).toBe(true)
    expect(orArray.length).toBeGreaterThan(0)
    orArray.forEach((entry) => {
      const val = Object.values(entry)[0]
      expect(Object.prototype.hasOwnProperty.call(val, db.Sequelize.Op.contains)).toBe(true)
      expect(val[db.Sequelize.Op.contains]).toEqual([5])
    })
  })

  test('should not include Op.or when schemeId is non-numeric', async () => {
    db.contact.findAll.mockResolvedValue([])

    await getContactsByScheme('not-a-number')

    const calledWhere = db.contact.findAll.mock.calls[0][0].where
    expect(calledWhere.removedAt).toBeNull()
    expect(Object.prototype.hasOwnProperty.call(calledWhere, db.Sequelize.Op.or)).toBe(false)
  })

  test('should not include Op.or when schemeId is null or undefined', async () => {
    db.contact.findAll.mockResolvedValue([])

    await getContactsByScheme(null)
    let calledWhere = db.contact.findAll.mock.calls[0][0].where
    expect(Object.prototype.hasOwnProperty.call(calledWhere, db.Sequelize.Op.or)).toBe(false)

    jest.clearAllMocks()
    db.contact.findAll.mockResolvedValue([])
    await getContactsByScheme(undefined)
    calledWhere = db.contact.findAll.mock.calls[0][0].where
    expect(Object.prototype.hasOwnProperty.call(calledWhere, db.Sequelize.Op.or)).toBe(false)
  })
})
