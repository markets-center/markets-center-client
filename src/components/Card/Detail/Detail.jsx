import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import s from './Detail.module.css'
import { addOrderCar } from '../../../redux/actions/a.order.js';
import Tooltip from '@mui/material/Tooltip';
import Review from "../review/Review";
import { Box, Modal } from "@mui/material";
import AddReview from '../review/AddReview';
import useLocalStorage from '../../../pages/Carrito/useLocalStorage.js';
import accounting from 'accounting'

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

export default function Detail({ name, price, image, description, stock, category, id, rating, numReviews }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tooltip, setTooltip] = useState(false);

    const items = useSelector((state) => state.addOrdercar);
    const dispatch = useDispatch();
    const [product, setProduct] = useLocalStorage("products", '');

    const findItem = items.find((f) => f.id === id);

    function addToCar(id, price, name, image) {
        const obj = { id, name, price, image, quanty: 1, amount: price };
        if (findItem) {
            return setTooltip(true);
        }
        dispatch(addOrderCar(obj));
    }

    useEffect(() => {
        return !findItem? setProduct(items) : product
    }, [items])

    return (
        <div className={s.container}>
            <div className={s.image}>
                {stock > 0 ? <img src={image} width="400px" height='400px' alt="producto" className={s.img} /> :
                    <img src={image} width="400px" height='400px' alt="producto" className={s.imgSinStock} />}
            </div>
            <div className={s.info}>
                <Typography variant="h5" className={s.name}>{name}{stock > 0 ? <DeliveryDiningIcon fontSize="medium" color="info" className={s.delivery} /> : <DeliveryDiningIcon fontSize="medium" color="disable" className={s.delivery} />}</Typography>
                <Typography variant="h6" className={s.price}>{accounting.formatMoney(price,'$')}</Typography>

                {stock > 0 ? <Typography variant="body2" className={s.stock}> Stock: {stock}ud.</Typography> :
                    <Typography variant="body2" className={s.stock} color="secondary" sx={{ fontWeight: '600' }}> SIN STOCK</Typography>}

                <div className={s.description}>
                    <Typography variant="" >{description}</Typography>
                </div>
                <div className={s.description}>
                    <Review rating={rating} text={`${numReviews} reviews`} />
                </div>
                <div className={s.description}>
                    <Button variant="outlined" size="small" color="info" onClick={handleOpen} >Escribe una reseña</Button>
                </div>
                {/* <div className={s.buttons}>
                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={addToCart}> agregar</Button>
                </div> */}
            </div>
            <div className={s.buttons}>
                {stock > 0 ? <Tooltip title={!tooltip ? "Add" : "Added to cart"} arrow placement="top">
                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={() => addToCar(id, price, name, image)}> agregar</Button>
                </Tooltip> :
                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} disabled> agregar</Button>
                }</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* addReview */}
                    <AddReview id={id} />
                </Box>
            </Modal>
        </div>
    );
}

