import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SellerCard from './SellerCard';
import { Container } from '@mui/material';
import { getAllSellers } from '../../../redux/actions/a.seller';
import style from './SellersFilter.module.css'

function SellersFilter() {
    const dispatch = useDispatch();
    const allSellers = useSelector((state) => state.allSellers);

    useEffect(() =>{
        dispatch(getAllSellers())
    },[dispatch])

    return (
        <Container className={style.container}>
            {allSellers && allSellers.map(d => <SellerCard key={d._id} name={d.name.slice(0,10)} image={d.image} id={d._id}/>)
            }
        </Container>
    );
}

export default SellersFilter;