import React from 'react';

import { Tabs, Tab } from '@mui/material/'


export default function Home ({ value, setValue }){
    function handleChange(event, newValue){
        setValue(newValue);
    };
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant='fullWidth'
        >
            <Tab value="Ventas" label="Ventas" />
            <Tab value="Categorias" label="Categorias" />
            <Tab value="Usuarios" label="Usuarios" />
            <Tab value="Ordenes" label="Ordenes" />
        </Tabs>
    )
}