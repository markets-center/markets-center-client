import React from 'react';
import Ordenamiento from '../Ordenamiento/Ordenamiento';
import RenderBusquedas from '../RenderBusquedas/RenderBusquedas';
import Container from '@mui/material/Container';


function Shop(props) {
    return (
        <div>
            <Container maxWidth="xl" sx={{

                display: "flex",
                
            }}>
                <Ordenamiento />
                <RenderBusquedas />
            </Container>
        </div>
    );
}

export default Shop;