import image from './Error2.gif'
import MarketsCenterMistake from '../../images/MarketsCenterMistake.gif'
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
                <img src={mistake ? image : MarketsCenterMistake} alt='Error'/>
                <h1>{message}</h1>
            </Grid>

        </Grid>
    )
}