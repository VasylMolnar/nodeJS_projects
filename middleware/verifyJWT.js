//verify user Auth by (JWT Access Token)
const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

    //select token
    const token = authHeader.split(' ')[1]

    //verify Token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403) //invalid token

        next()
    })
}

module.exports = verifyJWT
