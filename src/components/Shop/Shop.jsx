import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Ordenamiento from '../Ordenamiento/Ordenamiento';
import RenderBusquedas from '../RenderBusquedas/RenderBusquedas';
import Container from '@mui/material/Container';


function Shop(props) {
    const [change, setChange] = useState(0);
    const productsSearched = useSelector(state => state.searchedProducts);
    let firstProduct;

    setTimeout(function(){
        if(firstProduct !== productsSearched[0]._id){
            setChange(change + 1)
        }
    }, 1)
    return (
        <div>
            <Container maxWidth="xl" sx={{

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