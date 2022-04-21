import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, upgradeUser, deleteUser } from '../../../redux/actions/a.admin.js';
import { useAuth } from '../../../context/AuthContext.js'
import { IconButton } from '@mui/material';
import styles from './CardUsuarios.module.css';
import { Delete, AdminPanelSettings, Storefront, PersonOutline, SupervisorAccount, Cached } from '@mui/icons-material/';
import defaultImage from '../../../images/defaultUser.png';

export default function CardCategorias (){
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsers)
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])
    const { blockPass } = useAuth();
    async function handlePasswordReset(event){
        event.preventDefault()
        await blockPass()
        
    }
    function handleUserToAdmin(event){
        dispatch(upgradeUser(event.currentTarget.getAttribute('id')))
    }
    function handleUserdelete(event){
        dispatch(deleteUser(event.currentTarget.getAttribute('id')))
    }
    
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
                                {
                                    category.isAdmin ? <AdminPanelSettings />   : (
                                        category.isSeller ? <Storefront /> : <PersonOutline />
                                    )
                                }
                            </div>
                            <div className={styles.right}>
                                <IconButton 
                                    onClick={handlePasswordReset}
                                >
                                    <Cached />
                                </IconButton>
                                <IconButton
                                    id={category._id}
                                    onClick={handleUserToAdmin}
                                >
                                    <SupervisorAccount />
                                </IconButton>
                                <IconButton
                                    id={category._id}
                                    onClick={handleUserdelete}
                                >
                                    <Delete />
                                </IconButton>
                            </div>
                        </div>
                    )
                })
            }
            {/* <Menu open={open}/> */}
        </div>
    )
}