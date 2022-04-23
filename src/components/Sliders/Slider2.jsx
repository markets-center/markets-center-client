import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import Carousel from 'react-elastic-carousel'
import Card from '../Card/Card.jsx';
import { getAllProducts } from '../../redux/actions/a.products.js';
import './Slider.css'
<<<<<<< Updated upstream
=======
import Typography from '@mui/material/Typography';
import Mc from '../../images/MarketsCenter.png'
import s from './Slider2.module.css'
import Error from '../Error/Error'
import Loading from '../../components/Loading/Loading';

>>>>>>> Stashed changes

export default function Sliders() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loading)
    const products = useSelector(state => state.allProducts)
   useEffect(() => {
       dispatch(getAllProducts())
   }, [dispatch]);

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 768, itemsToShow: 3 },
        { width: 1200, itemsToShow: 4 }
    ];


<<<<<<< Updated upstream
  return (
    <Container sx={{
        height: '400px',
    }}>
       <Carousel breakPoints={breakPoints} >
           {products?.map((producto,idx) => (
               <Card 
               key={idx}
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
=======
    return (
        <Container>
            {loading ? <Loading/> :
            products.length ?
             <Container>
            <Container sx={{
                marginTop: '60px',
                marginBottom: '60px'
            }}>
                <Typography variant="h4" className={s.titleSlider}>
                               Destacados<img src={Mc}   alt="mc" className={s.imgTitleSlider}/>
                            </Typography>
                <Carousel breakPoints={breakPoints} >
                    {products?.map((producto,idx) => (
                        <Card 
                        key={idx}
                        name={producto.name}
                        price={producto.price}
                        image={producto.image}
                        description={producto.description}
                        stock={producto.stock}
                        category={producto.category.map(c => c.name)}
                        id={producto._id}
                        rating={producto.rating}
                        numReviews={producto.numReviews}
                        />
                    ))
                    }
                </Carousel>
            </Container>
            <Container sx={{
                    marginTop: '60px',
                    marginBottom: '60px'
            }}>
                 <Typography variant="h4" className={s.titleSlider} >
                               Bebidas<img src={Mc} width="30px" alt="mc" className={s.imgTitleSlider}/>
                            </Typography>
                <Carousel breakPoints={breakPoints} >
                    {bebidas?.map((producto,idx) => (
                        <Card 
                        key={idx}
                        name={producto.name}
                        price={producto.price}
                        image={producto.image}
                        description={producto.description}
                        stock={producto.stock}
                        category={producto.category.map(c => c.name)}
                        id={producto._id}
                        rating={producto.rating}
                        numReviews={producto.numReviews}
                        />
                    ))}
                </Carousel>
            
            </Container>
            <Container sx={{
                    marginTop: '60px',
                    marginBottom: '60px'
            }}>
                 <Typography variant="h4" className={s.titleSlider}>
                               Cereales y derivados<img src={Mc} width="30px" alt="mc" className={s.imgTitleSlider}/>
                            </Typography>
                <Carousel breakPoints={breakPoints} >
                    {cereales?.map((producto,idx) => (
                        <Card 
                        key={idx}
                        name={producto.name}
                        price={producto.price}
                        image={producto.image}
                        description={producto.description}
                        stock={producto.stock}
                        category={producto.category.map(c => c.name)}
                        id={producto._id}
                        rating={producto.rating}
                        numReviews={producto.numReviews}
                        />
                    ))}
                </Carousel>
            
            </Container>
            </Container>
            :
            <Error message='No se encontraron los productos' mistake={false}/>
            }
      </Container>
  
  )}
>>>>>>> Stashed changes
