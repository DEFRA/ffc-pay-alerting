const TIMEOUT = 30000
jest.setTimeout(TIMEOUT)

const setEnvVarIfMissing = (name, value) => {
  if (!process.env[name]) {
    process.env[name] = value
  }
}

setEnvVarIfMissing('MESSAGE_QUEUE_HOST', 'servicebus-emulator')
setEnvVarIfMissing('MESSAGE_QUEUE_USER', 'RootManageSharedAccessKey')
setEnvVarIfMissing('MESSAGE_QUEUE_PASSWORD', 'SAS_KEY_VALUE')
setEnvVarIfMissing('ALERT_TOPIC_ADDRESS', 'ffc-pay-alert-test')
setEnvVarIfMissing('ALERT_SUBSCRIPTION_ADDRESS', 'ffc-pay-alerting')
