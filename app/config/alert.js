const Joi = require('joi')

const schema = Joi.object({
  notifyApiKey: Joi.string().required(),
  devTeamEmails: Joi.string().default(''),
  pdsTeamEmails: Joi.string().default(''),
  cshtEmails: Joi.string().default(''),
  environment: Joi.string().default('local'),
  sendAlerts: Joi.boolean().default(true)
})

const config = {
  notifyApiKey: process.env.NOTIFY_API_KEY,
  devTeamEmails: process.env.DEV_TEAM_EMAILS,
  pdsTeamEmails: process.env.PDS_TEAM_EMAILS,
  cshtEmails: process.env.CSHT_EMAILS,
  environment: process.env.FFC_ENVIRONMENT,
  sendAlerts: process.env.SEND_ALERTS
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The alert config is invalid. ${result.error.message}`)
}

module.exports = result.value
