const { getContactByEmail } = require('../../../app/contact')
const db = require('../../../app/data')

jest.mock('../../../app/data', () => ({
  contact: {
    findOne: jest.fn()
  }
}))

test('should call db.contact.findOne with correct query', async () => {
  const email = 'test@example.com'
  db.contact.findOne.mockResolvedValue(null)

  await getContactByEmail(email)

  expect(db.contact.findOne).toHaveBeenCalledWith({
    where: {
      removedAt: null,
      emailAddress: email
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

test('should return contact when found', async () => {
  const email = 'found@example.com'
  const contactData = {
    contactId: 1,
    emailAddress: email,
    batch_rejected: false
  }
  db.contact.findOne.mockResolvedValue(contactData)

  const result = await getContactByEmail(email)

  expect(result).toEqual(contactData)
})

test('should return null when no contact is found', async () => {
  const email = 'notfound@example.com'
  db.contact.findOne.mockResolvedValue(null)

  const result = await getContactByEmail(email)

  expect(result).toBeNull()
})
