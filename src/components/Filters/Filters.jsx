import React from 'react';
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

// import AppBar from '@mui/material/AppBar/';
// import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
import { Tabs, Tab } from '@mui/material/'
import Select from '../../components/Admin/Select/Select.jsx'


export default function Filters({home, admin, value, setValue}){
    const [value2, setValue2] = useState('one');
    function handleChange(event, newValue){
        setValue2(newValue);
    };
    return (
        <>
        {
            home &&
            <Tabs
                value={value2}
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
            
        }
        {   
            admin &&
            <Select value={value} setValue={setValue} />
        }
        </>
    )
}