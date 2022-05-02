import React, { useState } from 'react';
import s from './GraciasPage.module.css'
import Typography from '@mui/material/Typography';
import Mc from '../../images/MarketsCenter.png';
import Button from '@mui/material/Button';

function ComponenteGracias() {
    const [checked,setChecked] = useState(false);


    setTimeout(function(){
        setChecked(true)
    },2000)


    return (
        <div className={s.supremeContainer}>
            <div className={s.container}>
            <div className={s.containerCheck}>
            <input type="checkbox" id="check" checked={checked} className={s.input}/>
                <label className={s.label} for="check">
                    <div className={s.checkIcon}></div>
                </label>
            </div>    
                {checked?<div>
                    <Typography variant="h3" className={s.title}>¡Gracias!</Typography>
                    <Typography variant="h6" className={s.text}>
                        En breve el vendedor comenzará a preparar su pedido
                    </Typography>
                    </div>:<div className={s.invisible} />}
                    <div className={s.containerButton}>
                        <div className={s.button}><Button variant="contained" color="buttonGracias" size="small" disableElevation href="/">Volver</Button></div>
                        <Typography variant="body2" className={s.textMarket}>
                            Equipo de MarketsCenter<img src={Mc} width="25px" alt="mc" className={s.imgCarritoThanks}/>
                        </Typography>
                    </div>

            </div>
        </div>
    );
}

export default ComponenteGracias;