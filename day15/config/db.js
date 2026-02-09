const mongoose = require('mongoose')
require('dotenv').config()

connectToDb = async() =>{
    mongoose.connect(`${process.env.MONGODB_URI}/day-15`)
    .then(() => {
        console.log('database connected');
    })
}

module.exports = connectToDb