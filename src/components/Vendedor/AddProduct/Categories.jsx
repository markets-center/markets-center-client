import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSelector } from "react-redux";



export default function Categories({ Validation, setError, error, setInput, input }) {
    
    const categories = useSelector(state => state.allCategories)
    let filtered = categories.filter( el => el._id === input.category.find( element =>  el._id === element ) )
    const [categoryId, setCategoryId] = useState('')

    function handleChange(event){
        setCategoryId(event.target.value)
        setInput({
            ...input,
            category: [...input.category, event.target.value]
        })
        setError(Validation({
            ...input,
            category: [...input.category, event.target.value]
        }))
    };

    function deleteCard(e){
        const { value } = e.target
        setInput({
            ...input,
            category: input.category.filter( el => el !== value )
        })
    }
    
    return (
        <FormControl style={{ minWidth: "200px", margin: "5px" }} >
            <InputLabel id="demo-simple-select-helper-label">Seleccione una Categoria</InputLabel>
                <Select
                    error={error.category ? true : false}
                    id="category"
                    value={ categoryId }
                    onChange={handleChange}
                >
                    {
                    categories?.map(element => {
                        return (<MenuItem value={element._id} key={element._id} >{element.name}</MenuItem>)
                    })
                    };
            </Select>
            <div className={styles.selectedDisplay}>
            {
                filtered ? filtered.map( element => {
                    return (
                        <div key={element._id} className={styles.selectCard}>
                            <h4 className={styles.titleCard}>{element.name}</h4>
                            <button value={element._id} className={styles.buttonCard} onClick={deleteCard}>X</button>
                        </div>
                    )
                }) : ""
            }
            </div>
        </FormControl>
    );
}
