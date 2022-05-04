import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar.jsx'
import { delAlert } from '../../redux/actions/a.alert'

import Slider2 from '../../components/Sliders/Slider2.jsx';
import SellerFilter from './../../components/Filters/SellersFilter/SellersFilter';
import Sugerencia from '../../components/Sugerencia/Sugerencia.jsx'
import { getAllSellers } from '../../redux/actions/a.seller.js';
import { filterBySellerAndCategories } from '../../redux/actions/a.products.js';
import Shop from '../../components/Shop/Shop';
import { Snackbar } from '@mui/material';
import { SnackbarAlert } from '../../components/Alert/success';
import useLocalStorage from '../../pages/Carrito/useLocalStorage';
import {getOrUpdateCart} from '../../redux/actions/a.cart.js';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
    // Seller of the day modal
    let firstTime = JSON.parse(localStorage.getItem('key'))
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = (param) => {
        localStorage.setItem('key', false);
        param && dispatch(filterBySellerAndCategories(param))
        setOpen(false)
    };
    const allSellers = useSelector((state) => state.allSellers);
    const [selected, setSelected] = useState('')
    // 
    const [render, setRender] = useState(false)
    const dispatch = useDispatch()
    const productsSearched = useSelector(state => state.searchedProducts);
    const initialProducts = useSelector(state => state.allProducts);
    const alert = useSelector((state) => state.alert);
    const { currentUser } = useAuth();

    const idCarUser = currentUser && currentUser.uid;
    const [productsTemp, setProductsTemp] = useLocalStorage('productsTemp','');
    const [productsUser, setProductsUser] = useLocalStorage('productsUser','');
    const orderCarUser = useSelector((state) => state.addOrdercar);

    function handleClose() {
        dispatch(delAlert())
    }
    
    setTimeout(function () {
        if (productsSearched.length < initialProducts.length) {
            setRender(true)
        }
        if (productsSearched.length === initialProducts.length) {
            setRender(false)
        }
    }, 1);

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
        if (!localStorage.getItem('productsTemp')||!localStorage.getItem('productsUser')) {
            setProductsTemp([]);
            setProductsUser([]);
            console.log("las veces que entro al home: ")
        }
        firstTime && handleOpenModal()
        dispatch(getAllSellers())
        setSelected(allSellers[Math.floor(Math.random() * allSellers.length)])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productsUser,productsTemp])

    useEffect(() => {
        if(orderCarUser.hasOwnProperty('products')){
            const itemTemp = JSON.parse(localStorage.getItem('productsTemp'))
            if(orderCarUser.products.length && itemTemp.length){
                const compareToDb = compareToItem(orderCarUser.products, itemTemp)
                const newAmount = itemTemp.reduce((sum, val) => sum+(val.price*val.quantity), 0)
                dispatch(getOrUpdateCart({ 
                    idUser: idCarUser,
                    products: compareToDb,
                    amount: orderCarUser.amount + newAmount
                }, currentUser));
                setProductsTemp([]);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            <NavBar searchBar={true} home={true} carrito={true} handleOpenModal={handleOpenModal}/>
            <SellerFilter />
            {render ? <Shop /> : <Slider2 />}

            <Snackbar open={!!alert} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <SnackbarAlert onClose={handleClose} color='primary' variant='filled' severity='success'>
                    {alert}
                </SnackbarAlert>
            </Snackbar>
            <Sugerencia open={open} setOpen={setOpen} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} selected={selected}/>
        </div>
    )
}