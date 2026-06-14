import React from 'react'
import axios from "axios"

const App = () => {

  let getData = async() => {
    try {
      let res = await axios.get('https://fakestoreapi.com/products')
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  getData()

  return (
    <div>
      <h1>Hey ....</h1>
    </div>
  )
}

export default App