import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, upgradeUser, deleteUser, blockPass, banned } from '../../../redux/actions/a.admin.js';
import { useAuth } from '../../../context/AuthContext'
import styles from './CardUsuarios.module.css';
import BanModal from './BanModal.jsx'
import Swal from "sweetalert2";
import User from './user'

export default function CardCategorias() {
    const { currentUser } = useAuth()
    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.allUsers)
    let allUsersSort = allUsers.sort(function(a, b) {
        if(a.isAdmin === true && b.isAdmin === false) {
            return -1;
        }
        if(a.isAdmin !== true && b.isAdmin !== false) {
            return 1;
        }
        return 0;
    })
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
    const [render, setRender] = useState('');
    const [id, setId] = useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = (id, ban) => {
        setOpen(true)
        setId(id)
        ban ?
        setBanObj({
            ...banObj,
            banned: false
        }) :
        setBanObj({
            ...banObj,
            banned: true
        })
        setRender('renderizateMierda')
    };
    const handleClose = () => {
        setBanObj({reason: '', banned: false})
        setOpen(false)
    }
    
    async function handleUserBan(event){
        event.preventDefault();
        await dispatch(banned(id, banObj, currentUser))
        handleClose()
        await dispatch(getAllUsers(currentUser));
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
                allUsersSort.map(category => {
                    return (
                        <User key={category._id} image={category.image} name={category.name} isAdmin={category.isAdmin} isSeller={category.isSeller} userId={category.userId} handlePasswordReset={handlePasswordReset} id={category._id} handleUserToAdmin={handleUserToAdmin} banned={category.banned} handleOpen={handleOpen} handleUserdelete={handleUserdelete} />
                    )
                })
            }
            <BanModal open={open} handleClose={handleClose} banObj={banObj} setBanObj={setBanObj} handleUserBan={handleUserBan}/>
        </div>
    )
}
