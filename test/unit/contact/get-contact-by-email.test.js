jest.mock('sequelize', () => ({
  ...jest.requireActual('sequelize'),
  fn: jest.fn((functionName, column) => ({ functionName, column })),
  col: jest.fn(columnName => ({ columnName })),
  where: jest.fn((left, right) => ({ left, right }))
}))

jest.mock('../../../app/data', () => ({
  contact: {
    findOne: jest.fn()
  },
  Sequelize: {
    Op: {
      and: Symbol.for('sequelize.and')
    }
  }
}))

const { fn, col, where } = require('sequelize')
const { getContactByEmail } = require('../../../app/contact')
const db = require('../../../app/data')

const attributes = [
  'contactId',
  'emailAddress',
  'batch_rejected',
  'batch_quarantined',
  'duplicate_payment',
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
  'table_create_alert',
  'responses_processing_failed',
  'customer_update_processing_failed',
  'tracking_update_failure'
]

describe('getContactByEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call db.contact.findOne with a case-insensitive email query', async () => {
    const email = 'test@example.com'
    db.contact.findOne.mockResolvedValue(null)

    await getContactByEmail(email)

    expect(col).toHaveBeenCalledWith('emailAddress')
    expect(fn).toHaveBeenCalledWith('LOWER', { columnName: 'emailAddress' })
    expect(where).toHaveBeenCalledWith(
      {
        functionName: 'LOWER',
        column: { columnName: 'emailAddress' }
      },
      email
    )

    expect(db.contact.findOne).toHaveBeenCalledWith({
      where: {
        removedAt: null,
        [db.Sequelize.Op.and]: [
          {
            left: {
              functionName: 'LOWER',
              column: { columnName: 'emailAddress' }
            },
            right: email
          }
        ]
      },
      raw: true,
      attributes
    })
  })

  test('should trim and convert the email address to lowercase before querying', async () => {
    db.contact.findOne.mockResolvedValue(null)

    await getContactByEmail('  Test.User@Example.COM  ')

    expect(where).toHaveBeenCalledWith(
      expect.any(Object),
      'test.user@example.com'
    )
  })

  test('should return contact when found', async () => {
    const contactData = {
      contactId: 1,
      emailAddress: 'found@example.com',
      batch_rejected: false
    }
    db.contact.findOne.mockResolvedValue(contactData)

    const result = await getContactByEmail('FOUND@EXAMPLE.COM')

    expect(result).toEqual(contactData)
  })

  test('should return null when no contact is found', async () => {
    db.contact.findOne.mockResolvedValue(null)

    const result = await getContactByEmail('notfound@example.com')

    expect(result).toBeNull()
  })
})
