import React from 'react';
import styles from './Usuario.module.css'
import { Button } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import CardUsuarios from '../CardUsuarios/CardUsuarios.jsx'

export default function Usuarios(){

    return (
        <div>
            <div className={styles.header}>
                <h3>Lista de Usuarios</h3>
                <Button variant="contained" color="info" startIcon={<AddBox />} > Agregar una categoria</Button>
            </div>
            <CardUsuarios />
        </div>
    )
}