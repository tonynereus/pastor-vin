import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    
  // </React.StrictMode>,
  <RouterProvider  router={App}/>
)
