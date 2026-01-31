const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./src/app.js')
const connectToDb = require('./src/config/db.js')

connectToDb()

app.listen(3000, ()=>{
    console.log("Backend is working on port 3000");
    
})