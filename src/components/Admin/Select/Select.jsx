import React, {useState} from 'react';

import { Tabs, Tab } from '@mui/material/'


export default function Home ({ value, setValue }){
    // const [value, setValue] = useState('Categorias');
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
            <Tab value="Categorias" label="Categorias" />
            <Tab value="Usuarios" label="Usuarios" />
        </Tabs>
    )
}