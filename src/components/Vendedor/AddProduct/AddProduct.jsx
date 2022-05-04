import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom'
import { getAllCategories } from '../../../redux/actions/a.category.js'

import styles from "./AddProduct.module.css";
import { Modal, Typography, TextField, Box, Button, styled } from "@mui/material";
import { AddAPhoto, Publish } from '@mui/icons-material/';
import CancelIcon from '@mui/icons-material/Cancel';


import Categories from './Categories.jsx'

const Input = styled('input')({
    display: 'none',
});

export default function AddProduct({ input, setInput, handleClose, open, prodId, handleSubmit }) {
    // const { currentUser } = useAuth();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])

    // const [input, setInput] = useState({
    //     name: "",
    //     description: "",
    //     image: "",
    //     stock: "",
    //     category: [],
    //     price: "",
    //     userId: currentUser.uid
    // });
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState({
        name: "Error",
        description: "Error",
        image: "Error",
        stock: "Error",
        category: "Error",
        price: "Error",
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
            description: "Error",
            image: "Error",
            stock: "Error",
            category: "Error",
            price: "Error"
        }
        if (/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(input.name) && input.name.length > 0) delete errorData.name;
        if (input.description.length > 0) delete errorData.description;
        if (typeof input.image === 'string' && input.image.length > 0) delete errorData.image;
        if (typeof parseInt(input.stock) === 'number' && input.stock >= 0 && input.stock.length > 0) delete errorData.stock;
        if (input.category.length > 0) delete errorData.category;
        if (typeof parseInt(input.price) === 'number' && input.price >= 0 && input.price.length > 0) delete errorData.price
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
            setError(Validation({
                ...input,
                image: reader.result
            }))
        };
    }
    useEffect(() => {
        Object.keys(error).length > 0 ? setDisabled(true) : setDisabled(false)
    }, [error])
    // function handleSubmit(e){
    //     e.preventDefault();
    //     dispatch(postProduct(input))
    //     navigate('/Profile')
    // }

    return (
        <Modal
            className={styles.modal}
            open={open}
            onClose={handleClose}
        >
            <Box className={styles.container} component="form">
            <CancelIcon color="primary" className={styles.back} onClick={handleClose} />
                <div className={styles.mainDiv}>
                    <Typography variant="h4" gutterBottom component="div">
                        Agregar un producto:
                    </Typography>
                    <div className={styles.middleDiv}>
                        <div className={styles.modalLeft}>
                            <TextField error={error.name ? true : false} id="name" label="Nombre" variant="standard" onChange={handleChange} value={input.name} style={{ width: "300px", margin: "5px" }} />
                            <TextField error={error.price ? true : false} id="price" label="Precio" variant="standard" onChange={handleChange} value={input.price} style={{ width: "300px", margin: "5px" }} />
                            <TextField error={error.stock ? true : false} id="stock" label="Stock" variant="standard" onChange={handleChange} value={input.stock} style={{ width: "300px", margin: "5px" }} />
                            <Categories Validation={Validation} setError={setError} error={error} setInput={setInput} input={input} />
                        </div>
                        <div className={styles.modalRight}>
                            <TextField error={error.description ? true : false} id="description" label="Descripción" variant="standard" onChange={handleChange} value={input.description} style={{ width: "300px", margin: "5px" }} multiline rows={4} />
                            {
                                input.image ? <img className={styles.img} src={input.image} alt='prueba' /> : <img className={styles.img} src='https://www.gfpropiedades.com.ar/themes/inmokey_t1/img/nophoto.png' alt='prueba' />
                            }
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleImageChange} />
                                <Button
                                    variant="contained"
                                    component="span"
                                    style={{ width: "200px", margin: "5px" }}
                                    startIcon={<AddAPhoto />}
                                >Imagen</Button>
                            </label>
                        </div>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={disabled}
                        variant="contained"
                        component="span"
                        style={{ width: "100%", margin: "5px" }}
                        startIcon={<Publish />}
                    >Publicar</Button>
                </div>
            </Box>
        </Modal>
    );
}
