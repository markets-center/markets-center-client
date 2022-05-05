import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Modal, Typography, Button, Tooltip } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import s from './Detail.module.css'
import Review from "../review/Review";
import Commentary from "../review/Commentary/Commentary"
import AddReview from '../review/AddReview';
import useLocalStorage from '../../../pages/Carrito/useLocalStorage.js';
import accounting from 'accounting';
import { useAuth } from '../../../context/AuthContext.js';
import { getOrUpdateCart } from '../../../redux/actions/a.cart.js';
import CancelIcon from '@mui/icons-material/Cancel';
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

export default function Detail({ name, price, image, description, stock, category, id, rating, numReviews, viewRev, reviews, onClose }) {
    const countItemCarUser = useSelector((state) => state.addOrdercar);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tooltip, setTooltip] = useState(false);

    const dispatch = useDispatch();
    const { currentUser } = useAuth();
    const idCarUser = currentUser && currentUser.uid;

    const [productsTemp, setProductsTemp] = useLocalStorage('productsTemp', '');
    const [productsUser, setProductsUser] = useLocalStorage('productsUser', '');
    const allProductsDb = useSelector((state) => state.allProducts);
    const orderCarUser = useSelector((state) => state.addOrdercar);

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
            if (repeatItemTemp) return setTooltip(true);
            setProductsTemp([...itemTemp, ...items]);
        } else {
            const repeatItemUser = orderCarUser.products.find((f) => f.productId._id === id);
            if (repeatItemUser) return setTooltip(true);
            setProductsUser([...itemUser, ...items]);
        }
        dispatch(setAlert('Producto agregado al carrito'))
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
        <div className={s.container}>
            <CancelIcon color="secondary" className={s.back} onClick={onClose} />
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
                        {viewRev && <div className={s.review}>
                            <Button variant="outlined" size="small" color="info" onClick={handleOpen} >Escribe una reseña</Button>
                        </div>}
                    </div>
                </div>
                <Commentary user={reviews} />
                <div className={s.buttons}>
                    {stock > 0 ? !viewRev && <Tooltip title={!tooltip ? "Add" : "Added to cart"} arrow placement="top">
                        <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={() => addToCar(id, price, name, image, stock)}> agregar</Button>
                    </Tooltip> :
                        !viewRev && <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} disabled> agregar</Button>
                    }</div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddReview id={id} setOpen={setOpen} reviews={reviews} />
                </Box>
            </Modal>
        </div>
    );
}

