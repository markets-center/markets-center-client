import loading from '../../images/MarketsCenterLoading.gif'
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Loading() {
    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '50vh' }}
            >
                <Grid item xs={3}>
                <Container>
                <img src={loading} alt="Loading" />
            </Container>
                </Grid>
            </Grid>
        </div>
    )
}