const Joi = require('joi')

const schema = Joi.object({
  notifyApiKey: Joi.string().required(),
  notifyEmailTemplateKey: Joi.string().required(),
  devTeamEmails: Joi.string().optional(),
  debtEnrichmentEmails: Joi.string().optional(),
  invalidBankDetailsEmails: Joi.string().optional(),
  coreSolutionsTeamEmails: Joi.string().optional()
})

const config = {
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyEmailTemplateKey: process.env.NOTIFY_EMAIL_TEMPLATE_KEY,
  devTeamEmails: process.env.DEV_TEAM_EMAILS,
  debtEnrichmentEmails: process.env.DEBT_ENRICHMENT_EMAILS,
  invalidBankDetailsEmails: process.env.INVALID_BANK_DETAILS_EMAILS,
  coreSolutionsTeamEmails: process.env.CORE_SOLUTIONS_TEAM_EMAILS
}

const result = schema.validate(config, {
  abortEarly: false
})

if (result.error) {
  throw new Error(`The alert config is invalid. ${result.error.message}`)
}

module.exports = result.value
