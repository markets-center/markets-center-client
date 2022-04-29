import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from "react";
import Card from '../Card/Card';
import s from './RenderBusquedas.module.css';
import Error from '../Error/Error';
import Loading from '../../components/Loading/Loading';
import Paginado from './Paginado';

function RenderBusquedas() {
    const loading = useSelector(state => state.loading)
    const products = useSelector(state => state.searchedProducts)
    const filtered = useSelector(state => state.filteredByPrice)
    const [current, setCurrent] = useState(1);

    const indexLast = current * 13;
    const indexFirst = indexLast - 13;
    const currentProducts = products.slice(indexFirst, indexLast);
    const currentFiltered = filtered.slice(indexFirst, indexLast);

    return (
            <div className={s.container}>
                 {
                loading ? <Loading /> :
                products.length || filtered.length ?
                filtered.length > 0?
                <div className={s.container2}>
                    <div className={s.productsContainer}>
                        {currentFiltered.map(p => <Card 
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
                        />)}
                    </div>
                    <Paginado products={filtered} setCurrent={setCurrent} current={current}/>
                </div>
                :
                <div className={s.container2}>
                    <div className={s.productsContainer}>
                        {currentProducts.map(p => <Card 
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
                        />)}
                    </div>
                    <Paginado products={products} setCurrent={setCurrent} current={current}/>     
                </div>
                :
                <Error message='El vendedor no tiene productos' mistake={false} />
            }
            </div>

    );
}

export default RenderBusquedas;