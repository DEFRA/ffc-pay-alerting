const Joi = require('joi')
const boom = require('@hapi/boom')
const removeSchema = require('./schemas/remove-contact')
const { removeContactById, updateContact, getContacts, getAlertTypes, getAlertDescriptions, getContactById, getContactByEmail } = require('../../contact')

module.exports = [{
  method: 'GET',
  path: '/contact-list',
  options: {
    handler: async (request, h) => {
      const contacts = await getContacts()
      return h.response({
        contacts
      })
    }
  }
}, {
  method: 'GET',
  path: '/alert-types',
  options: {
    handler: async (request, h) => {
      const alertTypes = await getAlertTypes()
      return h.response({
        alertTypes
      })
    }
  }
}, {
  method: 'GET',
  path: '/alert-descriptions',
  options: {
    handler: async (request, h) => {
      const alertDescriptions = await getAlertDescriptions()
      return h.response({
        alertDescriptions
      })
    }
  }
}, {
  method: 'GET',
  path: '/contact/contactId/{contactId}',
  options: {
    validate: {
      params: Joi.object({
        contactId: Joi.number().integer().required()
      }),
      failAction: (request, h, error) => {
        throw boom.badRequest(error.details[0].message)
      }
    },
    handler: async (request, h) => {
      const { contactId } = request.params

      try {
        const contact = await getContactById(contactId)

        if (!contact) {
          throw boom.notFound(`Contact with ID ${contactId} not found`)
        }

        return h.response({ contact }).code(200)
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
      failAction: (request, h, error) => {
        throw boom.badRequest(error.details[0].message)
      }
    },
    handler: async (request, h) => {
      const { emailAddress } = request.params

      try {
        const contact = await getContactByEmail(emailAddress)

        return h.response({ contact }).code(200)
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
      console.log(request)
      await updateContact(request.payload)
      return h.response('ok').code(200)
    }
  }
},
{
  method: 'POST',
  path: '/remove-contact',
  options: {
    validate: {
      payload: removeSchema,
      failAction: (request, h, error) => {
        return boom.badRequest(error)
      }
    },
    handler: async (request, h) => {
      await removeContactById(request.payload.contactId, request.payload.removedBy)
      return h.response('ok').code(200)
    }
  }
}]
