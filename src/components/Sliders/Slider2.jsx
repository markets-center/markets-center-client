import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import Carousel from 'react-elastic-carousel'
import Card from '../Card/Card.jsx';
import { getAllProducts } from '../../redux/actions/a.products.js';
import './Slider.css'

export default function Sliders() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.allProducts)
   useEffect(() => {
       dispatch(getAllProducts())
   }, [dispatch]);

   console.log(products)
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
           {products?.map(producto => (
               <Card 
               name={producto.name}
               price={producto.price}
               image={producto.image}
               description={producto.description}
               stock={producto.stock}
               category={producto.category.map(c => c.name)}
               />
           ))}
       </Carousel>
        
    </Container>

)}
