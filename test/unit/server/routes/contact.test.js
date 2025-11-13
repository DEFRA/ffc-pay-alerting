const boom = require('@hapi/boom')
const removeSchema = require('../../../../app/server/routes/schemas/remove-contact')
const routes = require('../../../../app/server/routes/contact')
const {
  removeContactById,
  updateContact,
  getContacts,
  getAlertTypes,
  getAlertDescriptions,
  getContactById,
  getContactByEmail
} = require('../../../../app/contact')
const { OK: OK_STATUS } = require('../../../../app/constants/status')
const ok = require('../../../../app/constants/ok')

jest.mock('../../../../app/contact', () => ({
  removeContactById: jest.fn(),
  updateContact: jest.fn(),
  getContacts: jest.fn(),
  getAlertTypes: jest.fn(),
  getAlertDescriptions: jest.fn(),
  getContactById: jest.fn(),
  getContactByEmail: jest.fn()
}))

describe('Contact Routes', () => {
  let hMock

  beforeEach(() => {
    jest.clearAllMocks()
    hMock = {
      response: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis()
    }
  })

  describe('GET /contact-list', () => {
    const route = routes.find(r => r.path === '/contact-list')

    test('should respond with contacts', async () => {
      const fakeContacts = [{ id: 1 }, { id: 2 }]
      getContacts.mockResolvedValue(fakeContacts)

      await route.options.handler({}, hMock)

      expect(getContacts).toHaveBeenCalled()
      expect(hMock.response).toHaveBeenCalledWith({ contacts: fakeContacts })
    })
  })

  describe('GET /alert-types', () => {
    const route = routes.find(r => r.path === '/alert-types')

    test('should respond with alert types', async () => {
      const fakeAlertTypes = ['type1', 'type2']
      getAlertTypes.mockReturnValue(fakeAlertTypes)

      await route.options.handler({}, hMock)

      expect(getAlertTypes).toHaveBeenCalled()
      expect(hMock.response).toHaveBeenCalledWith({ alertTypes: fakeAlertTypes })
    })
  })

  describe('GET /alert-descriptions', () => {
    const route = routes.find(r => r.path === '/alert-descriptions')

    test('should respond with alert descriptions', async () => {
      const fakeAlertDescriptions = ['desc1', 'desc2']
      getAlertDescriptions.mockReturnValue(fakeAlertDescriptions)

      await route.options.handler({}, hMock)

      expect(getAlertDescriptions).toHaveBeenCalled()
      expect(hMock.response).toHaveBeenCalledWith({ alertDescriptions: fakeAlertDescriptions })
    })
  })

  describe('GET /contact/contactId/{contactId}', () => {
    const route = routes.find(r => r.path === '/contact/contactId/{contactId}')

    test('should validate params with Joi', () => {
      const schema = route.options.validate.params
      expect(() => schema.validate({ contactId: 123 })).not.toThrow()
      const { error } = schema.validate({ contactId: 'not-a-number' })
      expect(error).toBeDefined()
    })

    test('should throw badRequest on validation fail', () => {
      const fakeError = { details: [{ message: 'fail message' }] }
      expect(() => route.options.validate.failAction({}, {}, fakeError))
        .toThrow(boom.Boom)
    })

    test('should fetch contact and respond with 200 when found', async () => {
      const fakeContact = { contactId: 1, name: 'John' }
      getContactById.mockResolvedValue(fakeContact)

      const request = { params: { contactId: 1 } }
      await route.options.handler(request, hMock)

      expect(getContactById).toHaveBeenCalledWith(1)
      expect(hMock.response).toHaveBeenCalledWith({ contact: fakeContact })
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })

    test('should throw notFound error when contact not found', async () => {
      getContactById.mockResolvedValue(null)
      const request = { params: { contactId: 999 } }

      await expect(route.options.handler(request, hMock)).rejects.toThrow(boom.notFound('Contact with ID 999 not found').output.payload.message)
    })

    test('should propagate boom errors', async () => {
      const boomError = boom.badRequest('Bad request')
      getContactById.mockRejectedValue(boomError)

      const request = { params: { contactId: 1 } }
      await expect(route.options.handler(request, hMock)).rejects.toBe(boomError)
    })
  })

  describe('GET /contact/email/{emailAddress}', () => {
    const route = routes.find(r => r.path === '/contact/email/{emailAddress}')

    test('should validate params with Joi', () => {
      const schema = route.options.validate.params
      expect(() => schema.validate({ emailAddress: 'test@example.com' })).not.toThrow()
      const { error } = schema.validate({ emailAddress: 'invalid-email' })
      expect(error).toBeDefined()
    })

    test('should throw badRequest on validation fail', () => {
      const fakeError = { details: [{ message: 'fail message' }] }
      expect(() => route.options.validate.failAction({}, {}, fakeError))
        .toThrow(boom.Boom)
    })

    test('should fetch contact by email and respond with 200', async () => {
      const fakeContact = { contactId: 1, emailAddress: 'test@example.com' }
      getContactByEmail.mockResolvedValue(fakeContact)

      const request = { params: { emailAddress: 'test@example.com' } }
      await route.options.handler(request, hMock)

      expect(getContactByEmail).toHaveBeenCalledWith('test@example.com')
      expect(hMock.response).toHaveBeenCalledWith({ contact: fakeContact })
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })

    test('should propagate boom errors', async () => {
      const boomError = boom.badRequest('Bad request')
      getContactByEmail.mockRejectedValue(boomError)

      const request = { params: { emailAddress: 'test@example.com' } }
      await expect(route.options.handler(request, hMock)).rejects.toBe(boomError)
    })
  })

  describe('POST /update-contact', () => {
    const route = routes.find(r => r.path === '/update-contact')

    test('should call updateContact and respond with "ok"', async () => {
      updateContact.mockResolvedValue()
      const payload = { some: 'data' }
      const request = { payload }

      await route.options.handler(request, hMock)

      expect(updateContact).toHaveBeenCalledWith(payload)
      expect(hMock.response).toHaveBeenCalledWith('ok')
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })
  })

  describe('POST /remove-contact', () => {
    const route = routes.find(r => r.path === '/remove-contact')

    test('should validate payload with removeSchema', () => {
      const validPayload = { contactId: 123, removedBy: 'admin' }
      const { error } = removeSchema.validate(validPayload)
      expect(error).toBeUndefined()

      const invalidPayload = { contactId: 123 }
      const { error: error2 } = removeSchema.validate(invalidPayload)
      expect(error2).toBeDefined()
    })

    test('should call removeContactById and respond with OK constant', async () => {
      removeContactById.mockResolvedValue()
      const payload = { contactId: 1, removedBy: 'admin' }
      const request = { payload }

      await route.options.handler(request, hMock)

      expect(removeContactById).toHaveBeenCalledWith(payload.contactId, payload.removedBy)
      expect(hMock.response).toHaveBeenCalledWith(ok.OK)
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })

    test('should throw badRequest on validation fail', () => {
      const fakeError = new Error('fail')
      const result = route.options.validate.failAction({}, {}, fakeError)
      expect(result.isBoom).toBe(true)
      expect(result.output.statusCode).toBe(400)
    })
  })
})
