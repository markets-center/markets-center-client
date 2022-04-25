import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './RenderBusquedas.module.css';
import Error from '../Error/Error';
import Loading from '../../components/Loading/Loading';

function RenderBusquedas() {
    const loading = useSelector(state => state.loading)
    const products = useSelector(state => state.searchedProducts)
    const filtered = useSelector(state => state.filteredByPrice)
    return (
            <div className={s.container}>
                 {
                loading ? <Loading /> :
                products.length || filtered.length ?
                filtered.length > 0?filtered.map(p => <Card 
                key={p.name}
                name={p.name}
                price={p.price}
                image={p.image}
                description={p.description}
                stock={p.stock}
                rating={p.rating}
                numReviews={p.numReviews}
                category={p.category.map(c => c.name)}
                id={p._id}
                rating={p.rating}
                numReviews={p.numReviews}
                />):products.map(p => <Card 
                    key={p.name}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    description={p.description}
                    stock={p.stock}
                    category={p.category.map(c => c.name)
                    }
                    id={p._id}
                    rating={p.rating}
                    numReviews={p.numReviews}
                    />)
                    :
                    <Error message='El vendedor no tiene productos' mistake={false} />
            }
            </div>

    );
}

export default RenderBusquedas;