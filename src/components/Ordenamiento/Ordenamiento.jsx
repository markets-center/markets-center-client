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
import { orderByPrice, orderByAlph, filterByPrice } from '../../redux/actions/a.products'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


function Ordenamiento() {
    const dispatch = useDispatch();
    const [order, setOrder] = React.useState('');
    const [alph, setAlph] = React.useState('');
    const [radio, setRadio] = React.useState('');

 
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

    const handleChangeRadio = (event) => {
      setRadio(event.target.value);
      console.log(event.target.value)
      dispatch(filterByPrice(event.target.value))
    };
  
  
  
    return (
        <Container  sx={{
            width: "10vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>

            <Box sx={{ width: 190, paddingTop: "40px"}}>
            <FormControl>
            <FormLabel >Precio</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="precio"
                    value={radio}
                    onChange={handleChangeRadio}
                >
                    <FormControlLabel value="0-500" control={<Radio />} label="$0-$500" />
                    <FormControlLabel value="500-1500" control={<Radio />} label="$500-$1500" />
                    <FormControlLabel value="1500-3000" control={<Radio />} label="$1500-$3000" />
                    <FormControlLabel value=">3000" control={<Radio />} label=">$3000" />
                </RadioGroup>
            </FormControl>
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