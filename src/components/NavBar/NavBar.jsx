import React from 'react';
import styles from './NavBar.module.css'
import SearchBar from './SearchBar.jsx'
import Logo from '../../images/MC-Full.png'
import Avatar from '@mui/material/Avatar';
import Person from '@mui/icons-material/Person';
//
import Filters from '../Filters/Filters.jsx';
//

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import {ShoppingCart, AccountCircle, } from '@mui/icons-material';
import { resetSliders } from '../../redux/actions/a.products'
import { useDispatch } from 'react-redux';
import { IconButton, Stack, Box } from '@mui/material/'
import { Logout } from '@mui/icons-material';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu } from '@mui/material'
import { Divider, ListItemIcon, MenuItem } from '@material-ui/core';

export default function NavBar({ searchBar, home, admin, value, setValue }){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { logout, oneUser, currentUser } = useAuth();
    console.log(currentUser);

    async function logoutHandler() {
        await logout();
        navigate('/')
    }

    function handleSelect(){
        navigate('/');
        dispatch(resetSliders())
    }
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.target);
        console.log("Holla soy el click")
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                    <IconButton cursor="pointer" onClick={handleSelect}>
                        <img src={Logo} alt="Logo" className={styles.logo} />
                    </IconButton>
                    {
                        searchBar &&
                        <SearchBar />
                    }

                    <Stack direction="row">
                        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                            <IconButton
                                size="small"
                                sx={{ ml: 2 }}
                                variant="contained"
                                color="white"
                                onClick={() => navigate('/Carrito')}
                            >
                                <LocalGroceryStoreOutlinedIcon sx={{ width: 33, height: 33, cursor: 'pointer' }} />
                            </IconButton>
                            <IconButton variant="contained"
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                                <Avatar
                                    src={oneUser.image ? oneUser.image : '/broken-image.jpg'}
                                    sx={{ width: 33, height: 33, cursor: 'pointer' }}
                                />
                            </IconButton>

                            <Menu anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgColor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                <MenuItem onClick={() => navigate('/Login')}>
                                    <ListItemIcon>
                                        <Person fontSize="small" />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                {
                                    currentUser === null ? undefined :
                                        <>
                                            <Divider />
                                            <MenuItem onClick={logoutHandler}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Cerrar sesión
                                            </MenuItem>
                                        </>

                                }

                            </Menu>
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>

            <Filters home={home} admin={admin} value={value} setValue={setValue}/>
        </AppBar>
    )
}

