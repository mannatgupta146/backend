const app = require('./src/app')

app.listen(3000, ()=>{
    console.log('app is runnning on port 3000');
    
})

let notes = []

app.use(express.json())

app.post('/notes', (req, res)){
    notes.push(req.body)    
    res.send('note added')
    console.log(req.body);
}

app.get('/notes', (req, res)){
    res.send(notes)
}

app.delete('/notes', (req, res)){
    
}

app.patch('/notes', (req, res)){
    
}