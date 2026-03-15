import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './redux-toolkit/slices/counterSlice'
import { changeThemeToDark, changeThemeToLight } from './redux-toolkit/slices/themeSlice'

const App = () => {
  const num = useSelector((state) => state.counter.value)
  const theme = useSelector((state) => state.theme.value)

  const dispatch = useDispatch()

  return (
    <div className='app'>
      <h1>{num}, {theme}</h1>
      <button onClick={()=>{dispatch(increment())}} className='btn'>+1</button>
      <button onClick={()=>{dispatch(decrement())}} className='btn'>-1</button>
      <button onClick={()=>{dispatch(changeThemeToLight())}} className='btn'>Toggle Theme Light</button>
      <button onClick={()=>{dispatch(changeThemeToDark())}} className='btn'>Toggle Theme Dark</button>
    </div>  
  )
}

export default App