import React from 'react';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { orderByPrice, orderByAlph } from '../../redux/actions/a.products'

function Ordenamiento() {
    const dispatch = useDispatch();
    const [order, setOrder] = React.useState('');
    const [alph, setAlph] = React.useState('');
    const [value, setValue] = React.useState([0, 3000]);

    const handleChange2 = (event, newValue) => {
      setValue(newValue);
      console.log(value)
    };    
    const handleChange = (event) => {
        event.preventDefault();
        setOrder(event.target.value);
        dispatch(orderByPrice(event.target.value));
    };
    const handleChangeAlph = (event) => {
        event.preventDefault();
        setAlph(event.target.value);
        dispatch(orderByAlph(event.target.value));
    };
  
  
    return (
        <Container  sx={{
            width: "10vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>

            <Box sx={{ width: 190, paddingTop: "40px"}}>
                <Typography variant="subtitle1">
                    Precio
                </Typography>
                <Slider
                    getAriaLabel={() => 'Precio'}
                    value={value}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    size="medium"
                    min={0}
                    max={5000} 
                    step={100}
                />
            </Box>
            <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                <InputLabel>Ordenar</InputLabel>
                <Select
                value={order}
                onChange={handleChange}
                label="Ordenar"
                >
                <MenuItem >
                    <em>-</em>
                </MenuItem>
                    <MenuItem value={'high'}>Mayor Precio</MenuItem>
                    <MenuItem value={'low'}>Menor Precio</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 2, minWidth: 200 }}>
                <InputLabel>Alfabético</InputLabel>
                <Select
                value={alph}
                onChange={handleChangeAlph}
                label="Alfabetico"
                >
                <MenuItem >
                    <em>-</em>
                </MenuItem>
                    <MenuItem value={'a-z'}>A-Z</MenuItem>
                    <MenuItem value={'z-a'}>Z-A</MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}

export default Ordenamiento;