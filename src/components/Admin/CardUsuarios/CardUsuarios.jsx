import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, upgradeUser, deleteUser, blockPass } from '../../../redux/actions/a.admin.js';
import { useAuth } from '../../../context/AuthContext'
import { IconButton, Tooltip } from '@mui/material';
import styles from './CardUsuarios.module.css';
import { Delete, AdminPanelSettings, Storefront, PersonOutline, SupervisorAccount, Cached } from '@mui/icons-material/';
import defaultImage from '../../../images/defaultUser.png';
import Swal from "sweetalert2";

export default function CardCategorias() {
    const { currentUser } = useAuth()
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsers)
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])
    async function handlePasswordReset(event) {
        event.preventDefault()
        dispatch(blockPass(event.currentTarget.getAttribute('id'), currentUser))
    }
    function handleUserToAdmin(event) {
        dispatch(upgradeUser(event.currentTarget.getAttribute('id'), currentUser))
    }
    const handleUserdelete = (event) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar el usuario seleccionado?`,
            text: "Ésta acción no se puede deshacer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#005BAA",
            cancelButtonColor: "#E2001A",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sí, Eliminalo!",
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(deleteUser(event, currentUser))
            }
        })
    }

    return (
        <div className={styles.mainDiv}>
            {
                allUsers.map(category => {
                    return (
                        <div key={category._id} className={styles.container}>
                            <div className={styles.left}>
                                <img src={category.image}
                                    alt="Imagen de categoria"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = defaultImage
                                    }} />
                                <h4>{category.name}</h4>
                                {
                                    category.isAdmin ? <AdminPanelSettings /> : (
                                        category.isSeller ? <Storefront /> : <PersonOutline />
                                    )
                                }
                            </div>
                            <div className={styles.right}>
                                <Tooltip title="Reset contraseña" arrow>
                                    <IconButton
                                        id={category.userId}
                                        onClick={handlePasswordReset}
                                    >
                                        <Cached />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Covertir a Admin" arrow>
                                    <IconButton
                                        id={category._id}
                                        onClick={handleUserToAdmin}
                                    >
                                        <SupervisorAccount />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar Usuario" arrow>
                                    <IconButton
                                        onClick={() => handleUserdelete(category.userId)}
                                    >
                                        <Delete sx={{ color: '#E2001A' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    )
                })
            }
            {/* <Menu open={open}/> */}
        </div>
    )
}