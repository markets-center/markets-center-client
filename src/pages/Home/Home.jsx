import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar.jsx'
import { delAlert } from '../../redux/actions/a.alert'

import Slider2 from '../../components/Sliders/Slider2.jsx';
import SellerFilter from './../../components/Filters/SellersFilter/SellersFilter';
import Shop from '../../components/Shop/Shop';
import { Snackbar } from '@mui/material';
import { SnackbarAlert } from '../../components/Alert/success';

export default function Home() {
    const [render, setRender] = useState(false)
    const dispatch = useDispatch()
    const productsSearched = useSelector(state => state.searchedProducts);
    const initialProducts = useSelector(state => state.allProducts);
    const alert = useSelector((state) => state.alert);

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
        if (!localStorage.getItem('productsTemp')) {
            localStorage.setItem('productsTemp', '[]')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <NavBar searchBar={true} home={true} carrito={true} />
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

        </div>
    )
}