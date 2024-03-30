import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages and components
import Tracker from './pages/Tracker';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={<Tracker />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
