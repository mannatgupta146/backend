const express = require('express')

const app = express()

app.use(express.json())

let notes = []

app.get('/notes', (req,res) => {
    res.status(200).json({
        message: "all notes",
        notes
    })
})

app.post('/notes', (req,res) => {
    notes.push(req.body)
    res.status(201).json({
        message: "notes created"
    })
})

app.patch('/notes/:index', (req,res) => {
    notes[req.params.index].title = req.body.title
    res.status(200).json({
        message: "title updated"
    })
})

app.delete('/notes/:index', (req,res) => {
    delete notes[req.params.index]
    res.status(200).json({
        message: "deleted note"
    })
})

module.exports = app