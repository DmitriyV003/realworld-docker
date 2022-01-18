const mongoose = require('mongoose')
const { db } = require('../config/index')

module.exports.connectDb = () => {
    mongoose.connect(db, { useNewUrlParser: true })

    return mongoose.connection
}
