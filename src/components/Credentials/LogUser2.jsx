import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import logo from '../../images/Markets Center.svg'
import css from './SignUp.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import image from '../../images/signIn.svg'
import axios from 'axios';

import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import {Button, Input, Typography, Snackbar} from "@mui/material";
import {SnackbarAlert} from '../../components/Alert/success';

export default function LogUser2() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleClose(){
        setError('');
        setErrorMail('')
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (user.email === "") {
            return setErrorMail("Se debe ingresar un email.");
        }
        if (user.password === '') {
            return setError("Se debe ingresar contraseña");
        }
        try {
            setError("");
            setErrorMail("");
            setLoading(true);
            await login(user.email, user.password);
            navigate("/");
        } catch (error) {
            setError("Credenciales invalidas");
        }
        setLoading(false);
    }

    async function regWithGoogle() {
        try {
            const user = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            const token = user.user.auth.currentUser.accessToken
            const userDB = await axios.get(`/api/private/users/byid/${user.user.uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.setItem('isAdmin', userDB.data.data[0].isAdmin)
            localStorage.setItem('isSeller', userDB.data.data[0].isSeller)
            if(userDB.data.success){
                navigate("/User")
            }else {
                navigate("/buyerForm");
            }
            
        } catch (error) {
            setError("Credenciales invalidas");
        }
    }

    return (
        <div className={css.content_all}>
            <div className={css.content_form}>
                <img src={logo} alt='logo MC' className={css.loguito} />
                <h1 className={css.tittle}>INICIAR SESIÓN</h1>
                {/* <p className={css.text}>Ingrese al sistema si ya está registrado.</p> */}
                <form onSubmit={handleSubmit}>
                    <label className={css.label} htmlFor="">Correo electrónico</label>
                    <Input
                        className={css.input}
                        type="email"
                        required
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    {user.email === "" && (
                        <Typography component="p" variant="p">
                            {error}
                        </Typography>
                    )}
                    <label className={css.label} htmlFor="">Contraseña</label>
                    <Input
                        type="password"
                        className={css.input}
                        required
                        name="password"
                        label="Contraseña"
                        id="password"
                        onChange={handleChange}
                    />
                    {user.password === "" && (
                        <Typography component="p" variant="p">
                            {errorMail}
                        </Typography>
                    )}
                    <span className={css.olvidePass}>
                        <Link to="/OlvidoPass" variant="body2">Olvidé mi contraseña</Link>
                    </span>
                    <Button variant="contained" sx={{ mt: 3, mb: 2, color: 'white' }} className={css.btn} type="submit" disabled={loading} >Iniciar Sesión</Button>
                    <Button variant="contained" sx={{ mt: 3, mb: 2, color: 'black' }} className={css.btnGoogle} onClick={regWithGoogle} type="submit" disabled={loading}><GoogleIcon fontSize="small" />&nbsp; Ingresar con Google</Button>
                </form>
                <span className={css.text_footer}>
                    ¿Aún no te has registrado? <Link to="/Register">Regístrate</Link>
                </span>
            </div>
            <div className={css.content_image}>
                <img className={css.image} src={image} alt='' />
            </div>
            <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <SnackbarAlert onClose={handleClose} variant='filled' severity='error'>
                    {error}
                </SnackbarAlert>
            </Snackbar>
            <Snackbar open={!!errorMail} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}>
                <SnackbarAlert onClose={handleClose} variant='filled' severity='error'>
                    {errorMail}
                </SnackbarAlert>
            </Snackbar>


        </div>
    )

}