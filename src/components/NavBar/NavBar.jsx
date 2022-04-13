import React from 'react';
import SearchBar from './SearchBar.jsx'
import Logo from '../../images/MC-Full.png'
import styles from './NavBar.module.css'

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Stack } from '@mui/material/'
import {ShoppingCart, AccountCircle } from '@mui/icons-material';



export default function NavBar(){

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                    <IconButton cursor="pointer">
                        <img src={Logo} alt="Logo" className={styles.logo} />
                    </IconButton>

                    <SearchBar />

                <Stack direction="row">
                    <IconButton
                        variant="contained"
                        color="white"
                        to="/usuer"
                    >
                        <AccountCircle fontSize="large"/>
                    </IconButton>

                    <IconButton
                        variant="contained"
                        color="white"
                        to="/usuer"
                    >
                        <ShoppingCart fontSize="large"/>
                    </IconButton>
                </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

