const router = require('express').Router()
const usersControllers = require('../controllers/usersControllers')
const upload = require('../middleware/upload')

router.post('/register', usersControllers.register)

router.post('/login', usersControllers.login)

router.get('/logout', usersControllers.logout)

router.get('/current/:id', usersControllers.current)

router.put(
    '/avatar/:id',
    upload.single('avatar'),
    usersControllers.updateAvatar
) // роут для оновлення аватарки користувача

router.get('/verify/:verificationToken', usersControllers.verifyEmail) // верифікація користувача

router.post('/verify', usersControllers.resendVerifyEmail) // запит повторної верифікації користувача

module.exports = router
