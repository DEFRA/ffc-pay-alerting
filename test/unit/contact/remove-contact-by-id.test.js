const { createKnexMock } = require('../../helpers/mock-knex')

const mockDb = createKnexMock(['contact'])

jest.mock('../../../app/database', () => ({
  client: mockDb.knex,
  transaction: mockDb.transaction,
  close: mockDb.close,
  ...mockDb.tables
}))

const { removeContactById } = require('../../../app/contact')

beforeEach(() => {
  jest.clearAllMocks()
  mockDb.builder.resolves()
})

test('should mark the contact as removed', async () => {
  const contactId = 123
  const removedBy = 'admin'

  const beforeCall = Date.now()
  await removeContactById(contactId, removedBy)
  const afterCall = Date.now()

  expect(mockDb.tables.contact).toHaveBeenCalledTimes(1)
  expect(mockDb.builder.where).toHaveBeenCalledWith({ contactId })
  expect(mockDb.builder.update).toHaveBeenCalledTimes(1)

  const updateArg = mockDb.builder.update.mock.calls[0][0]

  expect(updateArg.removedBy).toBe(removedBy)
  expect(updateArg.removedAt).toBeInstanceOf(Date)
  expect(updateArg.removedAt.getTime()).toBeGreaterThanOrEqual(beforeCall)
  expect(updateArg.removedAt.getTime()).toBeLessThanOrEqual(afterCall)
})

test('should propagate a database failure', async () => {
  mockDb.builder.rejects(new Error('DB error'))

  await expect(removeContactById(123, 'admin')).rejects.toThrow('DB error')
})
