const { getSchemeIdFromSourceSystem } = require('../../../app/alerting/get-scheme-id-from-source-system')
const db = require('../../../app/data')

jest.mock('../../../app/data', () => ({
  scheme: {
    findOne: jest.fn()
  }
}))

describe('getSchemeIdFromSourceSystem', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return 0 if sourceSystem is falsy', async () => {
    const result = await getSchemeIdFromSourceSystem(null)
    expect(result).toBe(0)

    const resultUndefined = await getSchemeIdFromSourceSystem(undefined)
    expect(resultUndefined).toBe(0)

    const resultEmptyString = await getSchemeIdFromSourceSystem('')
    expect(resultEmptyString).toBe(0)
  })

  test('should call db.scheme.findOne with correct parameters', async () => {
    db.scheme.findOne.mockResolvedValue(null)
    const sourceSystem = 'testSystem'

    await getSchemeIdFromSourceSystem(sourceSystem)

    expect(db.scheme.findOne).toHaveBeenCalledWith({
      attributes: ['schemeId'],
      where: { sourceSystem }
    })
  })

  test('should return schemeId if scheme is found', async () => {
    const schemeId = 123
    db.scheme.findOne.mockResolvedValue({ schemeId })

    const result = await getSchemeIdFromSourceSystem('existingSystem')

    expect(result).toBe(schemeId)
  })

  test('should return 0 if scheme is not found', async () => {
    db.scheme.findOne.mockResolvedValue(null)

    const result = await getSchemeIdFromSourceSystem('nonExistingSystem')

    expect(result).toBe(0)
  })

  test('should propagate errors thrown by db.scheme.findOne', async () => {
    const error = new Error('DB error')
    db.scheme.findOne.mockRejectedValue(error)

    await expect(getSchemeIdFromSourceSystem('anySystem')).rejects.toThrow('DB error')
  })
})
