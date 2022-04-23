import image from './Error2.gif'
import mistakeImg from '../../images/MarketsCenterMistake.gif'
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';


export default function Error({message, mistake}){
    return (
        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '50vh' }}
            >
                <Grid item xs={3}>
                <Container >
                    <img src={mistake ? image : mistakeImg} alt="Error"/>
                    <h3>{message}</h3>
        </Container>
                </Grid>
            </Grid>
    )
}