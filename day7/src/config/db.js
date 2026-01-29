const mongoose = require('mongoose')
require('dotenv').config()

function connectToDb(){
    mongoose.connect(`${process.env.MONGODB_URI}/day-7`)
    .then(()=> {
        console.log("database is connected");
    })
}

module.exports = connectToDb