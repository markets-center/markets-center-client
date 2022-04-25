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


import {
  Typography,
  Button,
  Divider,
  Modal,
  Box
} from "@mui/material";

export default function Carrito() {

  const products = useSelector((state) => state.addOrdercar);
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

  
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [add, setAdd] = useState(0);

  const findTotal = products.reduce((sum, item) => sum + item.price, 0);

  const eventClickCountAdd = (price) => {
    handleOpenAlert('Cantidad modificada')
    setAdd((prev) => prev + price)
  }
  const eventClickCountRes = (price) => { 
    handleOpenAlert('Cantidad modificada')
    setAdd((prev) => prev - price)
  }
  const eventClickRemoveItem = (id) => {
    handleOpenAlert('Producto eliminado')
    setTotal(findTotal);
    setAdd(0);
    dispatch(deleteOrderCar(id))
  }

  useEffect(() => 
  {
    const subT = (total/1.18);
    const i = (total - subT)
    setIva(i)
    setSubtotal(subT);
    setTotal(findTotal + add);
  },[add, findTotal, total, subtotal, iva]);

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
              <Typography variant="body2">{`$. ${subtotal.toFixed(2)}`}</Typography>
              <Typography variant="body2">{`$. ${iva.toFixed(2)}`}</Typography>
              <Typography variant="body2">{`$. ${total.toFixed(2)}`}</Typography>
            </div>
          </div>
          <hr />
          <div className="content-pay btn-pay">
            <Button variant="outlined" size="small" onClick={handleOpen}>
              PAGAR
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
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
