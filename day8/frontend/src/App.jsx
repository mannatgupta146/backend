import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [note, setNote] = useState([])

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:3000/api/notes')
    setNote(res.data.notes)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className='notes'>
      {note.map((elem) => (
        <div className='note' key={elem._id}>
          <h1>{elem.title}</h1>
          <p>{elem.description}</p>
        </div>
      ))}
    </div>
  )
}

export default App
