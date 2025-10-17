const Joi = require('joi')
const boom = require('@hapi/boom')
const { schema } = require('./schemas/new-contact')
const { removeContactById, addContact, getContacts } = require('../../contact')

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
},
{
  method: 'POST',
  path: '/add-contact',
  options: {
    validate: {
      payload: schema,
      failAction: (request, h, error) => {
        return boom.badRequest(error)
      }
    },
    handler: async (request, h) => {
      await addContact(request.payload)
      return h.response('ok').code(200)
    }
  }
},
{
  method: 'POST',
  path: '/closure/remove',
  options: {
    validate: {
      payload: Joi.object({
        contactId: Joi.number().required(),
        removedBy: Joi.string().required()
      }),
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
