const { getEmailAddresses } = require('./get-email-addresses')

const getRecipients = (event) => {
  const emailAddresses = getEmailAddresses(event.type, event.source)
  return emailAddresses ? emailAddresses.replace(/\s/g, '').trim().split(';').filter(x => x.length) : []
}

module.exports = {
  getRecipients
}
