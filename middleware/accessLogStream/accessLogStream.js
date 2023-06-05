var fs = require('fs')
var path = require('path')

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '..', '..', 'log', 'access.log'),
    {
        flags: 'a',
    }
)

module.exports = accessLogStream
