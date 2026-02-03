const express = require('express')
const mongoose = require('mongoose')
const notesModel = require('../models/notes.model.js')
const cors = require('cors')

const path = require("path");

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

app.post('/api/notes', async(req, res) => {
    const {title, description} = req.body

    const note = await notesModel.create({title, description})
    res.status(201).json({
        message: "note created"
    })
})

app.get('/api/notes', async(req, res) => {
    const notes = await notesModel.find()
    res.status(200).json({
        message: "all notes",
        notes
    })
})

app.patch('/api/notes/:id', async(req, res) => {
    const {id} = req.params
    const {title, description} = req.body

    await notesModel.findByIdAndUpdate(id, {title, description})

    res.status(200).json({
        message: 'note updated'
    })
})

app.delete('/api/notes/:id', async(req, res) => {
    const {id} = req.params

    await notesModel.findByIdAndDelete(id)

    res.status(200).json({
        message: 'note deleted'
    })
})

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app