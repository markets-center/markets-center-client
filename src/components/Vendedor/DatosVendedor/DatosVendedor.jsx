import { Container, Box, Typography } from "@mui/material";

export default function DatosVendedor({ name, address, email, delivery, phone, image }){
    return (
        <Container sx={{
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
                    <Typography variant='h6'>
                        {name}
                    </Typography>
                </Box>
                <Box>
                    <img src={image} alt="" style={{padding: "10px",width: "150px",borderRadius: "50%"}}/>
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
                <Box>
                    <Typography>
                        {`Dirección: ${address}`}
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                        {`Mail: ${email}`}
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
                        {`Phone: ${phone}`}
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                        {`Delivery: ${delivery}`}
                    </Typography>
                </Box>
            </Container>
            </Container>
        </Container>
    )
}