import React from "react";
// import styles from "./AddProduct.module.css";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";



export default function AddProduct(props) {
    const [category, setCategory] = React.useState('');

    function handleChange(event){
        setCategory( event.target.value );
    };
    
    return (
        <FormControl style={{ minWidth: "200px", margin: "5px" }}>
            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                <Select
                    id="categoySelect"
                    value={category}
                    label="Catgorias"
                    onChange={handleChange}
                >  
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            <MenuItem value={50}>lorem dssjkdsjkdbhjdshbjdjkjd</MenuItem>
            </Select>
        </FormControl>
    );
}