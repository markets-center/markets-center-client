import React, {useState} from 'react';
import ListItem from './ListItem.jsx'

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ListItemText, ListItemAvatar} from '@mui/material';
import { Button } from '@mui/material'


export default function OrderDetail({openMore, detail, handleOpenMore, handleCloseMore}){
    // const [openMore, setOpenMore] = useState(false);
    // const [detail, setDetail] = useState('');
    // function handleOpenMore(items){
    // setDetail(items.products)
    // setOpenMore(true)
    // }
    // const handleCloseMore = () => setOpenMore(false);
    
    return (
        <Dialog
                open={openMore}
                onClose={handleCloseMore}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{minwidth: '500px'}}
            >
                <DialogTitle sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}} id="alert-dialog-title">
                {/* <img  src={logo}
                        alt=""
                        style={{ padding: "10px", width: "40px" }}
                        /> */}
                {"Detalle de la compra"}
                </DialogTitle>
                <DialogContent>
                {/* {detail.length>0 && detail.map(p=> <DialogContentText 
                key={p.productId._id}
                sx={{display: 'block'}}
                id="alert-dialog-description">
                    <ListItem>
                    <ListItemAvatar>
                <img  src={p.productId?.image}
                        alt=""
                        style={{ padding: "10px", width: "50px" }}
                        />
                    </ListItemAvatar>
                    <ListItemText sx={{padding: '20px'}} primary={`${p.productId?.name}`} />
                    <ListItemText sx={{padding: '20px'}} primary={`$ ${p.productId?.price}`} />
                    <ListItemText sx={{padding: '20px'}} primary={`${p.quantity} u.`} />
                    </ListItem>
                </DialogContentText>)} */}
                Hoola
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseMore} autoFocus>
                    Cerrar
                </Button>
                </DialogActions>
            </Dialog>
    )
}
