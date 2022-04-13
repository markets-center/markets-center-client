import React from 'react';
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
    return (
        <Stack spacing={1} direction="row" size="large">
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700 }}
            >
            <StyledTextField  
                placeholder="Buscar por nombre..."
                size='small' 
                color="white"
                style = {{width: 700}}
                inputProps={{ style: { color: '#005BAA' } }}
            />
            <IconButton variant='outlined' color='primary' >
                <Search />
            </IconButton>

    </Paper>
        </Stack>
    )
}