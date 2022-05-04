import image from './Error2.gif'
import MarketsCenterMistake from '../../images/MarketsCenterMistake.gif'
import s from './Error.module.css';
import { useNavigate } from 'react-router';

export default function Error({ message, mistake }) {
    const navigate = useNavigate();
    function handleBack(){
        navigate('/')
    }
    return (
        <div className={mistake ? s.errorTrue : s.errorFalse}>
            <img className={mistake ? s.imgTrue: s.imgFalse} src={mistake ? image : MarketsCenterMistake} alt='Error' />
            <h1 className={mistake ? s.textTrue: s.textFalse}>{message}</h1>
            {
                mistake  && <button className={s.button} onClick={() => handleBack()}>Volver</button>
            }
        </div>
    )
}