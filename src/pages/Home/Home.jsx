import React from 'react';
import NavBar from '../../components/NavBar/NavBar.jsx'
import SearchBar from '../../components/NavBar/SearchBar.jsx'
import Sliders from '../../components/Sliders/Sliders.jsx';



export default function Home (){

    return (
        <div>
            <NavBar searchBar1={true}/>
            <Sliders />
        </div>
    )
}