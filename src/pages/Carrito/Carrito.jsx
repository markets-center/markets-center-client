import "./Carrito.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import CardItem from "./CardItem";
import CarLoader from "./CarLoader.js";
import CheckoutComp from "../../components/Checkout2/CheckoutComp"
import {Snackbar} from '@mui/material';
import {SnackbarAlert} from '../../components/Alert/success';
import accounting from 'accounting';
import { getOrUpdateCart } from "../../redux/actions/a.cart.js";
import { useAuth } from "../../context/AuthContext";
import useLocalStorage from "../../pages/Carrito/useLocalStorage.js";
import { useNavigate } from "react-router-dom";

import {
  Typography,
  Button,
  Divider,
  Modal,
  Box
} from "@mui/material";

export default function Carrito() {

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleCloseAlert(){
    setAlert('');
  }
  function handleOpenAlert(msg){
    setAlert(msg);
  }

  const productsApi = useSelector((state) => state.addOrdercar);
  const idCarUser = currentUser && currentUser.uid;
  const [productsTemp, setProductsTemp] = useLocalStorage("productsTemp");
  const [activePay, setActivePay] = useState(false);

  const eventClickCountAdd = (price, id, counter) => {
    if (currentUser) {
      const updateProduct = productsApi.products.map((pa) => {
        const obj={productId: pa.productId._id, quantity: pa.quantity}
        if(pa.productId._id === id){
          obj.quantity = counter
        }
        return obj;
      });
      const newAmount = productsApi.products.reduce((sum, value) => {
        return sum + value.productId.price * value.quantity;
      }, 0) 
      const obj = {
        idUser: idCarUser,
        products: updateProduct,
        amount: newAmount + price 
      };
      dispatch(getOrUpdateCart(obj, currentUser));
    } else {
      const getProductsTemp = JSON.parse(localStorage.getItem("productsTemp"));
      const updateTemp = getProductsTemp.map((p) => {
        if (p.productId === id) {
          p.quantity = counter;
          p.amount = price * counter;
        }
        return p;
      });
      setProductsTemp(updateTemp);
      handleOpenAlert("Cantidad modificada");
    }
  }

  const eventClickCountRes = (price, id, counter) => { 
    if (currentUser) {
      const updateProduct = productsApi.products.map((pa) => {
        const obj={productId: pa.productId._id, quantity: pa.quantity}
        if(pa.productId._id === id){
          obj.quantity = counter
        }
        return obj;
      });
      const newAmount = productsApi.products.reduce((sum, value) => {
        return sum + value.productId.price * value.quantity;
      }, 0) 
      const obj = {
        idUser: idCarUser,
        products: updateProduct,
        amount: newAmount - price 
      };
      dispatch(getOrUpdateCart(obj, currentUser));
    } else {
      const getProductsTemp = JSON.parse(localStorage.getItem("productsTemp"));
      const updateTemp = getProductsTemp.map((p) => {
        if (p.productId === id) {
          p.quantity = counter;
          p.amount = price * counter;
        }
        return p;
      });
      setProductsTemp(updateTemp);
      handleOpenAlert("Cantidad modificada");
    }
  }

  const eventClickRemoveItem = (id) => {
    
    if (currentUser) {
      const removeItem = productsApi.products.filter(
        (f) => f.productId._id !== id
      );
      const obj = {
        idUser: currentUser._delegate.uid,
        products: removeItem,
        amount: removeItem.reduce((sum, value) => {
          return sum + value.productId.price * value.quantity;
        }, 0)
      };
      dispatch(getOrUpdateCart(obj, currentUser));
    } else {
      if(!productsApi.products.length)setActivePay(true)
      const getProductsTemp = JSON.parse(localStorage.getItem("productsTemp"));
      const filter = getProductsTemp.filter((f) => f.productId !== id);
      setProductsTemp(filter);
      handleOpenAlert("Producto eliminado");
    }
  }

  const removeAllCar = () => {
    if (currentUser) {
      const obj = {
        idUser: idCarUser,
        products: [],
        amount: 0,
      };
      dispatch(getOrUpdateCart(obj, currentUser));
    } else {
      const getProductsTemp = JSON.parse(localStorage.getItem("productsTemp"));
      if (getProductsTemp.length) setProductsTemp([]);
    }
  };

  const handleValidate = () => {
    navigate("/Register");
  };

  const getProductsTemp = JSON.parse(localStorage.getItem("productsTemp"));
  const total = getProductsTemp.reduce((sum, item) => sum + item.amount, 0);
  const totalApi = productsApi && productsApi.amount;
  const subTotalApi = totalApi / 1.18;
  const ivaApi = totalApi - subTotalApi;
  const subTotal = total / 1.18;
  const iva = total - subTotal;

  useEffect(() => {
    return currentUser && dispatch(getOrUpdateCart({ idUser: idCarUser }, currentUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar searchBar1={false} />
      <div className="car-container">
        <div className="items-content">
        {!currentUser ? (
            productsTemp.length ? (
              productsTemp.map((item) => {
                return (
                  <div key={item.productId}>
                    <CardItem
                      id={item.productId}
                      name={item.name}
                      image={item.image}
                      price={item.price}
                      stock={item.stock}
                      quantity={item.quantity}
                      eventClickCountAdd={eventClickCountAdd}
                      eventClickCountRes={eventClickCountRes}
                      eventClickRemoveItem={eventClickRemoveItem}
                    />
                    <Divider />
                  </div>
                );
              })
            ) : (
              <CarLoader msg={"Tu carrito esta vacío...!!!"} />
            )
          ) : productsApi.products?.length ? (
            productsApi.products.map((item) => {
              return (
                <div key={item.productId._id}>
                  <CardItem
                    id={item.productId._id}
                    name={item.productId.name}
                    image={item.productId.image}
                    price={item.productId.price}
                    stock={item.productId.stock}
                    quantity={item.quantity}
                    eventClickCountAdd={eventClickCountAdd}
                    eventClickCountRes={eventClickCountRes}
                    eventClickRemoveItem={eventClickRemoveItem}
                  />
                  <Divider />
                </div>
              );
            })
          ) : (
            <CarLoader msg={"Tu carrito esta vacío...!!!"} />
          )}
        </div>
        <div className="pay-container">
          <div className="content-pay tittle-pay">
            <div className="lb-content">
              <Typography variant="body1">Sub Total:</Typography>
              <Typography variant="body1">Iva:</Typography>
              <Typography variant="body1">Total:</Typography>
            </div>
            <div className="lb-content">
              <Typography variant="body2">
                {accounting.formatMoney(subTotal||subTotalApi, "$")}
              </Typography>
              <Typography variant="body2">
                {accounting.formatMoney(iva||ivaApi, "$")}
              </Typography>
              <Typography variant="body2">
                {accounting.formatMoney(total||totalApi, "$")}
              </Typography>
            </div>
          </div>
          <hr />
          <div className="content-pay btn-pay">
            <Button variant="outlined" size="small"
            disabled={activePay} 
            onClick={currentUser ? handleOpen : handleValidate}>
              PAGAR
            </Button>
          </div>
          <div className="content-pay btn-pay">
            <label htmlFor="" className="lbl-removeAllCar" onClick={removeAllCar}>
              Vaciar el Carrito
            </label>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box class="checkout">
          <CheckoutComp amount={total||totalApi}/>
        </Box>
      </Modal>
      <Snackbar open={!!alert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <SnackbarAlert onClose={handleCloseAlert} color='primary' variant='filled' severity='success'>
                    {alert}
                </SnackbarAlert>
            </Snackbar>

    </div>
  );
}
