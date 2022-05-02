import { Container, Box, Button, Typography, Modal } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import BlockIcon from '@mui/icons-material/Block';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useState } from "react";
import { useSelector } from 'react-redux'
import SellerForm from './SellerForm'
import style from './DatosVendedor.module.css'
import styleForm from '../../Comprador/Style/User.module.css'

export default function DatosVendedor() {
    const oneUser = useSelector(state => state.oneUser)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Container className={style.container} >
                <Container sx={{
                    width: '200px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Box sx={{
                    }}>
                        <Typography variant='h6' sx={{
                            fontWeight: 'bold'
                        }}>
                            {oneUser.name}
                        </Typography>
                    </Box>
                    <Box>
                        <img src={oneUser.image} alt="" style={{ width: "150px", borderRadius: "50%" }} />
                    </Box>
                </Container>
                <Container className={style.containerData}>
                    <Container sx={{
                        height: '160px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'
                    }}>
                        <Box className={style.boxAddress}>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Dirección</span> {oneUser.address}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>E-mail</span> {oneUser.email}
                            </Typography>
                        </Box>
                    </Container>
                    <Container sx={{
                        height: '160px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'
                    }}>

                        <Box>
                            <Typography>
                                <span style={{ fontWeight: 'bold' }}>Teléfono</span> {oneUser.phone}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {oneUser.delivery ? <><DeliveryDiningIcon style={{ position: 'relative', left: '10px', color: 'green', fontSize: '40px' }} /> <PanoramaFishEyeIcon style={{ position: 'relative', right: '39px', fontSize: '60px', color: 'green' }} /></> : <><DeliveryDiningIcon style={{ position: 'relative', left: '10px', color: 'red', fontSize: '40px' }} /> <BlockIcon style={{ position: 'relative', right: '39px', fontSize: '60px', color: 'red' }} /></>}
                        </Box>
                    </Container>
                    <Container className={style.actualizar}>
                        <Button
                            onClick={handleOpen}
                            variant="contained"
                            sx={{
                                height: '50px'
                            }}
                        >
                            Actualizar Datos
                        </Button>
                    </Container>
                </Container>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styleForm.containerForm}>
                    <SellerForm
                        name={oneUser.name}
                        email={oneUser.email}
                        image={oneUser.image}
                        IdDocument={oneUser.IdDocument}
                        phone={oneUser.phone}
                        address={oneUser.address}
                        delivery={oneUser.delivery}
                        userId={oneUser.userId}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </>
    )
}