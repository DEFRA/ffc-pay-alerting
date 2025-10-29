const { getContacts } = require('../../../app/contact')
const db = require('../../../app/data')

jest.mock('../../../app/data', () => ({
  contact: {
    findAll: jest.fn()
  },
  scheme: {
    findOne: jest.fn()
  }
}))

test('should call db.contact.findAll with correct query', async () => {
  db.contact.findAll.mockResolvedValue([])

  await getContacts()

  expect(db.contact.findAll).toHaveBeenCalledWith({
    where: {
      removedAt: null
    },
    raw: true,
    attributes: [
      'contactId',
      'emailAddress',
      'batch_rejected',
      'batch_quarantined',
      'payment_rejected',
      'payment_dax_rejected',
      'payment_invalid_bank',
      'payment_processing_failed',
      'payment_settlement_unsettled',
      'payment_settlement_unmatched',
      'response_rejected',
      'payment_request_blocked',
      'payment_dax_unavailable',
      'receiver_connection_failed',
      'demographics_processing_failed',
      'demographics_update_failed',
      'event_save_alert',
      'table_create_alert'
    ]
  })
})

test('should return transformed contacts with scheme names from cache and db', async () => {
  const contacts = [
    {
      contactId: 1,
      emailAddress: 'a@example.com',
      batch_rejected: false,
      payment_rejected: [10, 20, 'nonNumber']
    },
    {
      contactId: 2,
      emailAddress: 'b@example.com',
      batch_rejected: true,
      payment_rejected: [20]
    }
  ]
  db.contact.findAll.mockResolvedValue(contacts)

  const schemeCache = new Map()
  schemeCache.set(10, 'SchemeTen')

  db.scheme.findOne.mockImplementation(({ where }) => {
    if (where.schemeId === 20) {
      return Promise.resolve({ name: 'SchemeTwenty' })
    }
    if (where.schemeId === 10) {
      return Promise.resolve({ name: 'SchemeTen' })
    }
    return Promise.resolve(null)
  })

  const result = await getContacts()

  expect(result).toEqual([
    {
      contactId: 1,
      emailAddress: 'a@example.com',
      batch_rejected: false,
      payment_rejected: ['SchemeTen', 'SchemeTwenty', 'nonNumber']
    },
    {
      contactId: 2,
      emailAddress: 'b@example.com',
      batch_rejected: true,
      payment_rejected: ['SchemeTwenty']
    }
  ])
})

test('should handle contacts without array fields correctly', async () => {
  const contacts = [
    {
      contactId: 3,
      emailAddress: 'noarray@example.com',
      batch_rejected: false
    }
  ]
  db.contact.findAll.mockResolvedValue(contacts)

  const result = await getContacts()

  expect(result).toEqual([
    {
      contactId: 3,
      emailAddress: 'noarray@example.com',
      batch_rejected: false
    }
  ])
})
