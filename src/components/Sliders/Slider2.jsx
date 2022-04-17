import React, { useState } from 'react'
import { Container } from '@mui/material';
import Carousel from 'react-elastic-carousel'
import Card from '../Card/Card.jsx';
import './Slider.css'



export default function Sliders() {
    const productos = [{nombre:'Leche',marca:'La Serenisima',urlImg:'https://www.casa-segal.com/wp-content/uploads/2020/04/leche-3-porciento-la-serenisima-sachet-rojo-1-lt-lacteos-casa-segal-mendoza.png',precio:'150'},
    {nombre:'Harina',marca:'Pureza',urlImg:'https://depotexpress.com.ar/tienda/wp-content/uploads/2020/06/HARINA-DE-TRIGO-PUREZA-0000-X-1.png',stock:'30', precio:'100'},
    {nombre:'Fideos Tallarines',marca:'Terrabusi',urlImg:'https://www.modomarket.com/26299-home_default/fideo-terrabusi-tallarin-x-500-gr.jpg',stock:'35',precio:'110'},
    {nombre:'Arroz',marca:'Gallo Oro',urlImg:'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/219/229/products/2411-60543d41464f3ddd5515988782714569-640-0.jpg',stock:'50',precio:'110'},
    {nombre:'Azucar',marca:'Ledesma',urlImg:'https://www.conradomarket.com.ar/images/000000000000100164048ALMACEN-Azucar-Ledesma-x-1-kg1.jpg',stock:'10',precio:'100'},
    {nombre:'Yerba',marca:'Taragüi',urlImg:'https://http2.mlstatic.com/D_NQ_NP_794896-MLA44134710145_112020-O.jpg',stock:'20',precio:'190'},
    {nombre:'Azucar',marca:'Ledesma',urlImg:'https://www.conradomarket.com.ar/images/000000000000100164048ALMACEN-Azucar-Ledesma-x-1-kg1.jpg',stock:'10',precio:'100'},
{nombre:'Yerba',marca:'Taragüi',urlImg:'https://http2.mlstatic.com/D_NQ_NP_794896-MLA44134710145_112020-O.jpg',stock:'20',precio:'190'}]

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];


  return (
    <Container sx={{
        height: '400px',
    }}>
       <Carousel breakPoints={breakPoints} >
           {productos.map(producto => (
               <Card 
               name={producto.nombre}
               price={producto.precio}
               image={producto.urlImg}
               description={producto.marca}
               stock={producto.stock}
               />
           ))}
       </Carousel>
        
    </Container>

)}
