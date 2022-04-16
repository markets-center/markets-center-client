import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import Categories from './Categories.jsx'
import { Modal, Typography, TextField, Box, Button, styled } from "@mui/material";
import { AddAPhoto, Publish } from '@mui/icons-material/';

const Input = styled('input')({
    display: 'none',
});

export default function AddProduct(props) {
    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 1000,
    //     height: 500,
    //     bgcolor: 'background.paper',
    //     border: '1px solid #000',
    //     borderRadius: 6,
    //     boxShadow: 24,
    //     p: 4,
    //     display: "flex",
    //     flexDirection: 'row',
    //     // text-align: center,
    // };
    const [input, setInput] = useState({
        name: "",
        description: "",
        image: "",
        stock: 3,
        discount: 0,
        category: ["6255aa9a351a9ea80e5af836","6255d99ba2e6d5a6702ac752"],
        price: 8000,
        userId: ""
    });
    const [fileInputState, setFileInputState] = useState();
    function handleImageChange(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setFileInputState(reader.result);
        };
    }
    
    
    return (
    <Modal
        className={styles.modal}
        open={props.open}
        onClose={props.handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
    >
        <Box className={styles.box} component="form">
            <Typography variant="h4" gutterBottom component="div" style={{ position: "absolute" }}>
                Agregar un producto:
            </Typography>
            <div className={styles.modalLeft}>
                <TextField id="name" label="Nombre" variant="standard" style={{ width: "300px", margin: "5px" }}/>
                <TextField id="price" label="Precio" variant="standard" style={{ width: "300px", margin: "5px" }}/>
                <TextField id="stock" label="Stock" variant="standard" style={{ width: "300px", margin: "5px" }}/>
            </div>
            <div className={styles.modalRight}>
                <TextField id="description" label="Descripción" variant="standard" style={{ width: "300px", margin: "5px" }} multiline rows={4}/>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageChange}/>
                    <Button 
                        variant="contained" 
                        component="span" 
                        style={{ width: "200px", margin: "5px" }}
                        startIcon={<AddAPhoto />}
                    >Imagen</Button>
                </label>
                <Categories />
            </div>
            <Button 
                variant="contained" 
                component="span" 
                style={{ width: "100%", margin: "5px" }}
                startIcon={<Publish />}
                >Publicar</Button>
            {
                fileInputState && <img src={fileInputState} alt='prueba' />
            }
        </Box>
    </Modal>
    );
}
