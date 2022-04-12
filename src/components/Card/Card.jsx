import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import s from './Card.module.css'


export default function CardProduct(name, price,image, description){ //deberia recibir props para renderizar segun los productos
   
    const [hover,setHover] = useState(false); 

    function moreInfo(e){
        setHover(true)
    }
    function lessInfo(e){
        setHover(false)
    }
    function addToCart(){
        //funcion que agrega el producto al carrito
        console.log('agregado')
    }
    return (
        <div onMouseEnter={moreInfo} onMouseLeave={lessInfo} className={s.container}>
            <div className={s.img}>
                <img src={image} width="200px" alt="producto"/>
            </div>
            <div className={s.infoContainer}>
                <Typography variant="h6" >
                   {name}
                </Typography>
                <div className={s.priceAndButton}>
                    <Typography variant="subtitle1" className={s.price}>
                        {price}
                    </Typography>  
                    <div className={s.icons}> 
                        <IconButton color="primary" size="small" onClick={addToCart} > 
                            <AddShoppingCartIcon fontSize="medium" variant="contained"/>
                        </IconButton>
                        <IconButton  color="info" size="small"> 
                            <DeliveryDiningIcon fontSize="medum"/>
                        </IconButton>
                    </div>
                </div>
                {hover?<div> 
                    <Typography variant="body2" className={s.description}>{description} </Typography>
                    </div>:""}
            </div>
        </div>
        

    )
}