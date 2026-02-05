const express = require('express')
const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()

authRouter.post('/register', async(req, res)=> {
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const user = await userModel.create({name, email, password})

    const token = jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email
        },
            process.env.JWT_SECRET
    )

    res.cookie('jwt_token', token)

    res.status(201).json({
        message: "user registered successfully",
        user,
        token
    })
})

authRouter.get('/register', async(req, res)=> {
    const {name, email, password} = req.body
    const user = await userModel.findOne({email, password})

    res.status(201).json({
        message: "user found",
        user
    })
})

module.exports = authRouter