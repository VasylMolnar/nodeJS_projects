const express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const accessLogStream = require('./middleware/accessLogStream/accessLogStream')
const app = express()

const PORT = process.env.PORT || 1234

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('combined', { stream: accessLogStream }))

//routers
app.use('/contacts', require('./routes/contacts'))

app.use('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found' })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log(`Server running. Use our API on port: ${PORT}`)
    }
})
