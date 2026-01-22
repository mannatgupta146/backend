const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.send('heelo')
})

app.listen(3000)