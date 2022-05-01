import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useAuth} from '../../context/AuthContext'
import {getFavs} from '../../redux/actions/a.favs';
import Card from '../Card/Card';
import s from './RenderBusquedas.module.css';
import Error from '../Error/Error';
import Loading from '../../components/Loading/Loading';

function RenderBusquedas() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading)
    const products = useSelector(state => state.searchedProducts)
    const filtered = useSelector(state => state.filteredByPrice)
    // const favs = useSelector(state => state.favs)
    const {currentUser} = useAuth();
    useEffect(() => {
        currentUser && dispatch(getFavs(currentUser))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

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