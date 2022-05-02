import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, upgradeUser, deleteUser, blockPass, banned } from '../../../redux/actions/a.admin.js';
import { useAuth } from '../../../context/AuthContext'
import { IconButton, Tooltip } from '@mui/material';
import styles from './CardUsuarios.module.css';
import BanModal from './BanModal.jsx'
import { Delete, AdminPanelSettings, Storefront, PersonOutline, SupervisorAccount, Cached, Block } from '@mui/icons-material/';
import defaultImage from '../../../images/defaultUser.png';
import Swal from "sweetalert2";

export default function CardCategorias() {
    const { currentUser } = useAuth()
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsers)
    useEffect(() => {
        dispatch(getAllUsers(currentUser));
    }, [dispatch, currentUser])
    async function handlePasswordReset(event) {
        event.preventDefault()
        dispatch(blockPass(event.currentTarget.getAttribute('id'), currentUser))
    }
    function handleUserToAdmin(event) {
        const hola = 'hola'
        dispatch(upgradeUser(event.currentTarget.getAttribute('id'), hola, currentUser))
    }
    const [banObj, setBanObj] = useState({reason: '', banned: false})
    const [id, setId] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = (event) => {
        setOpen(true)
        setId(event.currentTarget.getAttribute('id'))
        let ban = event.currentTarget.getAttribute('value')
        setBanObj({
            ...banObj,
            banned: !ban
        })
    };
    const handleClose = () => {
        setBanObj({reason: '', banned: false})
        setOpen(false)
    }
    
    function handleUserBan(event){
        event.preventDefault();
        dispatch(banned(id, banObj, currentUser))
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
                const hola = 'hola'
                dispatch(deleteUser(event, hola, currentUser))
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
                                    category.isAdmin ? <Tooltip title="Admin" arrow><AdminPanelSettings /></Tooltip> : (
                                        category.isSeller ? <Tooltip title="Vendedor" arrow><Storefront /></Tooltip> : 
                                        <Tooltip title="Comprador" arrow><PersonOutline /></Tooltip>
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
                                <Tooltip title={category.banned ? "Habilitar Usuario" : "Suspender Usuario"}arrow>
                                    <IconButton
                                        id={category._id}
                                        value={category.banned}
                                        onClick={handleOpen} // Modificar action !!
                                    >
                                        <Block sx={category.banned ? { color: '#6bf178' } : {color: '#E2001A'}} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar Usuario" arrow>
                                    <IconButton
                                        onClick={() => handleUserdelete(category._id)}
                                    >
                                        <Delete sx={{ color: '#E2001A' }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    )
                })
            }
            <BanModal open={open} handleClose={handleClose} banObj={banObj} setBanObj={setBanObj} handleUserBan={handleUserBan}/>
        </div>
    )
}