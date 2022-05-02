import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

import { adminDeleteCategory, adminDisabledCategory, adminEnabledCategory } from '../../../redux/actions/a.admin.js'

import AddCategorie from '../AddCategorie/AddCategorie.jsx'
import { useAuth } from '../../../context/AuthContext'

import styles from './CardCategorias.module.css';
import { IconButton, Tooltip } from '@mui/material'
import { Delete, BorderColor, Block } from '@mui/icons-material/';

export default function CardCategorias({ categories, handleOpen, handleClose, input, setInput, id, setId, handleSubmit }) {
    // const categories = useSelector(state => state.allCategories)
    const dispatch = useDispatch();
    const { currentUser } = useAuth()
    // useEffect(() => {
    //     dispatch(getAllCategories());
    // }, [dispatch])
    function handleDelete(id) {
        Swal.fire({
            title: `¿Estás seguro de eliminar la categoría seleccionado?`,
            text: "Ésta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#005BAA",
            cancelButtonColor: "#E2001A",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, Eliminalo!",
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(adminDeleteCategory(id, currentUser))
            }
        })
    }

    function handleCategoryStatus(status, id){
        return !!status ? dispatch(adminEnabledCategory(id, currentUser)) : 
        dispatch(adminDisabledCategory(id, currentUser))
    }

    const handleUpdate = (event) => {
        const name = event.currentTarget.getAttribute('name')
        const image = event.currentTarget.getAttribute('image')
        setId(event.currentTarget.getAttribute('id'))
        setInput({
            name: name,
            image: image
        })
        handleOpen();
    }

    return (
        <div className={styles.mainDiv}>
            {
                categories.map(category => {
                    return (
                        <div key={category._id} className={styles.item} value={category.name} image={category.image}>
                            <div className={styles.left}>
                                <img src={category.image} alt="Imagen de categoria" />
                                <h4>{category.name}</h4>
                            </div>
                            <div className={styles.right}>
                                <Tooltip title="Editar" arrow>
                                    <IconButton name={category.name} image={category.image} id={category._id} onClick={handleUpdate}>
                                        <BorderColor />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Deshabilitar" arrow>
                                    <IconButton
                                        id={category._id}
                                        value={category.banned}
                                        onClick={() => handleCategoryStatus(category.banned, category._id)} // Modificar action !!
                                    >
                                        <Block sx={{ color: '#E2001A' }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar" arrow>
                                    <IconButton onClick={() => handleDelete(category._id)}>
                                        <Delete sx={{ color: '#E2001A' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <AddCategorie handleClose={handleClose} input={input} setInput={setInput} id={id} handleSubmit={handleSubmit} />
                        </div>
                    )
                })
            }
        </div>
    )
}