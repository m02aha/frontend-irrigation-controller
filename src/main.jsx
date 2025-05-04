import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// c//import from dashboard page 
import Login from './components/Login';//import login component from login page
import Settings from './components/Settings';//import SETTINGS component from login page
import App from './components/App';//import ashboard page



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>     
       <Routes> 
         <Route path="/" element={<App />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
      </Router>
  </StrictMode>
);







