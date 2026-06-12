const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userModel = require('../models/user.model')

const authRouter = express.Router()

authRouter.post('/register', async(req, res) =>{
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex')

    const user = await userModel.create({name, email, password : hash})

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

authRouter.post('/protected', async(req, res) =>{
    const {email, password} = req.body

    const users = await userModel.findOne({email})

    if(!users){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordMatched = users.password = crypto.createHash('md5').update(password).digest('hex')

    if(!isPasswordMatched){
        return res.status(400).json({
            message: "incorrect password"
        })
    }

    const token = jwt.sign(
        {
            id: users._id
        },
        process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(200).json({
        message: "user logged in successfully",
        users
    })
})

module.exports = authRouter