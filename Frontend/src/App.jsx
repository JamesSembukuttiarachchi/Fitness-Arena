import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Contact from './pages/Contact'
import AllFeedbacks from './pages/AllFeedbacks'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Contact/>}></Route>
      <Route path='/feedbacks' element={<AllFeedbacks/>}></Route>
      
    </Routes>
  )
}

export default App