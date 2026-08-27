const Joi = require('joi')
const boom = require('@hapi/boom')
const { getSchemeName } = require('ffc-pay-schemes')
const removeSchema = require('./schemas/remove-contact')
const { removeContactById, updateContact, getContactsByScheme, getAlertTypes, getAlertDescriptions, getContactById, getContactByEmail } = require('../../contact')
const { OK } = require('../../constants/ok')
const { OK: OK_STATUS } = require('../../constants/status')
const { UNKNOWN } = require('../../constants/unknown')

module.exports = [{
  method: 'GET',
  path: '/contact-list/by-scheme/{schemeId}',
  options: {
    validate: {
      params: Joi.object({
        schemeId: Joi.number().integer().required()
      }),
      failAction: (_request, _h, error) => {
        throw boom.badRequest(error.details[0].message)
      }
    },
    handler: async (request, h) => {
      const { schemeId } = request.params
      const contacts = await getContactsByScheme(schemeId)
      const schemeName = getSchemeName(schemeId) ?? UNKNOWN
      return h.response({
        contacts,
        schemeName
      })
    }
  }
}, {
  method: 'GET',
  path: '/alert-types',
  options: {
    handler: async (_request, h) => {
      const alertTypes = getAlertTypes()
      return h.response({
        alertTypes
      })
    }
  }
}, {
  method: 'GET',
  path: '/alert-descriptions',
  options: {
    handler: async (_request, h) => {
      const alertDescriptions = getAlertDescriptions()
      return h.response({
        alertDescriptions
      })
    }
  }
}, {
  method: 'GET',
  path: '/contact/{contactIdentifier}',
  options: {
    validate: {
      params: Joi.object({
        contactIdentifier: Joi.alternatives().try(
          Joi.number().integer().required(),
          Joi.string().email().required()
        )
      }),
      failAction: (_request, _h, error) => {
        throw boom.badRequest(error.details[0].message)
      }
    },
    handler: async (request, h) => {
      const { contactIdentifier } = request.params

      try {
        const contact = typeof contactIdentifier === 'string'
          ? await getContactByEmail(contactIdentifier)
          : await getContactById(contactIdentifier)

        if (!contact) {
          throw boom.notFound(`Contact with identifier ${contactIdentifier} not found`)
        }

        return h.response({ contact }).code(OK_STATUS)
      } catch (err) {
        if (boom.isBoom(err)) {
          throw err
        }
        console.error('Failed to fetch contact:', err)
        throw boom.internal('Internal Server Error')
      }
    }
  }
}, {
  method: 'GET',
  path: '/contact/email/{emailAddress}',
  options: {
    validate: {
      params: Joi.object({
        emailAddress: Joi.string().email().required()
      }),
      failAction: (_request, _h, error) => {
        throw boom.badRequest(error.details[0].message)
      }
    },
    handler: async (request, h) => {
      const { emailAddress } = request.params

      try {
        const contact = await getContactByEmail(emailAddress)

        return h.response({ contact }).code(OK_STATUS)
      } catch (err) {
        if (boom.isBoom(err)) {
          throw err
        }
        console.error('Failed to fetch contact:', err)
        throw boom.internal('Internal Server Error')
      }
    }
  }
},
{
  method: 'POST',
  path: '/update-contact',
  options: {
    handler: async (request, h) => {
      await updateContact(request.payload)
      return h.response('ok').code(OK_STATUS)
    }
  }
},
{
  method: 'POST',
  path: '/remove-contact',
  options: {
    validate: {
      payload: removeSchema,
      failAction: (_request, _h, error) => {
        return boom.badRequest(error)
      }
    },
    handler: async (request, h) => {
      await removeContactById(request.payload.contactId, request.payload.removedBy)
      return h.response(OK).code(OK_STATUS)
    }
  }
}]
