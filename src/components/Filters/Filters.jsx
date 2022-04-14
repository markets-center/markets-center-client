import React from 'react';
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

// import AppBar from '@mui/material/AppBar/';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
import { Tabs, Tab } from '@mui/material/'


export default function Filters(){
    const [value, setValue] = useState('one');
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
            <Tab value="Category select" label="Category select" />
            <Tab value="one" label="Item One" />
            <Tab value="two" label="Item Two" />
            <Tab value="three" label="Item Three" />
        </Tabs>
    )
}