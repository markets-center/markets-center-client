import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByName } from '../../redux/actions/a.products.js'

import { Stack, TextField, IconButton, Paper, outlinedInputClasses, styled, FormControl } from '@mui/material';
import { Search } from '@mui/icons-material';
import style from './NavBar.module.css'

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "white"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "white"
    },
});

export default function NavBar(){
    const searchedProducts = useSelector(state => state.searchedProducts)
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    
    function onImputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }

    function onSubmit(e){
        e.preventDefault()
        dispatch(getProductByName(search))
    }
    
    useEffect(() => {
        dispatch(getProductByName(search))
    }, [dispatch, search])

    return (
        <FormControl onSubmit={onSubmit}>
            <Stack spacing={1} direction="row" size="large">
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                >
                <StyledTextField  
                    className={style.place}  
                    onChange={onImputChange}
                    placeholder="Buscar por nombre..."
                    size='small' 
                    color="white"
                    style = {{width: 700}}
                    inputProps={{ style: { color: '#005BAA' } }}
                />
                <IconButton 
                    type="submit"
                    variant='outlined' 
                    color='primary' 
                >
                    <Search />
                </IconButton>

                </Paper>
            </Stack>
        </FormControl>
    )
}