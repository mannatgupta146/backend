const mongoose = require('mongoose')
require('dotenv').config()

function connectToDb(){
    mongoose.connect(`${process.env.MONGODB_URI}/day-8`)
    .then(() => {
        console.log('connected to database');
    })
}

module.exports = connectToDb