import "./Carrito.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import CardItem from "./CardItem";
import {deleteOrderCar} from "../../redux/actions/a.order.js";
import CarLoader from "./CarLoader.js";
import CheckoutComp from "../../components/Checkout2/CheckoutComp"
import {Snackbar} from '@mui/material';
import {SnackbarAlert} from '../../components/Alert/success';
import accounting from 'accounting'


import {
  Typography,
  Button,
  Divider,
  Modal,
  Box
} from "@mui/material";

export default function Carrito() {

  const items = useSelector((state) => state.addOrdercar);
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

  const temp = localStorage.getItem('products');
  const products = JSON.parse(temp);
  const productsApi = useSelector((state) => state.allProducts);
  
  for (const value of products) {
    for (const iterator of productsApi) {
      if(value.id === iterator._id){
        value.price = iterator.price
        localStorage.setItem('products', JSON.stringify(products))
      } 
    }
  }

  const eventClickCountAdd = (price, id, counter) => {
    handleOpenAlert('Cantidad modificada')
    const updateTemp = products.map((p) => {
      if(p.id === id) {
        p.quanty = counter
        p.amount = price * counter
      }
      return p;
    })
    localStorage.setItem('products', JSON.stringify(updateTemp))
  }

  const eventClickCountRes = (price, id, counter) => { 
    handleOpenAlert('Cantidad modificada')
    const updateTemp = products.map((p) => {
      if(p.id === id) {
        p.quanty = counter
        p.amount = price * counter
      }
      return p;
    })
    localStorage.setItem('products', JSON.stringify(updateTemp))
  }

  const eventClickRemoveItem = (id) => {
    handleOpenAlert('Producto eliminado')
    const filter = products.filter((f) => f.id !== id);
    localStorage.setItem('products', JSON.stringify(filter));
  }

  const removeCarTemp = () => {
    if(!products.length) return
      localStorage.setItem('products', '[]')
      window.location.reload(); 
  }

  const total = products.reduce((sum, item) => sum + item.amount,0);
  const subTotal = (total/1.18);
  const iva = (total-subTotal);

  return (
    <div>
      <NavBar searchBar1={false} />
      <div className="car-container">
        <div className="items-content">
          {products.length ? products.map((item) => {
            return (
              <div key={item.id}>
                <CardItem
                  item={item}
                  eventClickCountAdd={eventClickCountAdd}
                  eventClickCountRes={eventClickCountRes}
                  eventClickRemoveItem={eventClickRemoveItem}
                  id={item.id}
                  quanty={item.quanty}
                  stock={item.stock}
                />
                <Divider/>
              </div>
            );
          }): <CarLoader msg={"Tu carrito esta vacío...!!!"}/>}
        </div>
        <div className="pay-container">
          <div className="content-pay tittle-pay">
            <div className="lb-content">
              <Typography variant="body1">Sub Total:</Typography>
              <Typography variant="body1">Iva:</Typography>
              <Typography variant="body1">Total:</Typography>
            </div>
            <div className="lb-content">
              <Typography variant="body2">{accounting.formatMoney(subTotal, '$')}</Typography>
              <Typography variant="body2">{accounting.formatMoney(iva, '$')}</Typography>
              <Typography variant="body2">{accounting.formatMoney(total, '$')}</Typography>
            </div>
          </div>
          <hr />
          <div className="content-pay btn-pay">
            <Button variant="outlined" size="small" onClick={handleOpen}>
              PAGAR
            </Button>
          </div>
          <div className="content-pay btn-pay">
            <label htmlFor="" className="lbl-removeAllCar" onClick={removeCarTemp}>
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
          <CheckoutComp amount={total}/>
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
