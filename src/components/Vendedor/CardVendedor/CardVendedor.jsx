import { Container, Button, Box, Typography } from "@mui/material";

export default function CardVendedor({ nombre, image, stock, precio }){
    return (
        <Container sx={{
            height: '100px',
            width: '500px',
            border: '2px solid gray',
            margin: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '10px',
        }}>
            <Box sx={{
                height: 'max-content',
            }}>
                <img src={image} alt="pic" width='60px'/>
            </Box>

            <Box sx={{
                width: '250px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Typography component='span' sx={{
                    margin: '10px 0px'
                }}>
                    {`${nombre}`}
                </Typography>
                <Typography component='span' sx={{
                    margin: '10px 0px'
                }}>
                    {`Stock: ${stock}`}
                </Typography>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Button variant="contained" color="info" sx={{
                    margin: '2px',
                    fontWeight: '600',
                }}>
                Reponer
                </Button>
                <Button variant="contained" color="secondary" sx={{
                    margin: '2px'
                }}>
                Eliminar
                </Button>
            </Box>
        </Container>
    )
}