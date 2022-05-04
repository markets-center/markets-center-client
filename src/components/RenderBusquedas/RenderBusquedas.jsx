
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext'
import { getFavs } from '../../redux/actions/a.favs';
import { useState } from "react";

import Card from '../Card/Card';
import s from './RenderBusquedas.module.css';
import Error from '../Error/Error';
import Loading from '../../components/Loading/Loading';
import Paginado from './Paginado';

function RenderBusquedas() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading)
    const products = useSelector(state => state.searchedProducts)
    const filtered = useSelector(state => state.filteredByPrice)

    const idSeller = useSelector(state => state.activeSeller)
    const nameCategory = useSelector(state => state.activeCategory)
    const [current, setCurrent] = useState(1);
    const [seller, setSeller] = useState(idSeller);
    const [category, setCategory] = useState(nameCategory);
    const indexLast = current * 15;
    const indexFirst = indexLast - 15; 
    const currentProducts = products.slice(indexFirst, indexLast);
    const currentFiltered = filtered.slice(indexFirst, indexLast);
    // const favs = useSelector(state => state.favs)
    const { currentUser } = useAuth();
    useEffect(() => {
        currentUser && dispatch(getFavs(currentUser))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (idSeller !== seller) {
        setSeller(idSeller)
        setCurrent(1);
    }
    if (nameCategory !== category) {
        setTimeout(function () {
            setCategory(nameCategory);
            setCurrent(1);
        }, 1)

    }

    if (filtered[0]) {
        setTimeout(function () {
            setCurrent(1)
        }, 1)
    }

    return (
        <div className={s.container}>
            {
                loading ? <Loading /> :
                    products.length || filtered.length ?
                        filtered.length > 0 ?
                            <div>
                                <Paginado products={filtered} setCurrent={setCurrent} current={current} />
                                <div className={s.container2}>

                                    <div className={s.productsContainer}>
                                        {currentFiltered.map(p => <Card
                                            reviews={p.reviews}
                                            key={p._id}
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
                                </div>
                            </div>
                            :
                            <div>
                                <Paginado products={products} setCurrent={setCurrent} current={current} />
                                <div className={s.container2}>

                                    <div className={s.productsContainer}>
                                        {currentProducts.map(p => <Card
                                            reviews={p.reviews}
                                            key={p._id}
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
                                </div>
                            </div>
                        :
                        <Error message='No se encuentran disponibles los productos' mistake={false} />

            }
        </div>

    );
}

export default RenderBusquedas;