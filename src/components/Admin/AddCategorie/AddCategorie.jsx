import React, { useState, useEffect } from "react";
// import { useDispatch } from 'react-redux';
// import { adminAddCategory } from '../../../redux/actions/a.admin.js'
// import { adminUpdateCategory } from '../../../redux/actions/a.admin.js'

import styles from './AddCategori.module.css'
import { Modal, Typography, TextField, Box, Button, styled } from "@mui/material";
import { AddAPhoto, Publish } from '@mui/icons-material/';


const Input = styled('input')({
    display: 'none',
});

export default function AddCategorie({open, handleClose, input, setInput, id, handleSubmit}) {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: 'row',
    };
    
    // const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState({
        name: "Error"
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        });
        setError(Validation({
            ...input,
            [e.target.id]: e.target.value
        }))
    }

    const Validation = (input) => {
        let errorData = {
            name: "Error",
        }
        if (/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.name) && input.name.length > 0) delete errorData.name;
        return errorData;
    }

    function handleImageChange(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setInput({
                ...input,
                image: reader.result
            });
        };
    }
    useEffect(()=>{
        Object.keys(error).length > 0 ? setDisabled( true ) : setDisabled( false )
    }, [error])
    // function handleSubmit(e){
    //     e.preventDefault();
    //     id ? dispatch(adminUpdateCategory(id, input)) :
    //     dispatch(adminAddCategory(input))
    // }
    
    return (
    <Modal
        open={open}
        onClose={handleClose}
    >
        <Box sx={{ ...style}} component="form">
        <div className={styles.mainDiv} >
            <Typography variant="h4" gutterBottom component="div">
                Agregar una categoria:
            </Typography>
                <TextField error={error.name ? true : false} id="name" label="Nombre" variant="standard" onChange={handleChange} value={input.name} style={{ width: "300px", margin: "5px" }} />
                    {
                        input.image ? <img src={input.image} alt='prueba' /> : <img src='https://www.gfpropiedades.com.ar/themes/inmokey_t1/img/nophoto.png' alt='prueba' />
                    }
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageChange}/>
                    <Button 
                        variant="contained" 
                        component="span" 
                        style={{ width: "200px", margin: "5px" }}
                        startIcon={<AddAPhoto />}
                    >Imagen</Button>
                </label>
            <Button 
                onClick={handleSubmit}
                disabled={disabled}
                variant="contained" 
                component="span" 
                style={{ width: "70%", margin: "5px" }}
                startIcon={<Publish />}
                >Publicar</Button>
        </div>
        </Box>
    </Modal>
    );
}