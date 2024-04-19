import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Contact from './pages/Contact'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Contact/>}></Route>
      
    </Routes>
  )
}

export default App