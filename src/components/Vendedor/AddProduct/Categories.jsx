import React, {useState, useEffect} from "react";
// import styles from "./AddProduct.module.css";
import { getAllCategories } from '../../../redux/actions/a.category.js'
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";



export default function Categories(props) {
    const dispatch = useDispatch()
    const [category, setCategory] = useState('');
    const categories = useSelector(state => state.allCategories)

    useEffect(()=> {
        dispatch(getAllCategories());
    },[dispatch])
    console.log(categories.data)
    function handleChange(event){
        setCategory( event.target.value );
    };
    
    return (
        <FormControl style={{ minWidth: "200px", margin: "5px" }}>
            <InputLabel id="demo-simple-select-helper-label">Categorias</InputLabel>
                <Select
                    id="categoySelect"
                    value={category}
                    label="Catgorias"
                    onChange={handleChange}
                >
                    {
                    categories.length > 0 && categories.data.map(element => {
                        return (<MenuItem value={element.name}>{element.name}</MenuItem>)
                    })
                    };
            </Select>
        </FormControl>
    );
}