import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error("Error fetching users:", error)
      })
  }, [])

  return (
    <div className="app">
      
      <h1>helo</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
