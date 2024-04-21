import React from 'react'
import { Routes, Route } from "react-router-dom";
//import PaymentDetails from './pages/PaymentDetails';
import MinindiTest from './pages/MinindiTest';
import SaveCard from './pages/SaveCard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MinindiTest/>}/>
        <Route path='/' element={<SaveCard/>}/>
          
        
      </Routes>
    </div>
  )
}

export default App