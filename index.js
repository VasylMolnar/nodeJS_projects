const contactOperations = require('./contacts.js')
const { Command, program } = require('commander')

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'contact id')
    .option('-n, --name <type>', 'contact name')
    .option('-e, --email <type>', 'contact email')
    .option('-p, --phone <type>', 'contact phone')

program.parse(process.argv)
const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'getAll':
            const contacts = await contactOperations.getAll()
            console.table(contacts)
            break

        case 'get':
            const contact = await contactOperations.getContactById(id)

            console.log(contact)
            break

        case 'add':
            const newContact = await contactOperations.addContact(
                name,
                email,
                phone
            )
            console.table(newContact)
            break

        case 'delete':
            const removeContact = await contactOperations.deleteContact(id)
            console.log(removeContact)
            break

        default:
            console.warn('\x1B[31m Unknown action type!')
    }
}

invokeAction(argv)
