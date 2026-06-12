const express = require('express')

const app = express()

let notes = []

app.use(express.json())

app.post('/notes', (req, res) => {
    console.log(req.body);
    
    notes.push(req.body)
    res.send('note added')
})

app.get('/notes', (req,res) => {
    res.send(notes)
})

app.listen(3000)