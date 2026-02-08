const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const authRouter = express.Router()

authRouter.post('/register', async(req, res) => {
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "users already exists"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({name, email, password: hash})

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: "user registered successfully"
    })
})

module.exports = authRouter