import React from 'react';
import NavBar from '../../components/NavBar/NavBar.jsx'
// import Filters from '../../components/Filters/Filters.jsx'


export default function Home (){
    return (
        <div>
            <NavBar searchBar1={true}/>
            {/* <Filters /> */}
        </div>
    )
}