import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useAuth} from '../../context/AuthContext'
import {getFavs} from '../../redux/actions/a.favs';
import { Container } from '@mui/material';
import Carousel from 'react-elastic-carousel'
import Card from '../Card/Card.jsx';
import { getAllProducts } from '../../redux/actions/a.products.js';
import './Slider.css'
import Typography from '@mui/material/Typography';
import Mc from '../../images/MarketsCenter.png'
import s from './Slider2.module.css'
import Error from '../Error/Error'
import Loading from '../../components/Loading/Loading';
import {getOrUpdateCart} from '../../redux/actions/a.cart.js';
import useLocalStorage from '../../pages/Carrito/useLocalStorage.js';

export default function Sliders2() {
    const dispatch = useDispatch();
    const {currentUser} = useAuth();
    const loading = useSelector(state => state.loading)
    const products = useSelector(state => state.allProducts)

    const idCarUser = currentUser && currentUser.uid;
    const [productsTemp, setProductsTemp] = useLocalStorage('productsTemp','');
    const orderCarUser = useSelector((state) => state.addOrdercar);

    function compareToItem(array1, array2) {
        const compare = array1.map((val) => {
            array2.forEach((comp, index) => {
                if(val.productId._id === comp.productId){
                    val.quantity = (val.quantity+comp.quantity);
                    array2.splice(index, 1);
                }
            })
            return val
        })
        const newItem = compare.map((c) => {
            return {
                productId: c.productId._id,
                name: c.productId.name,
                image: c.productId.image,
                price: c.productId.price,
                stock: c.productId.stock,
                quantity: c.quantity,
                amount: c.productId.price
            }
        })
        return [...newItem, ...array2]
    }

    useEffect(() => {
        if(orderCarUser.hasOwnProperty('products')){
            const itemTemp = JSON.parse(localStorage.getItem('productsTemp'))
            if(orderCarUser.products.length && itemTemp.length){
                const compareToDb = compareToItem(orderCarUser.products, itemTemp)
                const oldAmount = compareToDb.reduce((sum, val) => sum+(val.price*val.quantity), 0)
                const newAmount = itemTemp.reduce((sum, val) => sum+(val.price*val.quantity), 0)
                dispatch(getOrUpdateCart({ 
                    idUser: idCarUser,
                    products: compareToDb,
                    amount: oldAmount
                }, currentUser));
                setProductsTemp([]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        currentUser && dispatch(getFavs(currentUser))
        dispatch(getAllProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 768, itemsToShow: 4 },
        { width: 1200, itemsToShow: 4 }
    ];

    const bebidas = products.filter(p => p.category[0].name === 'Bebidas');

    const almacen = products.filter(p => p.category[0].name === 'Almacen');

    const congelados = products.filter(p => p.category[0].name === 'Congelados');

    const lacteos = products.filter(p => p.category[0].name === 'Lacteos');

    const mascotas = products.filter(p => p.category[0].name === 'Mascotas');

    const rating = products.filter(p => p.rating > 4);


    return (
        <Container>
            {loading ? <Loading /> :
                products ?
                    <Container>
                        <Container sx={{
                            marginTop: '60px',
                            marginBottom: '60px'
                        }}>
                            <Typography variant="h4" className={s.titleSlider}>
                                Destacados<img src={Mc} alt="mc" className={s.imgTitleSlider} />
                            </Typography>
                            <Carousel breakPoints={breakPoints} >
                                {rating.length > 0 ? rating?.map((producto, idx) => (
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
                                        reviews={producto.reviews}
                                    />
                                )): <Loading/>}
                            </Carousel>

                        </Container>
                        <Container sx={{
                            marginTop: '60px',
                            marginBottom: '60px'
                        }}>
                            <Typography variant="h4" className={s.titleSlider} >
                                Bebidas<img src={Mc} width="30px" alt="mc" className={s.imgTitleSlider} />
                            </Typography>
                            <Carousel breakPoints={breakPoints} >
                                {bebidas.length > 0 ?bebidas?.map((producto, idx) => (
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
                                        reviews={producto.reviews}
                                    />
                                )): <Loading/>}
                            </Carousel>

                        </Container>
                        <Container sx={{
                            marginTop: '60px',
                            marginBottom: '60px'
                        }}>
                            <Typography variant="h4" className={s.titleSlider}>
                                Almacen<img src={Mc} width="30px" alt="mc" className={s.imgTitleSlider} />
                            </Typography>
                            <Carousel breakPoints={breakPoints} >
                                {almacen.length > 0 ? almacen?.map((producto, idx) => (
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
                                        reviews={producto.reviews}
                                    />
                                )): <Loading/>}
                            </Carousel>
                        </Container>
                        <Container sx={{
                            marginTop: '60px',
                            marginBottom: '60px'
                        }}>
                            <Typography variant="h4" className={s.titleSlider}>
                                Lacteos<img src={Mc} alt="mc" className={s.imgTitleSlider} />
                            </Typography>
                            <Carousel breakPoints={breakPoints} >
                                {lacteos.length > 0 ? lacteos?.map((producto, idx) => (
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
                                        reviews={producto.reviews}
                                    />
                                )): <Loading/>}
                            </Carousel>

                        </Container>
                        <Container sx={{
                            marginTop: '60px',
                            marginBottom: '60px'
                        }}>
                            <Typography variant="h4" className={s.titleSlider}>
                                Congelados<img src={Mc} alt="mc" className={s.imgTitleSlider} />
                            </Typography>
                            <Carousel breakPoints={breakPoints} >
                                {congelados.length > 0 ? congelados?.map((producto, idx) => (
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
                                        reviews={producto.reviews}
                                    />
                                )): <Loading/>}
                            </Carousel>

                        </Container>
                        <Container sx={{
                            marginTop: '60px',
                            marginBottom: '60px'
                        }}>
                            <Typography variant="h4" className={s.titleSlider}>
                                Mascotas<img src={Mc} alt="mc" className={s.imgTitleSlider} />
                            </Typography>
                            <Carousel breakPoints={breakPoints} >
                                {mascotas.length > 0 ? mascotas?.map((producto, idx) => (
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
                                        reviews={producto.reviews}
                                    />
                                )): <Loading/>}
                            </Carousel>

                        </Container>
                    </Container>
                    : products.length && !loading &&
                    <Error message='No se encontraron los productos' mistake={false} />
            }
        </Container>

    )
}
