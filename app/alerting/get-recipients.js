const { getEmailAddresses } = require('./get-email-addresses')

const getRecipients = (event) => {
  const emailAddresses = getEmailAddresses(event.type, event.source)
  return emailAddresses ? emailAddresses.replace(/\s/g, '').split(';') : []
}

module.exports = {
  getRecipients
}
