import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useAuth} from '../../context/AuthContext'
import {getFavs} from '../../redux/actions/a.favs';
import { Container, Typography, Button } from '@mui/material';
import Card from '../../components/Card/Card.jsx';
import NavigateNext from '@mui/icons-material/NavigateNext';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import { getAllProducts } from '../../redux/actions/a.products.js';




export default function Sliders() {
    const dispatch = useDispatch()
    const favs = useSelector(state => state.favs)
    const {currentUser} = useAuth();
    const products = useSelector(state => state.allProducts.data)
    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getFavs(currentUser))
    }, [dispatch, currentUser]);



    const [items, setItems] = useState([...products].splice(0,4))
    const [currentPage, setCurrentPage] = useState(0)

    const nextHandler = () => {
        const totalItems = products.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * 4;
        
        if(firstIndex === totalItems) return
        setItems([...products].splice(firstIndex, 4))
        setCurrentPage(nextPage)
    }
    const prevHandler = () => {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * 4;
        if(firstIndex < 0) return
        
        setItems([...products].splice(firstIndex, 4))
        setCurrentPage(prevPage)
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
                                                key={producto._id}
                                                name={producto.name}
                                                price={producto.price}
                                                image={producto.image}
                                                description={producto.description}
                                                favs={favs}
                                                stock={producto.stock}
                id={producto._id}
                reviews={producto.reviews}
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
