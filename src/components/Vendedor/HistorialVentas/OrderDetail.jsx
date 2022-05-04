import React from 'react';
import { Modal, Container } from '@mui/material'
import styles from './OrderDetail.module.css'
import accounting from 'accounting'


export default function OrderDetail({input, openMore, handleOpenMore, handleCloseMore}){
    const clientInfo = input.userId
    return (
        <Modal
            open={openMore}
            onClose={handleCloseMore}
        >
            <Container className={styles.containerMain}>
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
                                            <p>{`Cantidad: ${product.quantity} u.`}</p>
                                            <p>{`Precio:  ${accounting.formatMoney(product.productId.price, "U$D")}`}</p>
                                            <p>{`Total: ${accounting.formatMoney(product.productId.price*product.quantity, "U$D")}`}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3 className={styles.total}>{`Total: ${accounting.formatMoney(input.amount, "U$D ")}`}</h3>                            
                    </div>
                </div>
            </Container>
        </Modal>
    )
}
