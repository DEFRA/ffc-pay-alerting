const boom = require('@hapi/boom')

jest.mock('ffc-pay-schemes', () => {
  const actual = jest.requireActual('ffc-pay-schemes')

  return {
    ...actual,
    getSchemeNameFromSchemeId: jest.fn()
  }
})

const { getSchemeNameFromSchemeId: mockgetSchemeNameFromSchemeId } = require('ffc-pay-schemes')

const removeSchema = require('../../../../app/server/routes/schemas/remove-contact')
const routes = require('../../../../app/server/routes/contact')

const {
  removeContactById,
  updateContact,
  getContactsByScheme,
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
  getContactsByScheme: jest.fn(),
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

  describe('GET /contact-list/by-scheme/{schemeId}', () => {
    const route = routes.find(r => r.path === '/contact-list/by-scheme/{schemeId}')

    test('should validate schemeId as a required integer', () => {
      const schema = route.options.validate.params

      expect(schema.validate({ schemeId: 5 }).error).toBeUndefined()
      expect(schema.validate({ schemeId: 1.5 }).error).toBeDefined()
      expect(schema.validate({}).error).toBeDefined()
    })

    test('should respond with contacts and scheme name', async () => {
      const fakeContacts = [{ id: 1 }, { id: 2 }]
      getContactsByScheme.mockResolvedValue(fakeContacts)
      mockgetSchemeNameFromSchemeId.mockReturnValue('Countryside Stewardship')

      const request = { params: { schemeId: 5 } }
      await route.options.handler(request, hMock)

      expect(getContactsByScheme).toHaveBeenCalledWith(5)
      expect(mockgetSchemeNameFromSchemeId).toHaveBeenCalledWith(5)
      expect(hMock.response).toHaveBeenCalledWith({
        contacts: fakeContacts,
        schemeName: 'Countryside Stewardship'
      })
    })

    test('should throw badRequest on validation failure', () => {
      const fakeError = { details: [{ message: 'fail message' }] }

      expect(() => route.options.validate.failAction({}, {}, fakeError))
        .toThrow(boom.Boom)
    })
  })

  describe('GET /alert-types', () => {
    const route = routes.find(r => r.path === '/alert-types')

    test('should respond with alert types', async () => {
      const fakeAlertTypes = ['type1', 'type2']
      getAlertTypes.mockReturnValue(fakeAlertTypes)

      await route.options.handler({}, hMock)

      expect(getAlertTypes).toHaveBeenCalledTimes(1)
      expect(hMock.response).toHaveBeenCalledWith({
        alertTypes: fakeAlertTypes
      })
    })
  })

  describe('GET /alert-descriptions', () => {
    const route = routes.find(r => r.path === '/alert-descriptions')

    test('should respond with alert descriptions', async () => {
      const fakeAlertDescriptions = ['desc1', 'desc2']
      getAlertDescriptions.mockReturnValue(fakeAlertDescriptions)

      await route.options.handler({}, hMock)

      expect(getAlertDescriptions).toHaveBeenCalledTimes(1)
      expect(hMock.response).toHaveBeenCalledWith({
        alertDescriptions: fakeAlertDescriptions
      })
    })
  })

  describe('GET /contact/{contactIdentifier}', () => {
    const route = routes.find(r => r.path === '/contact/{contactIdentifier}')

    test('should validate params with Joi alternatives', () => {
      const schema = route.options.validate.params

      expect(schema.validate({ contactIdentifier: 123 }).error).toBeUndefined()
      expect(schema.validate({ contactIdentifier: 'test@example.com' }).error).toBeUndefined()
      expect(schema.validate({ contactIdentifier: 'not-a-valid-email' }).error).toBeDefined()
    })

    test('should throw badRequest on validation failure', () => {
      const fakeError = { details: [{ message: 'fail message' }] }
      expect(() => route.options.validate.failAction({}, {}, fakeError))
        .toThrow(boom.Boom)
    })

    test('should fetch contact by id and respond with 200 when found', async () => {
      const fakeContact = { contactId: 1, name: 'John' }
      getContactById.mockResolvedValue(fakeContact)

      const request = { params: { contactIdentifier: 1 } }
      await route.options.handler(request, hMock)

      expect(getContactById).toHaveBeenCalledWith(1)
      expect(hMock.response).toHaveBeenCalledWith({ contact: fakeContact })
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })

    test('should fetch contact by email and respond with 200 when found', async () => {
      const fakeContact = { contactId: 1, emailAddress: 'test@example.com' }
      getContactByEmail.mockResolvedValue(fakeContact)

      const request = { params: { contactIdentifier: 'test@example.com' } }
      await route.options.handler(request, hMock)

      expect(getContactByEmail).toHaveBeenCalledWith('test@example.com')
      expect(hMock.response).toHaveBeenCalledWith({ contact: fakeContact })
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })

    test('should throw notFound when contact is not found', async () => {
      getContactById.mockResolvedValue(null)
      const request = { params: { contactIdentifier: 999 } }

      await expect(route.options.handler(request, hMock))
        .rejects.toThrow('Contact with identifier 999 not found')
    })

    test('should propagate boom errors', async () => {
      const boomError = boom.badRequest('Bad request')
      getContactById.mockRejectedValue(boomError)

      const request = { params: { contactIdentifier: 1 } }

      await expect(route.options.handler(request, hMock))
        .rejects.toBe(boomError)
    })

    test('should return an internal error for non-boom errors', async () => {
      getContactById.mockRejectedValue(new Error('Database failure'))

      const request = { params: { contactIdentifier: 1 } }

      await expect(route.options.handler(request, hMock))
        .rejects.toMatchObject({
          output: { statusCode: 500 }
        })
    })
  })

  describe('GET /contact/email/{emailAddress}', () => {
    const route = routes.find(r => r.path === '/contact/email/{emailAddress}')

    test('should validate params with Joi', () => {
      const schema = route.options.validate.params

      expect(schema.validate({ emailAddress: 'test@example.com' }).error).toBeUndefined()
      expect(schema.validate({ emailAddress: 'invalid-email' }).error).toBeDefined()
    })

    test('should throw badRequest on validation failure', () => {
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

      await expect(route.options.handler(request, hMock))
        .rejects.toBe(boomError)
    })

    test('should return an internal error for non-boom errors', async () => {
      getContactByEmail.mockRejectedValue(new Error('Database failure'))

      const request = { params: { emailAddress: 'test@example.com' } }

      await expect(route.options.handler(request, hMock))
        .rejects.toMatchObject({
          output: { statusCode: 500 }
        })
    })
  })

  describe('POST /update-contact', () => {
    const route = routes.find(r => r.path === '/update-contact')

    test('should call updateContact and respond with ok', async () => {
      const payload = { some: 'data' }
      updateContact.mockResolvedValue()

      await route.options.handler({ payload }, hMock)

      expect(updateContact).toHaveBeenCalledWith(payload)
      expect(hMock.response).toHaveBeenCalledWith('ok')
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })
  })

  describe('POST /remove-contact', () => {
    const route = routes.find(r => r.path === '/remove-contact')

    test('should validate a valid payload', () => {
      const validPayload = { contactId: 123, removedBy: 'admin' }

      expect(removeSchema.validate(validPayload).error).toBeUndefined()
    })

    test('should reject an invalid payload', () => {
      const invalidPayload = { contactId: 123 }

      expect(removeSchema.validate(invalidPayload).error).toBeDefined()
    })

    test('should call removeContactById and respond with OK', async () => {
      const payload = { contactId: 1, removedBy: 'admin' }
      removeContactById.mockResolvedValue()

      await route.options.handler({ payload }, hMock)

      expect(removeContactById).toHaveBeenCalledWith(
        payload.contactId,
        payload.removedBy
      )
      expect(hMock.response).toHaveBeenCalledWith(ok.OK)
      expect(hMock.code).toHaveBeenCalledWith(OK_STATUS)
    })

    test('should return badRequest on validation failure', () => {
      const fakeError = new Error('fail')
      const result = route.options.validate.failAction({}, {}, fakeError)
      expect(result.isBoom).toBe(true)
      expect(result.output.statusCode).toBe(400)
    })
  })
})
