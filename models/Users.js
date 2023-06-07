const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },

    email: {
        unique: true,
        type: String,
        required: [true, 'Email is required'],
    },

    subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: 'starter',
    },

    refreshToken: {
        type: String,
        default: null,
    },

    avatarURL: {
        type: String,
    },

    verifyEmail: {
        type: Boolean,
        default: false,
    },

    verificationEmail: {
        type: String,
        required: [true, 'Verify Email is required'],
    },
})

module.exports = mongoose.model('Users', usersSchema)
