import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Stack, TextField, IconButton, Paper } from '@mui/material';
import { outlinedInputClasses, styled } from "@mui/material";
import { Search } from '@mui/icons-material';

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: "white"
    },
  });

  export default function NavBar(){
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault()
        // dispatch(nombreDeLaFunction(search))
    }

    function onImputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }
    
    useEffect(() => {
        // dispatch(nombreDeLaFunction(search))
    }, [dispatch, search])

    return (
        <Stack spacing={1} direction="row" size="large">
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700 }}
            >
            <StyledTextField  
                onChange={onImputChange}
                placeholder="Buscar por nombre..."
                size='small' 
                color="white"
                style = {{width: 700}}
                inputProps={{ style: { color: '#005BAA' } }}
            />
            <IconButton 
                onSubmit={onSubmit}
                variant='outlined' 
                color='primary' 
            >
                <Search />
            </IconButton>

    </Paper>
        </Stack>
    )
}



    