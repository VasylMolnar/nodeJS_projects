const router = require('express').Router()
const usersControllers = require('../controllers/usersControllers')

router.post('/register', usersControllers.register)

router.post('/login', usersControllers.login)

router.get('/logout', usersControllers.logout)

router.get('/current/:id', usersControllers.current)

module.exports = router
