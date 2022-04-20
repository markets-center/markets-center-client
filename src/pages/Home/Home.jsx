import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar.jsx'

import Slider2 from '../../components/Sliders/Slider2.jsx';
import SellerFilter from './../../components/Filters/SellersFilter/SellersFilter';
import RenderBusquedas from '../../components/RenderBusquedas/RenderBusquedas.jsx';





export default function Home (){
    const [render, setRender] = useState(false)
    const productsSearched = useSelector(state => state.searchedProducts);
    const initialProducts = useSelector(state => state.allProducts);

    setTimeout(function(){
        if(productsSearched.length < initialProducts.length){
            setRender(true)
        }
        if(productsSearched.length === initialProducts.length){
            setRender(false)
        }
    }, 10);
    

    return (
        <div>
            <NavBar searchBar={true} home={true}/>
            <SellerFilter />
            {render?<RenderBusquedas />:<Slider2 />}
        </div>
    )
}