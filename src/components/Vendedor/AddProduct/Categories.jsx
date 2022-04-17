import React, {useState } from "react";
// import styles from "./AddProduct.module.css";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSelector } from "react-redux";



export default function Categories({ Validation, setError, error, setInput, input }) {
    
    const categories = useSelector(state => state.allCategories)
    const [selectedCat, setSelectedCat] = useState( [] );
    let filtered = categories.filter( el => el._id === selectedCat.find( element =>  el._id === element ) )

    function handleChange(event){
        setInput({
            ...input,
            category: [...input.category, event.target.value]
        })
        setError(Validation({
            ...input,
            category: [...input.category, event.target.value]
        }))
        setSelectedCat(
            [ ...selectedCat, event.target.value ]
        )
    };
    
    return (
        <div>
            <select onChange={ handleChange }>
                {categories.map((cat) => {
                    return (
                    <option key={cat._id} label={cat.name} value={cat._id} />
                    
                )})}
            </select>
            <div>
            {
                filtered ? filtered.map( element => {
                    return (
                        <div key={element._id}>
                            <h2>{element.name}</h2>
                            <div id={element._id}>X</div>
                        </div>
                    )
                }) : ""
            }
            </div>
        </div>
    );
}

// return (
//     <FormControl style={{ minWidth: "200px", margin: "5px" }} >
//         <InputLabel id="demo-simple-select-helper-label">{input.category.length === 0 ? "Select a Category" : `${input.category.length} selected`}</InputLabel>
//             <Select
//                 error={error.category ? true : false}
//                 id="category"
//                 value={categoryId ? categoryId : ''}
//                 // name={categoryName ? categoryName : ''}
//                 onChange={handleChange}
//             >
//                 {
//                 categories?.map(element => {
//                     return (<MenuItem value={element._id} key={element._id} onClick={pruebaName}>{element.name}</MenuItem>)
//                 })
//                 };
//         </Select>
//         <div>
//         {
//             selectedCat ? selectedCat.map( element => {
//                 return (
//                     <div key={element.id}>
//                         <h2>{element.name}</h2>
//                         <div id={element.id}>X</div>
//                     </div>
//                 )
//             }) : ""
//         }
//         </div>
//     </FormControl>
// );