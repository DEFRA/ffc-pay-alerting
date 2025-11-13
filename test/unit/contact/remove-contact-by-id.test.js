const { removeContactById } = require('../../../app/contact')
const db = require('../../../app/data')

jest.mock('../../../app/data', () => ({
  contact: {
    update: jest.fn()
  }
}))

test('should call db.contact.update with correct arguments', async () => {
  const contactId = 123
  const removedBy = 'admin'

  const beforeCall = Date.now()
  await removeContactById(contactId, removedBy)
  const afterCall = Date.now()

  expect(db.contact.update).toHaveBeenCalledTimes(1)

  const updateArg = db.contact.update.mock.calls[0][0]
  const whereArg = db.contact.update.mock.calls[0][1]

  expect(whereArg).toEqual({ where: { contactId } })
  expect(updateArg.removedBy).toBe(removedBy)
  expect(typeof updateArg.removedAt).toBe('number')
  expect(updateArg.removedAt).toBeGreaterThanOrEqual(beforeCall)
  expect(updateArg.removedAt).toBeLessThanOrEqual(afterCall)
})
