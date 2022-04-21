import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './RenderBusquedas.module.css';

function RenderBusquedas() {
    const products = useSelector(state => state.searchedProducts)
    return (

            <div className={s.container}>
                {products && products.map(p => <Card 
                key={p.name}
                name={p.name}
                price={p.price}
                image={p.image}
                description={p.description}
                stock={p.stock}
                category={p.category.map(c => c.name)}
                />)}
            </div>

    );
}

export default RenderBusquedas;