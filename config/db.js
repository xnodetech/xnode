const mongoose = require('mongoose')
require('dotenv').config()
const { MONGO_URI } = process.env
const PORT = process.env.PORT || config.httpPort;
const connectDB = (app) => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { 
        app.listen(PORT,()=>{console.log(" XNODE APP is running on ")})

    }).catch((err) => {
        console.log(err.message)
        console.error(err)
        process.exit(1)
    })
}

module.exports = connectDB