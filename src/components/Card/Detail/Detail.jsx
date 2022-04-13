import React from "react";
import Typography from '@mui/material/Typography';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import s from './Detail.module.css'
export default function Detail(name, price,image, description, stock) {
    function addToCart(){
        //funcion que agrega el producto al carrito
        console.log('agregado')
    }
    return (
        <div className={s.container}>
            <div className={s.image}>
                <img src="https://ferreira.vteximg.com.br/arquivos/ids/226134-588-588/to_21871.jpg?v=636615531533330000" width="400px" alt="producto"/>
            </div>
            <div className={s.info}>
                <Typography variant="h5" className={s.name}> Zapatillas Topper <DeliveryDiningIcon fontSize="medium" color="info" className={s.delivery}/></Typography>
                <Typography variant="h6" className={s.price}> $1000</Typography>
                <Typography variant="body2" className={s.stock}> Stock: 3 ud.</Typography>
                <div className={s.description}>
                    <Typography variant="" > Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut a dolorem sapiente quasi molestiae at suscipit, ullam illo impedit. Aut, minima? Ratione autem cumque eum voluptatem, voluptatum recusandae officiis odit!</Typography>
                </div>
                <div className={s.buttons}>
                    <Button variant="contained" color="info" endIcon={<AddShoppingCartIcon />} onClick={addToCart}> agregar</Button>
                </div>
            </div>
        </div>
    );
}

