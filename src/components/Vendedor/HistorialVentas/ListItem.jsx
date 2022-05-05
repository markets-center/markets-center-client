import React from 'react';


import styles from './ListItem.module.css'
import DefaultUser from '../../../images/defaultUser.png'
import { IconButton, Tooltip } from '@mui/material'
import { AddBox, LocalShipping } from '@mui/icons-material'

export default function ListItem({element, id, openMore, detail, handleDespachar, handleOpenMore, handleCloseMore}){
    const clientName = element.userId
    return (
        <>
        {
            clientName !== null &&
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
                        
                        <Tooltip title="Despachar" arrow>
                        <IconButton
                        onClick={()=>handleDespachar(id)}
                        >
                            <LocalShipping />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Detalle" arrow>
                        <IconButton onClick={()=>handleOpenMore(element)}>
                            <AddBox />
                        </IconButton>
                        </Tooltip>
                    </div>
                </div>
        }
        </>
    )
}
