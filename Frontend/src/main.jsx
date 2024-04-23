import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import ShopContextProvider from './Context/ShopContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
    
  </React.StrictMode>,
);
