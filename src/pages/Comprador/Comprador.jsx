import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from '../../components/Comprador/UserProfile'
import UserData from '../../components/Comprador/UserData'
import NavBar from '../../components/NavBar/NavBar'
import {Snackbar} from '@mui/material'
import {SnackbarAlert} from '../../components/Alert/success'
import {delAlert} from '../../redux/actions/a.alert';


export default function Comprador(){
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch()

    function handleClose(){
        dispatch(delAlert())
    }



    return (
        <div>
            <NavBar searchBar1={true} />
            <UserData />
            <UserProfile />
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