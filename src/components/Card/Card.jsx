import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import s from './Card.module.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Detail from './Detail/Detail'

const style = {
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
};


export default function Card({name, price,image, description, stock}){ //deberia recibir props para renderizar segun los productos
    
    const [hover,setHover] = useState(false); 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
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
                <img src={image} width="200px" height="200px" alt="producto"/>
            </div>
            <div className={s.infoContainer}>
                <Typography variant="h6" >
                    {name}
                </Typography>
                <div className={s.priceAndButton}>
                    <Typography variant="subtitle1" className={s.price}>
                        ${price}
                    </Typography>  
                    <div className={s.icons}> 
                        <IconButton color="primary" size="small" onClick={addToCart} > 
                            <AddShoppingCartIcon fontSize="medium" variant="contained"/>
                        </IconButton>
                        <IconButton  color="info" size="small"> 
                            <DeliveryDiningIcon fontSize=""/>
                        </IconButton>
                    </div>
                </div>
                {hover?<div className={s.hoverInfo}> 
                            <div>
                            {<Typography variant="body2" className={s.description}>Stock: {stock}ud. </Typography>}
                            </div>
                            <Typography variant="body2" className={s.description}>{description}</Typography>
                            <div className={s.masinfo}>
                                <Button  variant="outlined" size="small" color="info" onClick={handleOpen} >más info</Button>
                            </div>
                        </div>:""}
            </div>
            <div>
                
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Detail name={name} price={price} image={image} stock={stock} description={description}/>
                    </Box>
                </Modal>
            </div>
        </div>
        

    )
}