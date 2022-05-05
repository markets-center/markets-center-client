import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useAuth } from '../../context/AuthContext'
import NavBar from "../../components/NavBar/NavBar";
import { getFavsDetails } from "../../redux/actions/a.favs";
import FavCard from "../../components/Favoritos/FavCard";
import { List, Typography } from "@mui/material";
import Style from './Favoritos.module.css';
import { delFavDetail } from '../../redux/actions/a.favs'
import { setAlert, delAlert } from '../../redux/actions/a.alert';
import { Snackbar } from '@mui/material';
import { SnackbarAlert } from '../../components/Alert/success';
import Loading from '../../components/Loading/Loading'


function Favoritos() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const favsDetail = useSelector((state) => state.favsDetail, shallowEqual);
  const loading = useSelector((state) => state.loading);
  const alert = useSelector((state) => state.alert);


  function handleClose() {
    dispatch(delAlert())
  }


  function delFavs(id) {
    dispatch(delFavDetail(id, currentUser));
    dispatch(setAlert('Producto eliminado de favoritos'));
  };

  useEffect(() => {
    dispatch(getFavsDetails(currentUser));
  }, [dispatch, currentUser]);
  return (
    <div>
      <NavBar home={false} carrito={true} />
      <div className={Style.container}>
        <List
          sx={{ width: "100%", maxWidth: 700, bgcolor: "background.paper" }}
        >
          {loading?<Loading/>:favsDetail.length < 1 ?
            <div className={Style.noFav}>
              <Typography
                sx={{ mt: 4, mb: 2, display: "block" }}
                variant="h4"
                component="div"
                color="secondary"
              >
                Aún no tienes Favoritos
              </Typography></div> :
            favsDetail.map((d) => (
              <FavCard
                key={d._id}
                name={d.name}
                description={d.description}
                image={d.image}
                rating={d.rating}
                id={d._id}
                stock={d.stock}
                price={d.price}
                category ={d.category}
                numReviews={d.numReviews}
                reviews={d.reviews}
                delF={delFavs}
              />
            ))}
        </List>
      </div>
      <Snackbar open={!!alert} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}>
        <SnackbarAlert onClose={handleClose} color='primary' variant='filled' severity='success'>
          {alert}
        </SnackbarAlert>
      </Snackbar>
    </div>
  );
}

export default Favoritos;
