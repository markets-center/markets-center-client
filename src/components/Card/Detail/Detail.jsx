import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import s from './Detail.module.css'
import Tooltip from '@mui/material/Tooltip';
import Review from "../review/Review";
import Commentary from "../review/Commentary/Commentary"
import { Box, Modal } from "@mui/material";
import AddReview from '../review/AddReview';
import useLocalStorage from '../../../pages/Carrito/useLocalStorage.js';
import accounting from 'accounting';
import { useAuth } from '../../../context/AuthContext.js';
import { getOrUpdateCart } from '../../../redux/actions/a.cart.js';
import { setAlert } from "../../../redux/actions/a.alert";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function Detail({ name, price, image, description, stock, category, id, rating, numReviews, viewRev, reviews }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tooltip, setTooltip] = useState(false);

    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    const idCarUser = currentUser && currentUser.uid;
    const [productsTemp, setProductsTemp] = useLocalStorage('productsTemp');
    const allProducts = useSelector((state) => state.allProducts);
    const dataCarUser = useSelector((state) => state.addOrdercar);

    function addToCar(id, price, name, image, stock) {
        const findProduct = allProducts.filter((f) => f._id === id);

        const objCarTemp = findProduct.map((i) => {
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

        if (currentUser) {
            const findRepeatItems = dataCarUser.products.find((f) => f.productId._id === id);
            if (findRepeatItems) return setTooltip(true);
            const oldProducts = dataCarUser.products.map((old) => {
                return {
                    productId: old.productId._id,
                    quantity: 1,
                }
            })
            const newAmount = objCarTemp.reduce((sum, value) => sum + value.amount, 0);
            const obj = {
                idUser: currentUser._delegate.uid,
                products: [...oldProducts, ...objCarTemp],
                amount: dataCarUser.amount + newAmount
            }
            dispatch(getOrUpdateCart(obj, currentUser));
            dispatch(setAlert('Producto agregado al carrito de compras'))
        } else {
            const objTemp = JSON.parse(localStorage.getItem("productsTemp"));
            const findrepeat = objTemp.find((f) => f.productId === id);
            if (findrepeat) return setTooltip(true);
            setProductsTemp([...objTemp, ...objCarTemp]);
        }
    }

    useEffect(() => {
        if (currentUser) return dispatch(getOrUpdateCart({ idUser: idCarUser }, currentUser));
    }, [])

    return (
        <div className={s.container}>
            <div className={s.image}>
                {stock > 0 ? <img src={image} alt="producto" className={s.img} /> :
                    <img src={image} alt="producto" className={s.imgSinStock} />}
            </div>
            <div className={s.info}>
                <Typography variant="h5" className={s.name}>{name}{stock > 0 ? <DeliveryDiningIcon fontSize="medium" color="info" className={s.delivery} /> : <DeliveryDiningIcon fontSize="medium" color="disable" className={s.delivery} />}</Typography>
                <Typography variant="h6" className={s.price}>{accounting.formatMoney(price, '$')}</Typography>

                {stock > 0 ? <Typography variant="body2" className={s.stock}> Stock: {stock}ud. <Review rating={rating} size={15} /></Typography> :
                    <Typography variant="body2" className={s.stock} color="secondary" sx={{ fontWeight: '600' }}> SIN STOCK</Typography>}

                <div className={s.description}>
                    <Typography variant="" >{description}</Typography>
                </div>
                <div className={viewRev && s.ratingAndReview}>
                    <div>
                        {viewRev && <div className={s.description}>
                            <Button variant="outlined" size="small" color="info" onClick={handleOpen} >Escribe una reseña</Button>
                        </div>}
                    </div>
                </div>
                <Commentary user={reviews} />
            </div>
            <div className={s.buttons}>
                {stock > 0 ? !viewRev && <Tooltip title={!tooltip ? "Add" : "Added to cart"} arrow placement="top">
                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={() => addToCar(id, price, name, image, stock)}> agregar</Button>
                </Tooltip> :
                    !viewRev && <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} disabled> agregar</Button>
                }</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddReview id={id} />
                </Box>
            </Modal>
        </div>
    );
}

