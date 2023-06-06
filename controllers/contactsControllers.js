const Contacts = require('../models/Contacts')
const contactSchema = require('../utils/contacts')

const getAllContacts = async (req, res) => {
    try {
        const data = await Contacts.find().exec()
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
        return res.status(400).send(error.message)
    }

    try {
        const data = await Contacts.create({ ...req.body })
        res.status(201).send(data)
    } catch (e) {
        // console.error(e)
        res.status(500).send(e.message)
    }
}

const getContactById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'ID is required' })
    }

    const id = req.params.id

    try {
        const currentContact = await Contacts.findOne({ _id: id }).exec()

        if (!currentContact) {
            return res.status(404).send(`Contact with id - ${id}, not found.`)
        }

        res.status(200).json(currentContact)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const deleteContactById = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'ID is required' })
    }

    const id = req.params.id

    try {
        const currentContact = await Contacts.findByIdAndDelete({
            _id: id,
        }).exec()
        res.status(200).send(currentContact)
    } catch (e) {
        res.status(500).send(e.message)
    }
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
        const currentContact = await Contacts.findByIdAndUpdate(
            id,
            {
                ...req.body,
            },
            { new: true }
        )

        res.status(200).send(currentContact)
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
