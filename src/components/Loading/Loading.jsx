import loading from '../../images/MarketsCenterLoading.gif'
import Grid from '@mui/material/Grid';
import style from './Loading.module.css'

export default function Loading() {
    return (
        <Grid
            className={style.loading}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '50vh' }}>
            <Grid item xs={3}>
                <img src={loading} alt='Loading'/>
            </Grid>
        </Grid>
    )
}