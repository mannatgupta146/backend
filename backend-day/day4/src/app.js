const express = require('express')

const app = express()

app.use(express.json())

let notes = []

app.post('/notes', (req, res)=>{
    notes.push(req.body)    
    res.send('note added')
    console.log(req.body);
})

app.get('/notes', (req, res)=>{
    res.send(notes)
})

app.delete('/notes/:index', (req, res)=>{
    delete notes[req.params.index]
    res.send('note deleted')
})

app.patch('/notes/:index', (req, res)=>{
    notes[req.params.index].title = req.body.title
    res.send('note updated')
})

app.put('/notes/:index', (req, res)=>{
    notes[req.params.index]= req.body
    res.send('note updated')
})

module.exports = app