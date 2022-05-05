import React from 'react'
import styles from './CardUsuarios.module.css'
import { IconButton, Tooltip } from '@mui/material';
import { Delete, AdminPanelSettings, Storefront, PersonOutline, SupervisorAccount, Cached, Block } from '@mui/icons-material/';
import defaultImage from '../../../images/defaultUser.png';

function User({ image, name, isAdmin, isSeller, banned, userId, handlePasswordReset, id, handleUserToAdmin, handleOpen, handleUserdelete }) {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={image}
                    alt="Imagen de categoria"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = defaultImage
                    }} />
                <h4>{name}</h4>
                {
                    isAdmin ? <Tooltip title="Admin" arrow><AdminPanelSettings /></Tooltip> : (
                        isSeller ? <Tooltip title="Vendedor" arrow><Storefront /></Tooltip> :
                            <Tooltip title="Comprador" arrow><PersonOutline /></Tooltip>
                    )
                }
            </div>
            <div className={styles.right}>
                <Tooltip title="Reset contraseña" arrow>
                    <IconButton
                        id={userId}
                        onClick={(e) => handlePasswordReset(e)}
                    >
                        <Cached />
                    </IconButton>
                </Tooltip>
                {
                    !isAdmin &&
                    <div>
                        <Tooltip title="Covertir a Admin" arrow>
                            <IconButton
                                id={id}
                                onClick={(e) => handleUserToAdmin(e)}
                            >
                                <SupervisorAccount />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={banned ? "Habilitar Usuario" : "Suspender Usuario"} arrow>
                            <IconButton
                                onClick={() => handleOpen(id, banned)}
                            >
                                <Block sx={banned ? { color: '#6bf178' } : { color: '#E2001A' }} />
                            </IconButton>
                        </Tooltip>
                    </div>
                }
                <Tooltip title="Eliminar Usuario" arrow>
                    <IconButton
                        onClick={() => handleUserdelete(id)}
                    >
                        <Delete sx={{ color: '#E2001A' }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default User
