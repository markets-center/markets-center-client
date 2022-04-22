import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import s from './Detail.module.css'
import {addOrderCar} from '../../../redux/actions/a.order.js';
import Tooltip from '@mui/material/Tooltip';

export default function Detail({name, price,image, description, stock, category, id}) {
    
    const items = useSelector((state) => state.addOrdercar);
    const dispatch = useDispatch();

    const [tooltip , setTooltip] = useState(false);
    
    const findItem = items.find((f) => f.id === id);
    
    function addToCar(id, price, name, image){
        const obj = {id,name,price, image, quanty: 1, amount:price};
        if(findItem){ 
            return setTooltip(true);
        }  
        dispatch(addOrderCar(obj));
    }

    return (
        <div className={s.container}>
            <div className={s.image}>
                {stock > 0?<img src={image} width="400px" height='400px' alt="producto" className={s.img}/>:
                           <img src={image} width="400px" height='400px' alt="producto" className={s.imgSinStock}/>}
            </div>
            <div className={s.info}>
                <Typography variant="h5" className={s.name}>{name}{stock > 0?<DeliveryDiningIcon fontSize="medium" color="info" className={s.delivery}/>: <DeliveryDiningIcon fontSize="medium" color="disable" className={s.delivery}/>}</Typography>
                <Typography variant="h6" className={s.price}> ${price}</Typography>

                {stock > 0?<Typography variant="body2" className={s.stock}> Stock: {stock}ud.</Typography>:
                           <Typography variant="body2" className={s.stock} color="secondary" sx={{fontWeight: '600'}}> SIN STOCK</Typography>}

                <div className={s.description}>
                    <Typography variant="" >{description}</Typography>
                </div>
                {/* <div className={s.buttons}>
                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={addToCart}> agregar</Button>
                </div> */}
            </div>
            <div className={s.buttons}>
                    {stock > 0?<Tooltip title={!tooltip?"Add":"Added to cart"} arrow placement="top">
                                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={() => addToCar(id,price,name,image)}> agregar</Button>
                                </Tooltip>:
                                <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} disabled> agregar</Button> 
                }</div>
        </div>
    );
}

