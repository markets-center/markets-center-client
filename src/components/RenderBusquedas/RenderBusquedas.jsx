import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import Loading from '../../components/Loading/Loading';
import s from './RenderBusquedas.module.css';
import Error from '../Error/Error';

function RenderBusquedas() {
    const loading = useSelector(state => state.loading)
    const products = useSelector(state => state.searchedProducts)
    return (
<<<<<<< Updated upstream
        <div className={s.supremeContainer}>
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
=======
        <div className={s.container}>
            {
                loading ? <Loading /> :
                products.length || filtered.length ?

                    filtered.length > 0 ? filtered.map(p => <Card
                        key={p.name}
                        name={p.name}
                        price={p.price}
                        image={p.image}
                        description={p.description}
                        stock={p.stock}
                        category={p.category.map(c => c.name)}
                    />) : products.map(p => <Card
                        key={p.name}
                        name={p.name}
                        price={p.price}
                        image={p.image}
                        description={p.description}
                        stock={p.stock}
                        category={p.category.map(c => c.name)}
                    />)
                    :
                    <Error message='El vendedor no tiene productos' mistake={false} />
            }
>>>>>>> Stashed changes
        </div>
    );
}

export default RenderBusquedas;