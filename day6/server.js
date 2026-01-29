const app = require('./src/app')
const mongoose = require('mongoose')
require('dotenv').config()


function connectToDb(){
    mongoose.connect(`${process.env.MONGODB_URI}/day-6`)
    .then(()=> {
        console.log('connected to database');       
    })
}
connectToDb()

app.listen(3000,(req, res)=> {
    console.log('app is running on port 3000');
    
})