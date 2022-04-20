import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/actions/a.admin.js';

import { IconButton } from '@mui/material';
import styles from './CardUsuarios.module.css';
import { Delete, BorderColor } from '@mui/icons-material/';
import defaultImage from '../../../images/defaultUser.png';

export default function CardCategorias (){
    const allUsers = useSelector(state => state.allUsers)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])
    console.log(allUsers)
    return (
        <div className={styles.mainDiv}>
            {
                allUsers.map(category => {
                    return (
                        <div key={category._id} className={styles.container}>
                            <div className={styles.left}>
                                <img src={category.image} 
                                    alt="Imagen de categoria" 
                                    onError={(e)=>{
                                        e.target.onerror = null
                                        e.target.src = defaultImage}} />
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