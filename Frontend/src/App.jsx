import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages and components
import FeedbackForm from './components/FeedbackForm';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
      
        <div className='pages'>
          <Routes>
            <Route 
              path='/'
              element={<FeedbackForm />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App