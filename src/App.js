import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../src/pages/Home/Home'
import Carrito from '../src/pages/Carrito/Carrito'
import Register from '../src/pages/Register/Register'
import Error from '../src/components/Error/Error'
import Footer from '../src/components/Footer/Footer'
import Vendedor from '../src/pages/Vendedor/Vendedor'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Vendedor />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
