import React, {useEffect, useState} from "react";
import {useAuth} from '../../context/AuthContext';
import {userHistory} from '../../redux/actions/a.users';
import {useDispatch, useSelector} from 'react-redux';
import { Typography, Container, List, DialogActions, Button } from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText} from '@mui/material';
import {ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import HistoryItems from './HistoryItems';
import logo from '../../images/MarketsCenter.png'



function UserProfile() {
  const dispatch = useDispatch();
  const history = useSelector(state => state.history)
  const {oneUser} = useAuth()
  const [openMore, setOpenMore] = useState(false);
  // const [delMsg, setDelMsg] = useState('');
  // const [openDelete, setOpenDelete] = useState(false);
  const [detail, setDetail] = useState('');
  function handleOpenMore(items){
    setDetail(items.products)
    setOpenMore(true)
  }
  const handleCloseMore = () => setOpenMore(false);

  // function handleOpenCancel(item){
  //   if(item.status === 'Pendiente') {
  //     setDelMsg('Su orden será cancelada. Recibirá un aviso por mail')
  //   } else if (item.status === 'Aceptada') {
  //     setDelMsg('Su orden ya fue aceptada')
  //   } else {
  //     setDelMsg('algo para mostrar')
  //   }
  //   setOpenDelete(true)
  // }
  // const handleCloseCancel = () => setOpenDelete(false);

  useEffect(()=>{
    dispatch(userHistory(oneUser._id))
  },[dispatch, oneUser._id])
  return (
    <div>
      <Container  maxWidth="md">
          <Typography sx={{ mt: 4, mb: 2, display:'block' }} variant="h4" component="div">
            Historial de Compras
          </Typography>
          <List sx={{display: 'block'}} dense={false}>
            {!history.length ? <Typography sx={{ mt: 4, mb: 2, display:'block' }} variant="h4" component="div">
            Historial de compras vacío
          </Typography>:
              history.map(item => <HistoryItems  handleOpenMore={handleOpenMore} key={item._id} item={item} />)
            }
          </List>
      </Container>

      {/* <Dialog
        open={openDelete}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{minwidth: '500px'}}
      >
        <DialogTitle sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}} id="alert-dialog-title">
          <img  src={logo}
                alt=""
                style={{ padding: "10px", width: "40px" }}
                />
          {"Cancelación de compra"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText 
          sx={{display: 'block'}}
          id="alert-dialog-description">
            {delMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog
        open={openMore}
        onClose={handleCloseMore}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{minwidth: '500px'}}
      >
        <DialogTitle sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}} id="alert-dialog-title">
          <img  src={logo}
                alt=""
                style={{ padding: "10px", width: "40px" }}
                />
          {"Detalle de la compra"}
        </DialogTitle>
        <DialogContent>
          {detail.length>0 && detail.map(p=> <DialogContentText 
          key={p.productId._id}
          sx={{display: 'block'}}
          id="alert-dialog-description">
            <ListItem>
              <ListItemAvatar>
          <img  src={p.productId?.image}
                alt=""
                style={{ padding: "10px", width: "50px" }}
                />
              </ListItemAvatar>
              <ListItemText sx={{padding: '20px'}} primary={`${p.productId?.name}`} />
              <ListItemText sx={{padding: '20px'}} primary={`$ ${p.productId?.price}`} />
              <ListItemText sx={{padding: '20px'}} primary={`${p.quantity} u.`} />
            </ListItem>
          </DialogContentText>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMore} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default UserProfile;
