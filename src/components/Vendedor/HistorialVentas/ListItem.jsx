import React from 'react';
import styles from './ListItem.module.css'
import DefaultUser from '../../../images/defaultUser.png'

export default function ListItem({element}){
    // console.log(props)
    const clientName = element.userId
    console.log(clientName)
    return (
        <div className={styles.container}>
            <img 
            src={clientName.image} 
            alt='Client' 
            className={styles.image}
            onError={(e)=>{
                e.target.onerror = null
                e.target.src = DefaultUser}}
            />
            <h3>{clientName.name}</h3>
        </div>
    )
}
