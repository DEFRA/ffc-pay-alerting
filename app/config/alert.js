const Joi = require('joi')

const schema = Joi.object({
  notifyApiKey: Joi.string().required(),
  devTeamEmails: Joi.string().optional(),
  debtEnrichmentEmails: Joi.string().optional(),
  invalidBankDetailsEmails: Joi.string().optional(),
  coreSolutionsTeamEmails: Joi.string().optional(),
  esEmails: Joi.string().optional(),
  fcEmails: Joi.string().optional(),
  traderEmails: Joi.string().optional(),
  vetVisitsEmails: Joi.string().optional(),
  environment: Joi.string().default('local'),
  sendAlerts: Joi.boolean().default(true)
})

const config = {
  notifyApiKey: process.env.NOTIFY_API_KEY,
  devTeamEmails: process.env.DEV_TEAM_EMAILS,
  debtEnrichmentEmails: process.env.DEBT_ENRICHMENT_EMAILS,
  invalidBankDetailsEmails: process.env.INVALID_BANK_DETAILS_EMAILS,
  coreSolutionsTeamEmails: process.env.CORE_SOLUTIONS_TEAM_EMAILS,
  esEmails: process.env.ES_EMAILS,
  fcEmails: process.env.FC_EMAILS,
  traderEmails: process.env.TRADER_EMAILS,
  vetVisitsEmails: process.env.VET_VISITS_EMAILS,
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
