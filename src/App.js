import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from './pages/PrivateRoute/PrivateRoute'

import Home from "../src/pages/Home/Home";
import Carrito from "../src/pages/Carrito/Carrito";
import Register from "../src/pages/Register/Register";
import Error from "../src/components/Error/Error";
import Footer from "../src/components/Footer/Footer";
import Vendedor from "../src/pages/Vendedor/Vendedor";
import SellerForm from './pages/UserData/SellerForm'
import BuyerForm from './pages/UserData/BuyerForm'
import Login from './pages/Login/Login'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Vendedor />} />
          <Route 
          path="/sellerForm" 
          element={
            <PrivateRoute>
              <SellerForm />
            </PrivateRoute>
          } 
          />
          <Route path="/buyerForm" element={<BuyerForm />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
