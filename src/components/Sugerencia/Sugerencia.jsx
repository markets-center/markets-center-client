import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './Sugerencia.module.css'
import CardSugerencia from './CardSugerencias.jsx'
import { filterBySeller } from '../../redux/actions/a.products.js'
import CancelIcon from '@mui/icons-material/Cancel';

export default function Sugerencia({open, setOpen, handleOpenModal, handleCloseModal, selected}) {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.offerArray);
    products = products.slice(0, 3)
    useEffect(() =>{
        dispatch(filterBySeller(selected?._id))
    },[dispatch,selected?._id])

return (
    <div className={styles.container}>
    {
        selected &&
        <Modal
        open={open}
        onClose={handleCloseModal}
        >
            <Box className={styles.box}>
                <div className={styles.closeButton}>
                    <CancelIcon color="primary" className={styles.back} onClick={() => handleCloseModal()} />
                </div>
                <Typography variant="h6" component="h2">
                    {`Vendedor sugerido: ${selected.name}`}
                </Typography>
                <div className={styles.cardContainer}>
                    {
                        products.length > 0 &&
                        products.map( prod => (
                            <CardSugerencia 
                            key={prod._id}
                            id={prod._id}
                            name={prod.name}
                            image={prod.image}
                            />
                        ))
                    }
                </div>
                <Typography sx={{ mt: 2 }}>
                    Mira todos sus productos publicados!!
                </Typography>
                <Button onClick={() => handleCloseModal(selected._id)}>{selected.name}</Button>
            </Box>
        </Modal>
    }
    </div>
)
}
