const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const app = express()

const accessLogStream = require('./middleware/accessLogStream/accessLogStream')
const dbConnect = require('./config/dbConnect')
const { default: mongoose } = require('mongoose')
const PORT = process.env.PORT || 123

//connect to DB
dbConnect()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('combined', { stream: accessLogStream }))

//routers
app.use('/contacts', require('./routes/contacts'))

app.use('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found' })
})

mongoose.connection.once('open', () => {
    app.listen(PORT, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log(`Server running. Use our API on port: ${PORT}`)
        }
    })
})
