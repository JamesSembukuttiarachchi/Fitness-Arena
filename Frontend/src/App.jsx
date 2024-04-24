import React from 'react'
import { Routes, Route } from "react-router-dom";
//import PaymentDetails from './pages/PaymentDetails';
import MinindiTest from './pages/MinindiTest';
import SaveCard from './pages/SaveCard';
import Profile from './pages/Profile';
import ViewCards from './pages/ViewCards';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Profile/>}/>
        <Route path='/view' element={<ViewCards/>}/>
        <Route path='/minindi' element={<MinindiTest/>}/>
        <Route path='/save' element={<SaveCard/>}/>
          
        
      </Routes>
    </div>
  )
}

export default App