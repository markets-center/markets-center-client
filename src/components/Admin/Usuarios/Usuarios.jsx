import React from 'react';
import styles from './Usuario.module.css'
import CardUsuarios from '../CardUsuarios/CardUsuarios.jsx'

export default function Usuarios(){

    return (
        <div>
            <div className={styles.header}>
                <h3>Lista de Usuarios</h3>
            </div>
            <CardUsuarios />
        </div>
    )
}