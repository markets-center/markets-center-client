import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './RenderBusquedas.module.css';

function RenderBusquedas() {
    const products = useSelector(state => state.searchedProducts)
    const filtered = useSelector(state => state.filteredByPrice)
    return (

            <div className={s.container}>
                {filtered.length > 0?filtered.map(p => <Card 
                key={p.name}
                name={p.name}
                price={p.price}
                image={p.image}
                description={p.description}
                stock={p.stock}
                category={p.category.map(c => c.name)}
                />):products.map(p => <Card 
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