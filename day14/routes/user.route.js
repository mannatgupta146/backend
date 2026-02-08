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

authRouter.post('/protected', async(req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(409).json({
            message: "user email already exists"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

    if(!isPasswordMatched){
        return res.status(400).json({
            message: "password not matched"
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('sign_token', token)

    res.status(200).json({
        message: "user login successfully"
    })
})

module.exports = authRouter