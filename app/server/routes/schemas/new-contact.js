const Joi = require('joi')

module.exports = Joi.object({
  emailAddress: Joi.string().email().required(),
  addedBy: Joi.string().required(),
  BATCH_REJECTED: Joi.array().items(Joi.string()),
  BATCH_QUARANTINED: Joi.array().items(Joi.string()),
  PAYMENT_REJECTED: Joi.array().items(Joi.string()),
  PAYMENT_DAX_REJECTED: Joi.array().items(Joi.string()),
  PAYMENT_INVALID_BANK: Joi.array().items(Joi.string()),
  PAYMENT_PROCESSING_FAILED: Joi.array().items(Joi.string()),
  PAYMENT_SETTLEMENT_UNSETTLED: Joi.array().items(Joi.string()),
  PAYMENT_SETTLEMENT_UNMATCHED: Joi.array().items(Joi.string()),
  RESPONSE_REJECTED: Joi.array().items(Joi.string()),
  PAYMENT_REQUEST_BLOCKED: Joi.array().items(Joi.string()),
  PAYMENT_DAX_UNAVAILABLE: Joi.array().items(Joi.string()),
  RECEIVER_CONNECTION_FAILED: Joi.array().items(Joi.string()),
  DEMOGRAPHICS_PROCESSING_FAILED: Joi.array().items(Joi.string()),
  DEMOGRAPHICS_UPDATE_FAILED: Joi.array().items(Joi.string()),
  EVENT_SAVE_ALERT: Joi.array().items(Joi.string()),
  TABLE_CREATE_ALERT: Joi.array().items(Joi.string())
})
