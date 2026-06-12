const mongoose = require('mongoose')
require('dotenv').config()

const connectToDb = ()=> {
    mongoose.connect(`${process.env.MONGODB_URI}/day-12`)
    .then(()=> {
        console.log("database connected");
    })
}

module.exports = connectToDb