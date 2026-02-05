const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String
    }
})

const userSchema = mongoose.model('user', userModel)

module.exports = userSchema