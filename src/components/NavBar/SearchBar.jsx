import React from 'react';
import { Stack, TextField, Button } from '@mui/material';

export default function NavBar(){
    return (
        <Stack spacing={1} direction="row" size="medium">
            <TextField variant='outlined'/>
            <Button variant='contained' >Search</Button>
        </Stack>
    )
}