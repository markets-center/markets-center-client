import React from 'react';
import NavBar from '../../components/NavBar/NavBar.jsx'
// import Filters from '../../components/Filters/Filters.jsx'
// import SearchBar from '../../components/NavBar/SearchBar.jsx'
// import Sliders from '../../components/Sliders/Sliders.jsx';
import Slider2 from '../../components/Sliders/Slider2.jsx';
import SellerFilter from './../../components/Filters/SellersFilter/SellersFilter'




export default function Home (){

    return (
        <div>
            <NavBar searchBar1={true}/>
            {/* <Filters /> */}
            <SellerFilter />
            <Slider2 />
        </div>
    )
}