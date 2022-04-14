import React, { useState } from 'react'
import { Container, Typography, Button, IconButton } from '@mui/material';
import Card from '../../components/Card/Card.jsx';
import NavigateNext from '@mui/icons-material/NavigateNext';
import ChevronLeft from '@mui/icons-material/ChevronLeft'



export default function Sliders() {
    const productos = [{nombre:'Leche',marca:'La Serenisima',urlImg:'https://www.casa-segal.com/wp-content/uploads/2020/04/leche-3-porciento-la-serenisima-sachet-rojo-1-lt-lacteos-casa-segal-mendoza.png',precio:'150'},
    {nombre:'Harina',marca:'Pureza',urlImg:'https://depotexpress.com.ar/tienda/wp-content/uploads/2020/06/HARINA-DE-TRIGO-PUREZA-0000-X-1.png',stock:'30', precio:'100'},
    {nombre:'Fideos Tallarines',marca:'Terrabusi',urlImg:'https://www.modomarket.com/26299-home_default/fideo-terrabusi-tallarin-x-500-gr.jpg',stock:'35',precio:'110'},
    {nombre:'Arroz',marca:'Gallo Oro',urlImg:'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/219/229/products/2411-60543d41464f3ddd5515988782714569-640-0.jpg',stock:'50',precio:'110'},
    {nombre:'Azucar',marca:'Ledesma',urlImg:'https://www.conradomarket.com.ar/images/000000000000100164048ALMACEN-Azucar-Ledesma-x-1-kg1.jpg',stock:'10',precio:'100'},
    {nombre:'Yerba',marca:'Taragüi',urlImg:'https://http2.mlstatic.com/D_NQ_NP_794896-MLA44134710145_112020-O.jpg',stock:'20',precio:'190'},
    {nombre:'Azucar',marca:'Ledesma',urlImg:'https://www.conradomarket.com.ar/images/000000000000100164048ALMACEN-Azucar-Ledesma-x-1-kg1.jpg',stock:'10',precio:'100'},
{nombre:'Yerba',marca:'Taragüi',urlImg:'https://http2.mlstatic.com/D_NQ_NP_794896-MLA44134710145_112020-O.jpg',stock:'20',precio:'190'}]

    const [items, setItems] = useState([...productos].splice(0,4))
    const [currentPage, setCurrentPage] = useState(0)

    const nextHandler = () => {
        const totalItems = productos.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * 4;
        
        if(firstIndex === totalItems) return
        setItems([...productos].splice(firstIndex, 4))
        setCurrentPage(nextPage)
        console.log("Next")
    }
    const prevHandler = () => {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * 4;
        if(firstIndex < 0) return
        
        setItems([...productos].splice(firstIndex, 4))
        setCurrentPage(prevPage)
        console.log("Prev")
    }


  return (
    <Container sx={{
        height: '400px',
        display: 'flex',
        alignItem: 'center'
    }}>
        <Container sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'

        }}>
            <Button variant="contained" sx={{
                height: '80px',
                minWidth: '40px',
            }} onClick={prevHandler}>
                <ChevronLeft fontSize="large" />
            </Button>
            {items.length ? items.map(producto => <Card 
                                                name={producto.nombre}
                                                price={producto.precio}
                                                image={producto.urlImg}
                                                description={producto.marca}
                                                stock={producto.stock}
                                                />) : <Typography variant='h5' sx={{margin: 'auto'}}>
                                                        NO HAY PRODUCTOS
                                                    </Typography>}
        <Button variant="contained" sx={{
            height: '80px',
            minWidth: '40px',
        }} onClick={nextHandler}>
               <NavigateNext fontSize="large"/>
        </Button>
        </Container>
    </Container>

)}
