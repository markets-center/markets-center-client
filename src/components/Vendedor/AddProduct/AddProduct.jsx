import React from "react";
import { Modal, Typography, TextField, Box, Button, styled } from "@mui/material";

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
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    return (
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography variant="h4" gutterBottom component="div">
                Agregar un producto:
            </Typography>
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button variant="contained" component="span" size="small">Upload</Button>
            </label>
        </Box>
    </Modal>
    );
}
