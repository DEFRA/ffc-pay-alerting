const Joi = require('joi')

module.exports = Joi.object({
  contactId: Joi.number().integer().required(),
  removedBy: Joi.string().required()
})
