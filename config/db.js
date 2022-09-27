const mongoose = require('mongoose')
require('dotenv').config()
const { MONGO_URI } = process.env

const connectDB = (app) => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { 
        app.listen(3000,()=>{console.log(" XNODE APP is running on ")})

    }).catch((err) => {
        console.log(err.message)
        console.error(err)
        process.exit(1)
    })
}

module.exports = connectDB