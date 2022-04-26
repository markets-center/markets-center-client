import React from 'react';


import styles from './ListItem.module.css'
import DefaultUser from '../../../images/defaultUser.png'
import { IconButton } from '@mui/material'
import { AddBox } from '@mui/icons-material'

export default function ListItem({element, openMore, detail, handleOpenMore, handleCloseMore}){
    const clientName = element.userId
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img 
                src={clientName.image} 
                alt='Client' 
                className={styles.image}
                onError={(e)=>{
                    e.target.onerror = null
                    e.target.src = DefaultUser}}
                />
                <div>
                    <h3>{clientName.name}</h3>
                    <p>Mail: {clientName.email}</p>
                    <p>Tel: {clientName.phone}</p>
                </div>
            </div>
            <div className={styles.right}>
                <p>{`Estado: ${element.status}`}</p>
                <p>{`Total: $${element.amount}`}</p>
                <IconButton onClick={()=>handleOpenMore(element)}>
                    <AddBox />
                </IconButton>
            </div>
        </div>
    )
}
