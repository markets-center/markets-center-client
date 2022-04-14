import React from "react";
import Typography from '@mui/material/Typography';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import s from './Detail.module.css'

export default function Detail({name, price,image, description, stock}) {
    function addToCart(){
        //funcion que agrega el producto al carrito
        console.log('agregado')
    }
    return (
        <div className={s.container}>
            <div className={s.image}>
                <img src={image} width="400px" alt="producto"/>
            </div>
            <div className={s.info}>
                <Typography variant="h5" className={s.name}>{name}<DeliveryDiningIcon fontSize="medium" color="info" className={s.delivery}/></Typography>
                <Typography variant="h6" className={s.price}> ${price}</Typography>
                <Typography variant="body2" className={s.stock}> Stock: {stock}ud.</Typography>
                <div className={s.description}>
                    <Typography variant="" >{description}</Typography>
                </div>
                <div className={s.buttons}>
                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={addToCart}> agregar</Button>
                </div>
            </div>
        </div>
    );
}

