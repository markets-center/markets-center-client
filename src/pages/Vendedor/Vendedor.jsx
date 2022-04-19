import React from 'react';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productBySeller } from '../../redux/actions/a.products.js';
import { useAuth } from '../../context/AuthContext'

import NavBar from '../../components/NavBar/NavBar'
import DatosVendedor from '../../components/Vendedor/DatosVendedor/DatosVendedor'
import CardVendedor from '../../components/Vendedor/CardVendedor/CardVendedor'
import AddProduct from '../../components/Vendedor/AddProduct/AddProduct.jsx'
import { Container, Typography, Button } from '@mui/material'

export default function Vendedor(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const dispatch = useDispatch()
    const { oneUser } = useAuth()

    useEffect(() => {
        dispatch(productBySeller(/* oneUser._id */))
    },[dispatch])
    
    const products = useSelector(state => state.searchedProducts)
    const [listProducts, setListProducts] = useState(products);

    console.log(products)
    
    const removeProduct = (id) => {
        const products = listProducts.filter(product => product._id !== id)
        setListProducts(products)
    }

    return (
        <>
        <NavBar />
        <Container sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <DatosVendedor />
            <Container sx={{
                height: '500px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                borderRadius: '10px',
            }}>
                <Container sx={{
                    height: '70px',
                    margin: '5px 0',
                    display: 'flex',
                    borderBottom: '2px solid black',
                    alignItems: 'center',
                }}>
                    <Typography variant="h6">
                        TUS PRODUCTOS
                    </Typography>
                    <Button 
                        onClick={handleOpen}
                        variant="contained" 
                        color="info" 
                        sx={{
                            left: '760px',
                            fontWeight: '600',
                        }}
                    >
                        Agregar
                    </Button>
                    <AddProduct 
                        open={open}
                        handleClose={handleClose}
                    />
                </Container>
                <Container sx={{
                height: '335px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                overflow: 'auto',
                borderRadius: '10px',
            }}>
                {listProducts.length ? listProducts.map((producto, id) => <CardVendedor 
                                            key={id}
                                            id={producto._id}
                                            nombre={producto.name}
                                            image={producto.image}
                                            stock={producto.stock || "Sin Stock"}
                                            precio={producto.price}
                                            removeProduct={removeProduct}
                                            />) : <Typography variant='h5' sx={{margin: 'auto'}}>
                                                    NO HAY PRODUCTOS
                                                </Typography>}
                </Container>
            </Container>
        </Container>
        </>
    )
}