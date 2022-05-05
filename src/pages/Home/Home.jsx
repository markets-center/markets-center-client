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
    
    const [productsTemp, setProductsTemp] = useLocalStorage('productsTemp','');
    const [productsUser, setProductsUser] = useLocalStorage('productsUser','');
    
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
    
    useEffect(() => {
        if (!localStorage.getItem('productsTemp')||!localStorage.getItem('productsUser')) {
            setProductsTemp([]);
            setProductsUser([]);
        }
        firstTime && handleOpenModal()
        dispatch(getAllSellers())
        setSelected(allSellers[Math.floor(Math.random() * allSellers.length)])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productsUser,productsTemp])
    
    return (
        <div>
            <NavBar searchBar={true} home={true} carrito={true} handleOpenModal={handleOpenModal}/>
            <SellerFilter />
            {render ? <Shop /> : <Slider2 />}

            <Snackbar open={!!alert} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{
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