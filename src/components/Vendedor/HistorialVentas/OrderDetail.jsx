import React from 'react';
import { Modal, Box } from '@mui/material'
import styles from './OrderDetail.module.css'


export default function OrderDetail({input, openMore, handleOpenMore, handleCloseMore}){
    const clientInfo = input.userId
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        height: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
        display: "flex",
        flexDirection: 'row',
    };
    return (
        <Modal
            open={openMore}
            onClose={handleCloseMore}
        >
            <Box sx={{ ...style }}>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <div className={styles.infoLeft}>
                            <img  src={clientInfo.image}
                                    alt=""
                                    style={{ padding: "10px", width: "50px", height: "50px", borderRadius:"50%" }}
                            />
                            <div>
                                <h3 className={styles.infoText}>{clientInfo.name}</h3>
                                <p className={styles.infoText}>Dirección: {clientInfo.address}</p>
                                <p className={styles.infoText}>Telefono: {clientInfo.phone}</p>
                                <p className={styles.infoText}>Mail: {clientInfo.email}</p>
                            </div>
                        </div>
                        <div className={styles.infoRight}>
                            <h4 className={styles.infoText}>{`Estado: ${input.status}`}</h4>                            
                        </div>
                    </div>
                    <div className={styles.listItemContainer}>
                        {
                            input.products.map( product => {
                                return (
                                    <div key={product._id} className={styles.listItem}>
                                        <div className={styles.listItemLeft}>
                                            <img src={product.productId.image} alt='' style={{ padding: "10px", width: "40px" }}/>
                                            <h4>{product.productId.name}</h4>
                                        </div>
                                        <div className={styles.listItemRight}>
                                            <p>{`Cantidad: ${product.quantity}`}</p>
                                            <p>{`Precio: U$D${product.productId.price}`}</p>
                                            <p>{`Total: U$D${product.productId.price*product.quantity}`}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3 className={styles.Total}>{`Total: U$D ${input.amount}`}</h3>                            
                    </div>
                </div>
            </Box>
        </Modal>
    )
}
