import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [note, setNote] = useState([])

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:3000/api/notes')
    setNote(res.data.notes)
  }

  const addNotes = async(e)=> {
    e.preventDefault()

    const title = e.target.title.value;
    const description = e.target.description.value;

    console.log(title, description);

    axios.post('http://localhost:3000/api/notes', {
      title: title,
      description: description
    })

    .then(res=> {
      console.log(res.data);
      fetchNotes()
    })
    
  }

  const deleteNotes = async(noteId)=> {
    await axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then(res => {
      console.log(res.data);
      fetchNotes()
    })
  }



  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className='notes'>
      <form onSubmit={addNotes}>
        <input type="text" name="title" id="" placeholder='Enter title' required/>
        <input type="text" name="description" id="" placeholder='Enter description' required/>
        <button>Create Note</button>
          
      </form>

      {note.map((elem) => (
        <div className='note' key={elem._id}>
          <h1>{elem.title}</h1>
          <p>{elem.description}</p>
          <div>
            <button>Update Note</button>
            <button onClick={()=>{deleteNotes(elem._id)}}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
