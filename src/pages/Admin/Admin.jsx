import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { Snackbar } from '@mui/material'
import { SnackbarAlert } from '../../components/Alert/success';
import { delAlert } from '../../redux/actions/a.alert';

import NavBar from '../../components/NavBar/NavBar.jsx'
import Categorias from '../../components/Admin/Categorias/Categorias.jsx'
import Usuarios from '../../components/Admin/Usuarios/Usuarios.jsx'
import Ventas from '../../components/Admin/Ventas/Ventas.jsx'
import Orden from '../../components/Admin/Orden/orden'


export default function Admin() {
    const alert = useSelector((state) => state.alert);
    const [value, setValue] = useState('Categorias');
    const dispatch = useDispatch()


    function handleClose() {
        dispatch(delAlert())
    }


    return (
        <div>
            <NavBar admin={true} value={value} setValue={setValue} carrito={false} />
            {
                value === "Ventas" &&
                <Ventas />
            }
            {
                value === "Usuarios" &&
                <Usuarios />
            }
            {
                value === "Categorias" &&
                <Categorias />
            }
            {
                value === "Ordenes" &&
                <Orden />
            }
            <Snackbar open={!!alert} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <SnackbarAlert onClose={handleClose} color='primary' variant='filled' severity='success'>
                    {alert}
                </SnackbarAlert>
            </Snackbar>
        </div>
    )
}