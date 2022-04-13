import { Container, Box, Typography } from "@mui/material";

export default function DatosVendedor(){
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
                    marginBottom: '25px'
                }}>
                    <Typography variant='h6'>
                        {"SUPERMERCADO"}
                    </Typography>
                </Box>
                <Box>
                    <img src="https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png" alt="" style={{padding: "10px",width: "100px"}}/>
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
                        {`Dirección: `}
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                        {`Lo que sea: `}
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
                        {`Datos: `}
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                        {`Delivery: `}
                    </Typography>
                </Box>
            </Container>
            </Container>
        </Container>
    )
}