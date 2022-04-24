import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import s from './RenderBusquedas.module.css';
<<<<<<< HEAD
import Error from '../Error/Error';
import Loading from '../../components/Loading/Loading';
=======
>>>>>>> parent of bd7eb33... Changes at Loading and Error component

function RenderBusquedas() {
    const products = useSelector(state => state.searchedProducts)
    const filtered = useSelector(state => state.filteredByPrice)
    return (
<<<<<<< HEAD
=======
        <div className={s.supremeContainer}>
>>>>>>> parent of bd7eb33... Changes at Loading and Error component
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
                category={p.category.map(c => c.name)}
<<<<<<< HEAD
                />):products.map(p => <Card 
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
            </div>

=======
                />)}
            </div>
        </div>
>>>>>>> parent of bd7eb33... Changes at Loading and Error component
    );
}

export default RenderBusquedas;