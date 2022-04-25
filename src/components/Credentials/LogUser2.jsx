import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import logo from '../../images/Markets Center.svg'
import css from './SignUp.module.css';
import GoogleIcon from '@mui/icons-material/Google';
import image from '../../images/signIn.svg'

import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import {Button, Input, Typography} from "@mui/material";

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
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    async function regWithGoogle() {
        await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        navigate("/")
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
        </div>
    )

}