const mongoose = require('mongoose')
const signale = require('signale')

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        signale.success(`Success Connected to MongoDB`)
    } catch (e) {
        signale.fatal('Connected to MongoDB', e)
    }
}

module.exports = dbConnect
