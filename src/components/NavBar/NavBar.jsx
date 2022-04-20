import React from 'react';
import styles from './NavBar.module.css'
import SearchBar from './SearchBar.jsx'
import Logo from '../../images/MC-Full.png'
//
import Filters from '../Filters/Filters.jsx';
//

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Stack } from '@mui/material/'
import {ShoppingCart, AccountCircle, } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { resetSliders } from '../../redux/actions/a.products'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import { useDispatch } from 'react-redux';

export default function NavBar({searchBar1}){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {logout} = useAuth();

    async function logoutHandler(){
        await logout();
        navigate('/')
    }

    function handleSelect(){
        navigate('/');
        dispatch(resetSliders())
    }

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                    <IconButton cursor="pointer" onClick={handleSelect}>
                        <img src={Logo} alt="Logo" className={styles.logo} />
                    </IconButton>
                    {
                        searchBar1 &&
                        <SearchBar />
                    }

                <Stack direction="row">
                    <IconButton
                        variant="contained"
                        color="white"
                        onClick={() => navigate('/Login')}
                    >
                        <AccountCircle fontSize="large"/>
                    </IconButton>
                    <IconButton
                        variant="contained"
                        color="white"
                        onClick={logoutHandler}
                    >
                        <LogoutIcon fontSize="large"/>
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
            
            <Filters />
            
        </AppBar>
    )
}

