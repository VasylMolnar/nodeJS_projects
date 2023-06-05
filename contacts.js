const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, 'db/contacts.json')

const getAll = async () => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

const addContact = async (name, email, phone) => {
    const contacts = await getAll()
    contacts.push({ id: uuidv4(), name, email, phone })

    await fs.writeFile(contactsPath, JSON.stringify(contacts))

    return contacts
}

const deleteContact = async (id) => {
    const contacts = await getAll()
    const index = contacts.findIndex((contact) => contact.id === id)

    if (index === -1) {
        return `Contact with id - ${id}, not found.`
    }

    const removedContact = contacts.splice(index, 1)

    await fs.writeFile(contactsPath, JSON.stringify(contacts))

    return removedContact
}

const getContactById = async (id) => {
    const contacts = await getAll()
    const currentContact = contacts.find((contact) => contact.id === id)

    if (!currentContact) {
        return `Contact with id - ${id}, not found.`
    }

    return currentContact
}

module.exports = {
    getAll,
    addContact,
    deleteContact,
    getContactById,
}
