import React from 'react'


import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Navbar from './pages/navbar'
import Home from './pages/home'

import Map from './components/map'



function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/map" element={<Map/>} />
         
          {/* Add other routes here using the <Route> component */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App