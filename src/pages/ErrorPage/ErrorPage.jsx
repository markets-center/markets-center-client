import React, { useState, useEffect } from 'react';
import s from './ErrorPage.module.css'
import Typography from '@mui/material/Typography';
import Mc from '../../images/MarketsCenter.png';
import Button from '@mui/material/Button';
import { useAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from "react-redux";
import {UpdateOrder} from '../../redux/actions/a.order';

function ErrorPage() {
    const [checked,setChecked] = useState(false);
    const {currentUser} = useAuth();
    const dispatch = useDispatch()
    const newOrder = useSelector(state=> state.newOrder)
    useEffect(()=>{
        dispatch(UpdateOrder(newOrder, "Rechazada", currentUser))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    setTimeout(function(){
        setChecked(true)
    },500)


    return (
        <div className={s.containerError}>
            <div className={s.container}>
            <div className={s.containerX}>
                <svg  className={s.svg}version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle className={s.pathCircle} fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <line className={s.pathLine} fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                <line className={s.pathLine} fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                </svg>
            </div>    
                {checked?<div>
                    <div>
                    <Typography variant="h3" className={s.title}>¡Error!</Typography>
                    <Typography variant="h6" className={s.text}>
                        Hubo un problema con el pago
                    </Typography>
                    </div>
                    <div className={s.containerButton} style={{marginTop: '180px'}}>
                    <div className={s.button}><Button variant="contained" color="buttonGracias" size="small" disableElevation href="/">Volver</Button></div>
                    <Typography variant="body2" className={s.textMarket}>
                        Equipo de MarketsCenter<img src={Mc} width="25px" alt="mc" className={s.imgCarritoThanks}/>
                    </Typography>
                </div>
                </div>:""}
                    

            </div>
           
        </div>
    );
}

export default ErrorPage;