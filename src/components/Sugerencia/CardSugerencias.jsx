import React from 'react'
import { Container, Avatar, Typography} from '@mui/material'
import styles from './CardSugerencias.module.css'

export default function CardSugerencia({id, name, image}) {

return (
    <div className={styles.container}>
        <Avatar
            alt=''
            src={image}
            sx={{ width: 90, height: 90 }}
        />
        <Typography variant="body2" sx={{
                textAlign: 'center',
        }}>
            {name}
        </Typography>
    </div>
)
}