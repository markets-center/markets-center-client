import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SellerCard from './SellerCard';
import { Container } from '@mui/material';
import { getAllSellers } from '../../../redux/actions/a.seller';

function SellersFilter() {
    const dispatch = useDispatch();
    const allSellers = useSelector((state) => state.allSellers);

    useEffect(() =>{
        dispatch(getAllSellers())
    },[dispatch])

    function handleSelect(e){
        e.preventDefault();
        console.log('hola')
        //dispatch(getAllProductsFrom(e.target.value))  Esta action lo que deberia hacer es filtrar los productos existentes por los productos que venda el vendedor selecionado
    }
    return (
        <Container sx={{
            marginTop: '30px',
            height: '130px',
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'space-around',
        }}>
            {allSellers && allSellers.map(d => <div onClick={handleSelect} value={d.value} key={d.name}><SellerCard name={d.name.slice(0,10)} image={d.image} /></div>)
            }
        </Container>
    );
}

export default SellersFilter;