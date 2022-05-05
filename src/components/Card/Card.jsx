import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import { setAlert } from '../../redux/actions/a.alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import s from './Card.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Detail from './Detail/Detail'
import { addFav, delFav } from '../../redux/actions/a.favs'
import Tooltip from '@mui/material/Tooltip';
import useLocalStorage from '../../pages/Carrito/useLocalStorage.js';
import accounting from 'accounting'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useAuth } from '../../context/AuthContext';
import { getOrUpdateCart } from '../../redux/actions/a.cart.js';

/* const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
}; */


export default function Card({ name, price, image, description, stock, category, id, rating, numReviews, isFav, reviews }) { //deberia recibir props para renderizar segun los productos

    const [hover, setHover] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tooltip, setTooltip] = useState(false);
    const { currentUser } = useAuth()
    const favs = useSelector(state => state.favs)
    const [favorito, setFavorito] = useState(favs.includes(id));
    const dispatch = useDispatch();
    const idCarUser = currentUser && currentUser.uid;
    const [productsTemp, setProductsTemp] = useLocalStorage('productsTemp', '');
    const [productsUser, setProductsUser] = useLocalStorage('productsUser', '');
    const allProductsDb = useSelector((state) => state.allProducts);
    const orderCarUser = useSelector((state) => state.addOrdercar);

    function moreInfo(e) {
        setHover(true)
    }
    function lessInfo(e) {
        setHover(false)
    }

    const itemTemp = JSON.parse(localStorage.getItem("productsTemp"));
    const itemUser = JSON.parse(localStorage.getItem("productsUser"));

    function addToCar(id, price, name, image, stock) {
        const findProductDb = allProductsDb.filter((f) => f._id === id);
        const items = findProductDb.map((i) => {
            return {
                productId: i._id,
                name: i.name,
                image: i.image,
                price: i.price,
                stock: i.stock,
                quantity: 1,
                amount: i.price
            }
        })
        if (!idCarUser) {
            const repeatItemTemp = itemTemp.find((f) => f.productId === id);
            if (repeatItemTemp) return setTooltip(false);
            setProductsTemp([...itemTemp, ...items]);
        } else {
            const repeatItemUser = orderCarUser.products.find((f) => f.productId._id === id);
            if (repeatItemUser) return setTooltip(true);
            setProductsUser([...itemUser, ...items]);
        }
        dispatch(setAlert('Producto agregado al carrito'))
    }

    function addFavs() {
        if (currentUser) {
            dispatch(addFav(id, currentUser))
            dispatch(setAlert('Agregado a favorito'))
            setFavorito(true)
        } else {
            dispatch(setAlert('Debes estar logueado para agregar favoritos'))
        }
    }

    function delFavs() {
        dispatch(delFav(id, currentUser))
        dispatch(setAlert('Producto eliminado de favoritos'))
        setFavorito(false)
    }

    useEffect(() => {

        if (currentUser && itemUser.length) {
            if (orderCarUser.hasOwnProperty('products')) {
                const newAmount = itemUser.reduce((sum, val) => sum + (val.price * val.quantity), 0)
                dispatch(getOrUpdateCart({
                    idUser: idCarUser,
                    products: [...orderCarUser.products, ...itemUser],
                    amount: orderCarUser.amount + newAmount
                }, currentUser));
                setProductsUser([]);
            } else {
                dispatch(getOrUpdateCart({
                    idUser: idCarUser,
                    products: itemUser,
                    amount: itemUser.reduce((sum, val) => sum + (val.price * val.quantity), 0)
                }, currentUser));
                setProductsUser([]);
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsTemp, productsUser])

    return (
        <div onMouseEnter={moreInfo} onMouseLeave={lessInfo} className={s.container}>
            <div>{favorito ? <IconButton onClick={delFavs}><Favorite color="primary" /></IconButton> : <IconButton onClick={addFavs}><FavoriteBorder color="primary" /></IconButton>}</div>
            <div className={s.img}>
                {stock > 0 ? <img src={image} width="200px" height="200px" alt="producto" /> :
                    <img src={image} width="200px" height="200px" alt="producto" className={s.sinStock} />}
            </div>
            <div className={s.infoContainer}>
                <Typography variant="h6" >
                    {name}
                </Typography>
                <div className={s.priceAndButton}>
                    {hover ? <div className={s.masinfo}>
                        <Button variant="outlined" size="small" color="info" onClick={handleOpen} >más info</Button>
                    </div> :
                        <Typography variant="subtitle1" className={s.price}>
                            {accounting.formatMoney(price, '$')}
                        </Typography>}
                    <div className={s.icons}>
                        {stock > 0 ? <IconButton color="primary" size="small" onClick={() => {
                            addToCar(id, price, name, image, stock)
                        }} >
                            <Tooltip title={!tooltip ? "Add" : "Added to cart"} arrow placement="top">
                                <AddShoppingCartIcon fontSize="medium" variant="contained" />
                            </Tooltip>
                        </IconButton> :
                            <IconButton size="small" disabled >
                                <AddShoppingCartIcon fontSize="medium" variant="contained" />
                            </IconButton>

                        }
                        {stock > 0 ?
                            <DeliveryDiningIcon fontSize="" color="info" size="small" sx={{ paddingBottom: '.3vh' }} />
                            :
                            <IconButton color="disable" size="small">
                                <DeliveryDiningIcon fontSize="" />
                            </IconButton>
                        }
                    </div>
                </div>
            </div>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={s.detail} /* sx={style} */>
                        <Detail viewRev={false} name={name} price={price} image={image} stock={stock} description={description} category={category} id={id} rating={rating} numReviews={numReviews} reviews={reviews} onClose={handleClose} />
                    </Box>
                </Modal>
            </div>
        </div>


    )
}