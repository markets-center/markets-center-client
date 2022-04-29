import React, { useEffect } from 'react';
import styles from './Ventas.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { allOrders } from '../../../redux/actions/a.admin.js'

import Tabla from './Tabla/Tabla.jsx'
import Grafico from './Grafico/Grafico.jsx'

export default function Ventas (){
    const history = useSelector(state => state.history)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allOrders())
    }, [dispatch])
    return (
        <div className={styles.container}>
            <Grafico history={history}/>
            <Tabla history={history}/>
        </div>
    )
}