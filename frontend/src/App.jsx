import React from 'react'


import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Navbar from './pages/navbar'
import Home from './pages/home'
import Map from './components/Map'



function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar />
      
        <Routes>
        
          <Route path="/" element={<Home />} />
          
          <Route path="/map" element={<Map/>} />
         
       
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App