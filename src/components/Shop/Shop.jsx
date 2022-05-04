import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Ordenamiento from '../Ordenamiento/Ordenamiento';
import RenderBusquedas from '../RenderBusquedas/RenderBusquedas';
import Container from '@mui/material/Container';
import s from './Shop.module.css'

function Shop() {
    const [change, setChange] = useState(0);
    const productsSearched = useSelector(state => state.searchedProducts);
    let firstProduct;


    console.log('searchedproducts =>', productsSearched);
    console.log('firstProduct =>', firstProduct);
    return (
        <div>
            <Container maxWidth="xl" className={s.containerShop} sx={{

                display: "flex",
                marginTop: '50px',
                
            }}>
                <Ordenamiento />
                <RenderBusquedas />
            </Container>
        </div>
    );
}

export default Shop;