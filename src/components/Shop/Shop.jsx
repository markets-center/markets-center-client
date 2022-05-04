import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Ordenamiento from '../Ordenamiento/Ordenamiento';
import RenderBusquedas from '../RenderBusquedas/RenderBusquedas';
import Container from '@mui/material/Container';
import s from './Shop.module.css'

function Shop() {
    const [change, setChange] = useState(0);
    const productsSearched = useSelector(state => state.searchedProducts);


    return (
        <div>
            <Container maxWidth="xl" className={s.containerShop}>
                <Ordenamiento />
                <RenderBusquedas />
            </Container>
        </div>
    );
}

export default Shop;