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
            message: "user email already exists"
        })
    }

    const hashedPassword = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({name, email, password: hashedPassword})

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)


    res.status(201).json({
        message: "user registered successfully"
    })
})

authRouter.post('/protected', async(req, res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "user not exists register first"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "logged in successfully",
        user
    })
    
})

module.exports = authRouter