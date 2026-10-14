const { getSchemes } = require('ffc-pay-schemes')
const db = require('../../../app/database')
const { truncate } = require('../../helpers/truncate')

const { updateSchemesDatabase } = require('../../../app/update-schemes-database')

describe('update schemes database', () => {
  let consoleLogSpy

  beforeEach(async () => {
    await truncate()
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  afterAll(async () => {
    await truncate()
    await db.close()
  })

  test('creates every supported scheme', async () => {
    await updateSchemesDatabase()

    const saved = await db.scheme().orderBy('schemeId')
    const expected = getSchemes()
      .map(({ schemeId, schemeName, sourceSystem }) => ({ schemeId, name: schemeName, sourceSystem }))
      .sort((a, b) => a.schemeId - b.schemeId)

    expect(saved).toEqual(expected)
    for (const { schemeName } of getSchemes()) {
      expect(consoleLogSpy).toHaveBeenCalledWith(`${schemeName} created`)
    }
  })

  test('updates an existing scheme in place', async () => {
    const [{ schemeId, schemeName, sourceSystem }] = getSchemes()
    await db.scheme().insert({ schemeId, name: 'Old name', sourceSystem: 'OLD' })

    await updateSchemesDatabase()

    const saved = await db.scheme().where({ schemeId })
    expect(saved).toEqual([{ schemeId, name: schemeName, sourceSystem }])
    expect(consoleLogSpy).toHaveBeenCalledWith(`${schemeName} updated`)
  })
})
