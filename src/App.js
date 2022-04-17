import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Home from "../src/pages/Home/Home";
import Carrito from "../src/pages/Carrito/Carrito";
import Register from "../src/pages/Register/Register";
import Error from "../src/components/Error/Error";
import Footer from "../src/components/Footer/Footer";
import Vendedor from "../src/pages/Vendedor/Vendedor";
import SellerForm from './pages/UserData/SellerForm'
import BuyerForm from './pages/UserData/BuyerForm'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Vendedor />} />
          <Route path="/sellerForm" element={<SellerForm />} />
          <Route path="/buyerForm" element={<BuyerForm />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
