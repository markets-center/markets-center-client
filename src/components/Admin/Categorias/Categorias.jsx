import React, { useState, useEffect } from 'react';
import styles from './Categorias.module.css'
import { Button } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import CardCategorias from '../CardCategorias/CardCategorias.jsx'
import AddCategorie from '../AddCategorie/AddCategorie.jsx'
import {useAuth} from '../../../context/AuthContext'

//
import { useDispatch, useSelector } from 'react-redux';
// import { getAllCategories } from '../../../redux/actions/a.category.js'
import { adminAddCategory, getAllAdminCategories } from '../../../redux/actions/a.admin.js'
import { adminUpdateCategory } from '../../../redux/actions/a.admin.js'
//

export default function Categorias(){
    // READ CATEGORIES
    const {currentUser} = useAuth()
    const categories = useSelector(state => state.adminCategories)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllAdminCategories(currentUser));
    }, [dispatch, currentUser])
    // CREATE & UPDATE CATEGORIES
    const [input, setInput] = useState({
        name: "",
        image: ""
    });
    const [id, setId] = useState(null)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setId(null);
        setInput({
            name: "",
            image: ""
        })
        setOpen(false)
        dispatch(getAllAdminCategories(currentUser));
    }
    // const dispatch = useDispatch();
    function handleSubmit(e){
        e.preventDefault();
        id ? dispatch(adminUpdateCategory(id, input, currentUser)) :
        dispatch(adminAddCategory(input, currentUser))
    }
    return (
        <div>
            <div className={styles.header}>
                <h3>Lista de categorias</h3>
                <Button variant="contained" color="info" startIcon={<AddBox />} onClick={handleOpen}> Agregar una categoria</Button>
            </div>
            <CardCategorias categories={categories} handleOpen={handleOpen} handleClose={handleClose} input={input} setInput={setInput} id={id} setId={setId} handleSubmit={handleSubmit}/>
            <AddCategorie open={open} handleClose={handleClose} input={input} setInput={setInput} id={id} handleSubmit={handleSubmit}/>
        </div>
    )
}