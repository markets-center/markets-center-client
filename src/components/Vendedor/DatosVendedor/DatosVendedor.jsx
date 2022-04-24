import { Container, Box, Typography } from "@mui/material";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import BlockIcon from '@mui/icons-material/Block';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

export default function DatosVendedor({ name, address, email, delivery, phone, image }){
    return (
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
                <Box sx={{
                }}>
                    <Typography variant='h6' sx={{
                        fontWeight: 'bold'
                    }}>
                        {name}
                    </Typography>
                </Box>
                <Box>
                    <img src={image} alt="" style={{width: "150px",borderRadius: "50%"}}/>
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
                    width: '275px'
                }}>
                    <Typography>
                        <span style={{fontWeight: 'bold'}}>Dirección</span> {address}
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                    <span style={{fontWeight: 'bold'}}>Mail</span> {email}
                    </Typography>
                </Box>
            </Container>
            <Container sx={{
                height: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
            }}>

                <Box sx={{
                    width: '275px'
                }}>
                    <Typography>
                    <span style={{fontWeight: 'bold'}}>Teléfono</span> {phone}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {delivery ? <><DeliveryDiningIcon style={{position: 'relative',left: '10px',color: 'green', fontSize: '40px'}} /> <PanoramaFishEyeIcon style={{position: 'relative', right: '39px', fontSize: '60px', color: 'green'}} /></> : <><DeliveryDiningIcon style={{position: 'relative',left: '10px',color: 'red', fontSize: '40px'}} /> <BlockIcon style={{position: 'relative', right: '39px', fontSize: '60px', color: 'red'}}/></>}
                </Box>
            </Container>
            </Container>
        </Container>
    )
}