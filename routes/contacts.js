const router = require('express').Router()
const contactsController = require('../controllers/contactsControllers')

router
    .route('/')
    .get(contactsController.getAllContacts)
    .post(contactsController.createContact)

router
    .route('/:id')
    .get(contactsController.getContactById)
    .put(contactsController.updateContactById)
    .delete(contactsController.deleteContactById)

module.exports = router
