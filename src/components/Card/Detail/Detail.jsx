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
import Commentary from "../review/Commentary/Commentary"
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

export default function Detail({ name, price, image, description, stock, category, id, rating, numReviews, viewRev, reviews }) {
    // let user = [{
    //     name: 'Jorge',
    //     rating: 2.5,
    //     review: 'Buenardo fasdfasdfsfafsfdasdfasfsafdsfsafsafasfasf',
    //     fecha: 'Jan 9, 2014'
    // },
    // {
    //     name: 'Luis',
    //     rating: 1,
    //     review: 'Buenardo fasdfasdfsfafsfdasdfasfsafdsfsafsafasfasf',
    //     fecha: "Sep 9, 2019"
    // },
    // {
    //     name: 'Manuel',
    //     rating: 2.5,
    //     review: 'Buenardo fasdfasdfsfafsfdasdfasfsafdsfsafsafasfasf',
    //     fecha: "Mar 7, 3014"
    // },
    // {
    //     name: 'Lucia',
    //     rating: 3,
    //     review: 'Buenardo fasdfasdfsfafsfdasdfasfsafdsfsafsafasfasf',
    //     fecha: "Dec 19, 2024"
    // },
    // {
    //     name: 'Wanda',
    //     rating: 5,
    //     review: 'Buenardo fasdfasdfsfafsfdasdfasfsafdsfsafsafasfasfs simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop pu',
    //     fecha: "Jul 10, 2004"
    // },{
    //     name: 'Foca',
    //     rating: 2,
    //     review: 'Buenardo fasdfasdfsfafsfdasdfasfsafdsfsafsafasfasf',
    //     fecha: "Jun 4, 2008"
    // }]

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tooltip, setTooltip] = useState(false);

    const items = useSelector((state) => state.addOrdercar);
    const dispatch = useDispatch();
    const [product, setProduct] = useLocalStorage("products", '');

    const findItem = product.find((f) => f.id === id);

    function addToCar(id, price, name, image, stock) {
        const obj = { id, name, price, image, quanty: 1, amount: price, stock };
        if (findItem) {
            return setTooltip(true);
        }
        dispatch(addOrderCar(obj));
    }

    useEffect(() => {
        return items.length ? setProduct(items) : product
    }, [items])

    return (
        <div className={s.container}>
            <div className={s.image}>
                {stock > 0 ? <img src={image} alt="producto" className={s.img} /> :
                    <img src={image} alt="producto" className={s.imgSinStock} />}
            </div>
            <div className={s.info}>
                <Typography variant="h5" className={s.name}>{name}{stock > 0 ? <DeliveryDiningIcon fontSize="medium" color="info" className={s.delivery} /> : <DeliveryDiningIcon fontSize="medium" color="disable" className={s.delivery} />}</Typography>
                <Typography variant="h6" className={s.price}>{accounting.formatMoney(price, '$')}</Typography>

                {stock > 0 ? <Typography variant="body2" className={s.stock}> Stock: {stock}ud. <Review rating={rating} size={15}/></Typography> :
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
                    <Commentary user={reviews}/>
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

