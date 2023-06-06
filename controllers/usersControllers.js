const Users = require('../models/Users')
const { registerSchema, loginSchema } = require('../utils/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const current = async (req, res) => {
    if (!req.params.id) {
        return res.status(404).message(`ID is required!`)
    }

    try {
        //find current user
        const currentUser = await Users.findById(req.params.id).exec()

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found!' })
        }

        res.json(currentUser)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const register = async (req, res) => {
    const { error } = registerSchema.validate(req.body)

    if (error) {
        return res.status(400).send(error.message)
    }

    // check for duplicate email in the db
    const duplicate = await Users.findOne({ email: req.body.email }).exec()
    if (duplicate)
        return res.status(409).json({ message: 'Email is already in use' }) //Conflict

    try {
        const hashedPwd = await bcrypt.hash(req.body.password, 10)
        const newUser = await Users.create({ ...req.body, password: hashedPwd })
        res.status(201).json(newUser)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const login = async (req, res) => {
    const { error } = loginSchema.validate(req.body)

    if (error) {
        return res.status(400).send(error.message)
    }

    //found User by email
    const foundUser = await Users.findOne({ email: req.body.email }).exec()
    if (!foundUser) return res.status(401).json({ message: 'User not found' })

    // evaluate password
    const match = bcrypt.compare(req.body.password, foundUser.password)

    if (match) {
        //create JWT token
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: foundUser._id,
                    username: foundUser.username,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30s',
            }
        )

        //create refresh token
        const refreshToken = jwt.sign(
            { email: req.body.email }, //decoded refreshTokenController
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken
        await foundUser.save()

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        // Send authorization roles and access token to user
        res.json({ accessToken })
    } else {
        res.status(401).json({
            message: 'Email or password error.',
        })
    }
}

const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content

    const refreshToken = cookies.jwt

    // Is refreshToken in db?
    const foundUser = await Users.findOne({ refreshToken: refreshToken }).exec()

    //in frontEnd must clear cookies. If not we send res.clearCookie from backEnd
    if (!foundUser) {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
        return res.sendStatus(204)
    }

    // Delete refreshToken in db by found User
    foundUser.refreshToken = ''
    await foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
}

module.exports = {
    current,
    register,
    login,
    logout,
}
