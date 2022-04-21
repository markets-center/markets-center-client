import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SellerFilter from '../../components/Filters/SellersFilter/SellersFilter';
import Ordenamiento from '../../components/Ordenamiento/Ordenamiento';
import RenderBusquedas from '../../components/RenderBusquedas/RenderBusquedas';


function Shop(props) {
    return (
        <div >
            <NavBar searchBar={true} home={true}/>
            <SellerFilter />
            <div>
                <Ordenamiento />
                <RenderBusquedas />
            </div>
        </div>
    );
}

export default Shop;