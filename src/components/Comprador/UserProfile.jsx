import React, {useEffect, useState} from "react";
import {useAuth} from '../../context/AuthContext';
import {userHistory} from '../../redux/actions/a.users';
import {useDispatch, useSelector} from 'react-redux';
import { Typography, Container, List, DialogActions, Button } from "@mui/material";
import {Dialog, DialogTitle, DialogContent, DialogContentText} from '@mui/material';
import {Box, IconButton} from '@mui/material';
import HistoryItems from './HistoryItems';
import logo from '../../images/MarketsCenter.png'
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Detail from '../Card/Detail/Detail'

function UserProfile() {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history);
  const { oneUser, currentUser } = useAuth();
  const [openMore, setOpenMore] = useState(false);
  const [openProd, setOpenProd] = useState(false);
  const [oneProduct, setOneProduct] = useState({name:"", price:0, image:"", description:"", stock:"", category:"", id:"", rating:"", numReviews:""});
  // const [delMsg, setDelMsg] = useState('');
  // const [openDelete, setOpenDelete] = useState(false);
  const [detail, setDetail] = useState("");
  function handleOpenMore(items){
    setDetail(items.products)
    setOpenMore(true)
  }
  const handleCloseMore = () => setOpenMore(false);
  const handleCloseProd = () => setOpenProd(false);
  function handleOpenDetail(product) {
    setOneProduct(product)
    setOpenProd(true)
  }

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

  useEffect(() => {
    dispatch(userHistory(oneUser._id, currentUser));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, oneUser._id]);
  return (
    <div>
      <Container maxWidth="md">
        <Typography
          sx={{ mt: 2, mb: 2, display: "block" }}
          variant="h4"
          component="div"
        >
          Historial de Compras
        </Typography>
        <List sx={{ display: "block" }} dense={false}>
          {!history.length ? (
            <Typography
              sx={{ mt: 4, mb: 2, display: "block" }}
              variant="h4"
              component="div"
              color="secondary"
            >
              Historial de compras vacío
            </Typography>
          ) : (
            history.map((item) => (
              <HistoryItems
                handleOpenMore={handleOpenMore}
                key={item._id}
                item={item}
              />
            ))
          )}
        </List>
      </Container>
      <Dialog
        open={openMore}
        onClose={handleCloseMore}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ minwidth: "500px" }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="alert-dialog-title"
        >
          <img src={logo} alt="" style={{ padding: "10px", width: "40px" }} />
          {"Detalle de la compra"}
        </DialogTitle>
        <DialogContent>
          {detail.length > 0 &&
            detail.map((p) => (
              <DialogContentText
                key={p.productId._id}
                sx={{ display: "block" }}
                id="alert-dialog-description"
              >
                <Container
                  sx={{
                    height: "60px",
                    width: "400px",
                    margin: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      height: "max-content",
                    }}
                  >
                    <img
                      src={p.productId?.image}
                      alt=""
                      style={{ padding: "10px", width: "50px" }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        margin: "10px 0px",
                      }}
                    >
                      {`${p.productId?.name}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        margin: "10px 0px",
                      }}
                    >
                      {`$ ${p.productId?.price}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      component="span"
                      sx={{
                        margin: "10px 0px",
                      }}
                    >
                      {`${p.quantity} u.`}
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => handleOpenDetail(p.productId)}
                      sx={{ padding: "20px" }}
                      edge="end"
                      aria-label="delete"
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Box>
                </Container>
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMore} autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openProd}
        onClose={handleCloseProd}
        PaperProps={{
          sx: {
            minWidth: 900,
            minHeight: 450
          }
        }}
      >
        <Detail viewRev={true} name={oneProduct.name} price={oneProduct.price} image={oneProduct.image} description={oneProduct.description} stock={oneProduct.stock} category={oneProduct.category} id={oneProduct._id} rating={oneProduct.rating} numReviews={oneProduct.numReviews} />
      </Dialog>
      </div>
  );
}
export default UserProfile;
