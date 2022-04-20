import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from './pages/MiddlewareRoute/PrivateRoute'
import LoginButton from './pages/MiddlewareRoute/LoginButton'

import Home from "../src/pages/Home/Home";
import Carrito from "../src/pages/Carrito/Carrito";
import Admin from "../src/pages/Admin/Admin.jsx";
import Register from "../src/pages/Register/Register";
import Error from "../src/components/Error/Error";
import Footer from "../src/components/Footer/Footer";
import Vendedor from "../src/pages/Vendedor/Vendedor";
import SellerForm from './pages/UserData/SellerForm'
import BuyerForm from './pages/UserData/BuyerForm'
import Login from './pages/Login/Login';
import OlvidoPass from './pages/ForgotPass/OlvidoPass'
import Comprador from './pages/Comprador/Comprador'

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Carrito" element={<Carrito />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/OlvidoPass" element={<OlvidoPass />} />
          <Route path="/Login" element={
            <LoginButton>
              <Login />
            </LoginButton>
          } />
          <Route path="/Profile" element={<Vendedor />} />
          <Route path="/User" element={<Comprador />} />
          <Route 
          path="/sellerForm" 
          element={
            <PrivateRoute>
              <SellerForm />
            </PrivateRoute>
          } 
          />
          <Route path="/buyerForm" element={
            <PrivateRoute>
              <BuyerForm />
            </PrivateRoute>
          } />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
