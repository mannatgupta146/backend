const mongoose = require('mongoose')
require('dotenv').config()

connectToDb = async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}/day-13`)
    .then(()=>{
        console.log("database connected");
    })
}

module.exports = connectToDb