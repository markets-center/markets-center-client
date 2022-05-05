import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

//middlewares
import AdminRoute from './pages/MiddlewareRoute/adminRoute'
import CredentialRoute from './pages/MiddlewareRoute/credentialRoute'
import BuyerRoute from './pages/MiddlewareRoute/buyerRoute'
import SellerRoute from './pages/MiddlewareRoute/sellerRoute'
import GuestBuyerRoute from './pages/MiddlewareRoute/guestBuyerRoute'

import Home from "../src/pages/Home/Home";
import Carrito from "../src/pages/Carrito/Carrito";
import Admin from "../src/pages/Admin/Admin.jsx";
import Register from "../src/pages/Register/Register";
import Error from "../src/components/Error/Error";
import Footer from "../src/components/Footer/Footer";
import Vendedor from "../src/pages/Vendedor/Vendedor";
import SellerForm from './pages/UserData/SellerForm2'
import BuyerForm from './pages/UserData/BuyerForm2'
import Login from './pages/Login/Login';
import OlvidoPass from './pages/ForgotPass/OlvidoPass'
import HistoryHome from "./components/Vendedor/HistorialVentas/HistoryHome";
import Comprador from './pages/Comprador/Comprador'
import GraciasPage from './pages/GraciasPage/GraciasPage'
import GraciasSub from './pages/GraciasPage/GraciasSub'
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Favoritos from './pages/Favs/Favoritos'

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={
              <CredentialRoute>
                <Login />
              </CredentialRoute>
            } />
            <Route path="/" element={
              <GuestBuyerRoute>
                <Home />
              </GuestBuyerRoute>
            } />
            <Route path="/Carrito" element={
              <GuestBuyerRoute>
                <Carrito />
              </GuestBuyerRoute>
            } />

            <Route path="/Register" element={
              <CredentialRoute>
                <Register />
              </CredentialRoute>
            } />

            <Route path="/Thanks" element={
              <BuyerRoute>
                <GraciasPage />
              </BuyerRoute>
            } />

            <Route path="/Bienvenido" element={
              <SellerRoute>
                <GraciasSub />
              </SellerRoute>
            } />

            <Route path="/favoritos" element={
              <BuyerRoute>
                <Favoritos />
              </BuyerRoute>
            } />

            <Route path="/Error" element={
              <BuyerRoute>
                <ErrorPage />
              </BuyerRoute>
            } />

            <Route path="/Admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />

            <Route path="/OlvidoPass" element={
              <CredentialRoute>
                <OlvidoPass />
              </CredentialRoute>
            } />


            <Route path="/Profile" element={
              <SellerRoute>
                <Vendedor />
              </SellerRoute>
            } />

            {/* Provisorio */}
            <Route path="/orderHistory" element={
              <SellerRoute>
                <HistoryHome />
              </SellerRoute>
            } />

            {/* Provisorio */}
            <Route path="/User" element={
              <BuyerRoute>
                <Comprador />
              </BuyerRoute>
            } />

            <Route
              path="/sellerForm"
              element={
                <SellerRoute>
                  <SellerForm />
                </SellerRoute>
              }
            />

            <Route path="/buyerForm" element={
              <BuyerRoute>
                <BuyerForm />
              </BuyerRoute>
            } />

            <Route path="/*" element={<Error message='Esa pagina no existe' mistake={true} />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
