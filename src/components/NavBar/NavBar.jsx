import React from 'react';
import styles from './NavBar.module.css'
import SearchBar from './SearchBar.jsx'
import Logo from '../../images/MC-Full.png'

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Stack } from '@mui/material/'
import {ShoppingCart, AccountCircle } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom'


export default function NavBar(){
    const navigate = useNavigate()

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                    <IconButton cursor="pointer" onClick={() => navigate('/')}>
                        <img src={Logo} alt="Logo" className={styles.logo} />
                    </IconButton>

                    <SearchBar />

                <Stack direction="row">
                    <IconButton
                        variant="contained"
                        color="white"
                        onClick={() => navigate('/User')}
                    >
                        <AccountCircle fontSize="large"/>
                    </IconButton>

                    <IconButton
                        variant="contained"
                        color="white"
                        onClick={() => navigate('/Carrito')}
                    >
                        <ShoppingCart fontSize="large"/>
                    </IconButton>
                </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

