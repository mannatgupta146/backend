const express = require('express')

const app = express()

app.use(express.json())

let notes = []

app.get('/notes',(req, res)=>{
    res.status(200).json({
        message: notes
    })
})

app.post('/notes',(req, res)=>{
    notes.push(req.body)
    res.status(201).json({
        message: 'notes added'
    })
})

app.delete('/notes/:index',(req, res)=>{
    delete notes[req.params.index]
    res.status(200).json({
        message: 'deleted'
    })
})

app.put('/notes/:index',(req, res)=>{
    notes[req.params.index] = req.body
    res.status(200).json({
        message: 'modified'
    })
})

app.patch('/notes/:index',(req, res)=>{
    notes[req.params.index] = req.body.description
    res.status(200).json({
        message: 'modified'
    })
})

module.exports = app