import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { ordenamientos, filterByPrice, resetFilterByPrice, filterBySellerAndCategories} from '../../redux/actions/a.products'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';


function Ordenamiento() {
    const dispatch = useDispatch();
    const idSeller = useSelector(state => state.activeSeller);
    const idCategory = useSelector(state => state.activeCategory);
    const [order, setOrder] = React.useState('')
    const [radio, setRadio] = React.useState('');

 
    const handleChange = (event) => {
        event.preventDefault();
        if(event.target.value !== '-'){
            dispatch(ordenamientos(event.target.value));
        }else{
            dispatch(filterBySellerAndCategories(idSeller,""))
        }
        
    };

    const handleChangeRadio = (event) => {
      setRadio(event.target.value);
      console.log(event.target.value)
      dispatch(filterByPrice(event.target.value))
    };
    const handleReset = () => {
        dispatch(resetFilterByPrice())
        dispatch(filterBySellerAndCategories(idSeller,""))

    }
  
  
  
    return (
        <Container  sx={{
            width: "10vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: '35px',
            paddingTop: '10px',
            height: '350px',
        }}>

            <Box sx={{ width: 200}}>
            <FormControl>
            <FormLabel >Precio</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="precio"
                    value={radio}
                    onChange={handleChangeRadio}
                >
                    <FormControlLabel value="0-500" control={<Radio />} label="$0-$5" />
                    <FormControlLabel value="500-1500" control={<Radio />} label="$5-$15" />
                    <FormControlLabel value="1500-3000" control={<Radio />} label="$15-$30" />
                    <FormControlLabel value=">3000" control={<Radio />} label=">$30" />
                </RadioGroup>
            </FormControl>
            <Button variant="outlined" size='small' startIcon={<CachedIcon />} sx={{marginTop: "10px"}} onClick={handleReset}>
                reset
            </Button>
            </Box>
            <FormControl variant="standard" sx={{ m: 2, minWidth: 190 }}>
                <InputLabel>Ordenar</InputLabel>
                <Select
                value={order}
                onChange={handleChange}
                label="Ordenar"
                >
                    <MenuItem value={'-'}>-</MenuItem>
                    <MenuItem value={'high'}>Mayor Precio</MenuItem>
                    <MenuItem value={'low'}>Menor Precio</MenuItem>
                    <MenuItem value={'a-z'}>A-Z</MenuItem>
                    <MenuItem value={'z-a'}>Z-A</MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
}

export default Ordenamiento;