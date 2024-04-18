import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Contact from './pages/Contact'
import MinindiTest from './pages/MinindiTest'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Contact/>}></Route>
      <Route path='/mini' element={<MinindiTest/>}></Route>
    </Routes>
  )
}

export default App