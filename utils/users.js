/* describe the data */

const Joi = require('joi')

const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    subscription: Joi.string()
        .valid('starter', 'pro', 'business')
        .default('starter'),
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})

module.exports = { registerSchema, loginSchema }
