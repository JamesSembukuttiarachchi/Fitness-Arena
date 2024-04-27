import React from 'react'
import InjuryPage from './pages/InjuryPage'
import Appointment from './pages/Appoitnment'
import { Routes, Route, Router } from 'react-router-dom' 


const App = () => {
  return  (
    
      <Routes>
        <Route path = "/injury" element = {<InjuryPage/>}/>
        <Route path = "/appoinments" element = {<Appointment/>}/>
       
       
       
        
      </Routes>
       
      
      
     
  )
}

export default App








