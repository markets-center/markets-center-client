import React from "react";
import styles from "./AddProduct.module.css";
import Categories from './Categories.jsx'
import { Modal, Typography, TextField, Box, Button, styled } from "@mui/material";
import { AddAPhoto, Publish } from '@mui/icons-material/';

const Input = styled('input')({
    display: 'none',
});

export default function AddProduct(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
    };
    
    return (
    <Modal
        className={styles.modal}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} component="form">
            <Typography variant="h4" gutterBottom component="div">
                Agregar un producto:
            </Typography>
            <TextField id="name" label="Nombre" variant="standard" style={{ width: "300px", margin: "5px" }}/>
            <TextField id="stock" label="Stock" variant="standard" style={{ width: "300px", margin: "5px" }}/>
            <TextField id="price" label="Precio" variant="standard" style={{ width: "300px", margin: "5px" }}/>
            <TextField id="description" label="Descripción" variant="standard" style={{ width: "300px", margin: "5px" }} multiline rows={4}/>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button 
                    variant="contained" 
                    component="span" 
                    style={{ width: "200px", margin: "5px" }}
                    startIcon={<AddAPhoto />}
                >Imagen</Button>
            </label>
            <Categories />
            <Button 
                variant="contained" 
                component="span" 
                style={{ width: "200px", margin: "5px" }}
                startIcon={<Publish />}
                >Publicar</Button>
        </Box>
    </Modal>
    );
}
