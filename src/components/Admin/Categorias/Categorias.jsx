import React from 'react';
import styles from './Categorias.module.css'
import { Button } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import CardCategorias from '../CardCategorias/CardCategorias.jsx'


export default function Categorias(){

    return (
        <div>
            <div className={styles.header}>
                <h3>Lista de categorias</h3>
                <Button variant="contained" color="info" startIcon={<AddBox />} > Agregar una categoria</Button>
            </div>
            <CardCategorias />
        </div>
    )
}