import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import {ordenamientos, filterByPrice, resetFilterByPrice, filterBySellerAndCategories, idActiveCategory, ordenamientosFiltered, idActiveSeller} from '../../redux/actions/a.products'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import CachedIcon from '@mui/icons-material/Cached';
import style from './Ordenamiento.module.css'


function Ordenamiento() {
    const dispatch = useDispatch();
    const idSeller = useSelector(state => state.activeSeller);
    const filtered = useSelector(state => state.filteredByPrice);
    const allCategories = useSelector(state => state.allCategories)
/*     const idCategory = useSelector(state => state.activeCategory); */
    const [order, setOrder] = React.useState('');
    const [categoria, setCategoria] = React.useState('')
    const [radio, setRadio] = React.useState('');

 
    const handleChange = (event) => {
        event.preventDefault();
        setOrder(event.target.value);
        if(filtered.length === 0){
            if(event.target.value !== '-'){
                dispatch(ordenamientos(event.target.value));
            }else{
                dispatch(filterBySellerAndCategories(idSeller,""))
            }
        }
        else{
            if(event.target.value !== '-'){
                dispatch(ordenamientosFiltered(event.target.value));
            }else{
                dispatch(filterBySellerAndCategories(idSeller,""))
            }
        }

        
    };
    const handleChangeCategory = (e, newValue) => {
        e.preventDefault()
        setCategoria(e.target.value);
        dispatch(idActiveCategory(e.target.value))
        if(idSeller){
          dispatch(filterBySellerAndCategories(idSeller, e.target.value));
        }else{
          dispatch(filterBySellerAndCategories("", e.target.value));
          dispatch(idActiveSeller())
        }
      };

    const handleChangeRadio = (event) => {
      setRadio(event.target.value);
      dispatch(filterByPrice(event.target.value))
    };
    const handleReset = () => {
        dispatch(resetFilterByPrice())
        dispatch(filterBySellerAndCategories(idSeller,""))

    }
  
  
  
    return (
        <Container className={style.container}>

            <Box className={style.boxPrecio}>
            <FormControl>
            <FormLabel sx={{color: 'black'}}>Precio</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="precio"
                    value={radio}
                    onChange={handleChangeRadio}
                >
                    <FormControlLabel value="0-500" control={<Radio size="small"/>} label="$0-$5" />
                    <FormControlLabel value="500-1500" control={<Radio size="small"/>} label="$5-$15" />
                    <FormControlLabel value="1500-3000" control={<Radio size="small"/>} label="$15-$30" />
                    <FormControlLabel value=">3000" control={<Radio size="small"/>} label=">$30" />
                </RadioGroup>
            </FormControl>
            <Button variant="outlined" size='small' startIcon={<CachedIcon />} sx={{marginTop: "10px"}} onClick={handleReset}>
                reset
            </Button>
            </Box>
            <FormControl variant="standard" className={style.form}>
                <InputLabel>Categoría</InputLabel>
                <Select
                value={categoria}
                onChange={handleChangeCategory}
                label="Categoria"
                >
                    {
                        allCategories?.map(element => {
                          return (<MenuItem key={element._id} onClick={handleChangeCategory} value={element.name}>{element.name}</MenuItem>)
                        })
                      }
                </Select>
            </FormControl>
            <FormControl variant="standard" className={style.form} >
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