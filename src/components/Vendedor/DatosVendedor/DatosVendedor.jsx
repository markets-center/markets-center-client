import { Container, Box, Button, Typography, Modal } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import BlockIcon from '@mui/icons-material/Block';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { useState } from "react";
import { useSelector } from 'react-redux'
import SellerForm from './SellerForm'

export default function DatosVendedor() {
    const oneUser = useSelector(state => state.oneUser)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
//             <Container sx={{
//                 height: '250px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginTop: '10px',
//                 borderBottom: '2px solid black'
//             }}>
                <Container sx={{
                    height: '250px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '10px',
                    borderBottom: '2px solid black'
                }}>
                    <Container sx={{
                        width: '200px',
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
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
                <Container sx={{
                    width: '800px',
                    height: '200px',
                    margin: '0 50px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Container sx={{
                        height: '160px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'
                    }}>
                        <Box sx={{
                            width: '275px',
                            marginBottom: '30px'
                        }}>
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
                    <Container sx={{
                        width: '200px',
                        display: 'flex',

                    }}>
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
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 800,
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                }}>
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
