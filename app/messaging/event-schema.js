const Joi = require('joi')
module.exports = Joi.object({
  specversion: Joi.string().required(),
  type: Joi.string().regex(`/^.+\.warning\..+$/`).required(),
  source: Joi.string().required(),
  id: Joi.string().uuid().required(),
  time: Joi.date().required(),
  subject: Joi.string().default('None'),
  datacontenttype: Joi.string().default('None'),
  data: Joi.object({
    message: Joi.string().required()
  })
}).required()
