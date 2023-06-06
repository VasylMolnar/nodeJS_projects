const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },

    email: {
        type: String,
        required: [true, 'Set email for contact'],
        unique: true,
    },

    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },

    favorite: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Contacts', contactsSchema)
