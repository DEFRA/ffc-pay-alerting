module.exports = {
  BATCH_REJECTED: [
    'All payments within a batch file were rejected for a given reason.',
    'Typically this means a batch files received is not in the format anticipated, for instance there is no header line.',
    'Scheme Owners are expected to review the file and resubmit.'
  ],
  BATCH_QUARANTINED: [
    'A batch file has been quarantined due to a processing issue.',
    'This suggests there is an issue with the data, for instance the batch file is telling us there should be two payments in the file, but there are only details of one.',
    'Scheme Owners are expected to review the file and resubmit.'
  ],
  PAYMENT_REJECTED: [
    'A specific payment request has been rejected for a given reason.',
    'This suggests a specific payment in a batch has an issue, for instance the total value of a payment request is different to the total value of invoice lines, or there are no invoice lines.',
    'Scheme Owners are expected to review the file and resubmit, with support from the P&DS team if required.'
  ],
  PAYMENT_DAX_REJECTED: [
    'A specific payment was rejected for a given reason by Dynamics 365, and the payment has been placed on hold in Payment Hub.',
    'The rejection is not related to missing bank details for the customer.',
    'Scheme Owners are expected to review the reasons for rejection and lift the Payment Hub hold when resolved, with support from the P&DS team if required.'
  ],
  PAYMENT_INVALID_BANK: [
    'A specific payment was rejected by Dynamics 365 due to missing bank details for the customer, and the payment has been placed on hold in Payment Hub.',
    'Finance/CPAT are expected to update bank details for the customer and lift the Payment Hub hold when resolved.'
  ],
  PAYMENT_PROCESSING_FAILED: [
    'A specific payment has failed to complete processing within ffc-pay-processing for a given reason.',
    'This typically suggests something has gone wrong within the Payment Hub, for instance an unexpected schedule type was received.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  PAYMENT_SETTLEMENT_UNSETTLED: [
    'Dynamics 365 has reported a payment could not be settled with the customer for a given reason.',
    'Finance/CPAT are expected to investigate and action as appropriate.'
  ],
  PAYMENT_SETTLEMENT_UNMATCHED: [
    'Settlement detail provided by Dynamics 365 cannot be matched with a payment in Payment Hub.',
    'Suggests an issue with invoice number alignment.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  RESPONSE_REJECTED: [
    'A specific payment response provided by Dynamics 365 has been rejected for a given reason.',
    'This typically suggests an error has occurred in processing a D365 acknowledgement or return file, for instance the format of this file was not as expected.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  PAYMENT_REQUEST_BLOCKED: [
    'A specific payment request has been sent to the request editor, for providing either missing debt data or a ledger check.',
    'RPA/CPAT are expected to fill in the required information in the request editor.'
  ],
  PAYMENT_DAX_UNAVAILABLE: [
    'A specific payment journal could not be sent to Dynamics 365 for a given reason, usually connectivity.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  RECEIVER_CONNECTION_FAILED: [
    'A connection related error has occurred during processing and a payment has, usually temporarily, failed to complete.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  DEMOGRAPHICS_PROCESSING_FAILED: [
    'A specific demographics update file has been received which could not be processed, usually suggesting the update was received in an incorrect format, for instance not in the expected JSON format.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  DEMOGRAPHICS_UPDATE_FAILED: [
    'Demographics updates for a given FRN could not be processed.',
    'For instance, this could mean that an SBI provided was not in the correct format, or a FRN was the incorrect length.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  EVENT_SAVE_ALERT: [
    'An error occurred when attempting to save details of a Payment Hub event to the events storage, impacting accuracy of payment reporting.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ],
  TABLE_CREATE_ALERT: [
    'An error occurred when attempting to create resources required to save events to the events storage, impacting accuracy of payment reporting.',
    'The P&DS team are expected to investigate and action as appropriate.'
  ]
}
