import styles from './CardCategorias.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../redux/actions/a.category.js'
import { IconButton } from '@mui/material'
import { Delete, BorderColor } from '@mui/icons-material/';

export default function CardCategorias (){
    const categories = useSelector(state => state.allCategories)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])
    return (
        <div className={styles.mainDiv}>
            {
                categories.map(category => {
                    return (
                        <div key={category._id} className={styles.item}>
                            <div className={styles.left}>
                                <img src={category.image} alt="Imagen de categoria"/>
                                <h4>{category.name}</h4>
                            </div>
                            <div className={styles.right}>
                                <IconButton>
                                    <BorderColor />
                                </IconButton>
                                <IconButton>
                                    <Delete />
                                </IconButton>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}