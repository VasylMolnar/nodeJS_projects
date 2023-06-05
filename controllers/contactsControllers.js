const fs = require('fs').promises
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const { contactSchema } = require('../utils/contacts')

const contactsPath = path.join(__dirname, '../models/contacts.json')

const getAllContacts = async (req, res) => {
    try {
        const data = await fs.readFile(contactsPath, 'utf8')
        res.status(200).send(data)
    } catch (e) {
        // console.error(e)
        res.status(500).send(e.message)
    }
}

const createContact = async (req, res) => {
    if (!req?.body.name || !req.body.email || !req.body.phone) {
        return res
            .status(400)
            .json({ message: 'name, email, phone are required' })
    }

    const { error } = contactSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.message)
    }

    const { name, email, phone } = req.body
    try {
        let contacts = await fs.readFile(contactsPath, 'utf8')
        contacts = [
            ...JSON.parse(contacts),
            { id: uuidv4(), name, email, phone },
        ]

        await fs.writeFile(contactsPath, JSON.stringify(contacts))

        res.status(201).send(contacts)
    } catch (e) {
        // console.error(e)
        res.status(500).send(e.message)
    }
}

const deleteContactById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'ID is required' })
    }

    const id = req.params.id

    let contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'))
    const index = contacts.findIndex((contact) => contact.id === id)

    if (index === -1) {
        return res.status(404).send(`Contact with id - ${id}, not found.`)
    }

    try {
        const removedContact = contacts.splice(index, 1)

        await fs.writeFile(contactsPath, JSON.stringify(contacts))

        res.status(200).json(removedContact)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const getContactById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'ID is required' })
    }

    const id = req.params.id

    let contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'))

    const currentContact = contacts.find((contact) => contact.id === id)

    if (!currentContact) {
        return res.status(404).send(`Contact with id - ${id}, not found.`)
    }

    res.status(200).json(currentContact)
}

const updateContactById = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.email ||
        !req.body.phone ||
        !req.params.id
    ) {
        return res
            .status(400)
            .json({ message: 'name, email, phone, ID are required' })
    }

    const id = req.params.id

    try {
        let contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'))
        const index = contacts.findIndex((contact) => contact.id === id)

        if (index === -1) {
            return res.status(404).send(`Contact with id - ${id}, not found.`)
        }

        contacts.splice(index, 1, {
            id: uuidv4(),
            ...req.body,
        })

        await fs.writeFile(contactsPath, JSON.stringify(contacts))
        res.status(200).json(contacts)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    getAllContacts,
    createContact,
    deleteContactById,
    getContactById,
    updateContactById,
}
