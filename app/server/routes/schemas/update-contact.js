const Joi = require('joi')

module.exports = Joi.object({
  emailAddress: Joi.string().email().required(),
  modifiedBy: Joi.string().required()
}).unknown(true)
