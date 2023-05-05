const { getEmailAddresses } = require('./get-email-addresses')

const getRecipients = (event) => {
  const emailAddresses = getEmailAddresses(event.type, event.source)
  return emailAddresses ? emailAddresses.split(';') : []
}

module.exports = {
  getRecipients
}
