const { contact } = require('../database')
const TABLES = require('../constants/tables')
const { pickColumns } = require('../constants/columns')

const prepareContactData = (payload) => pickColumns({ ...payload, modifiedAt: new Date() }, TABLES.contact)

const updateContactRecord = async (contactId, data) => {
  await contact()
    .where({ contactId })
    .update(data)
}

const createContactRecord = async (data) => {
  await contact().insert(data)
}

const updateContact = async (payload) => {
  const { contactId } = payload
  const contactData = prepareContactData(payload)

  if (contactId !== undefined && contactId !== null) {
    await updateContactRecord(contactId, contactData)
  } else {
    await createContactRecord(contactData)
  }
}

module.exports = {
  updateContact
}
