import { useState } from 'react'
import './App.css'
import Home from './Home'
import Home_body from './Home_body'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <Home_body/>
    </>
  )
}

export default App
