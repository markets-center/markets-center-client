import React, { useState } from 'react';
import css from "./SignUp.module.css";
import logo from "../../images/Markets Center.svg";
import { Button, Input, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import image from "../../images/forgot_password.svg";
import { Link } from "react-router-dom";


export default function ForgotPass2() {
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setEmail(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (email !== '') {
            setError("Debe ingresar una mail")
        }
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(email)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <div className={css.content_all}>
            <div className={css.content_form}>
                <img src={logo} alt='logo MC' className={css.loguito} />
                {message !== '' ? (<div>
                    <h1 className={css.tittle}>Revisa tu correo electrónico</h1>
                    <p>Te enviamos un email de verificación. Ábrelo y toca el enlace de cambiar contraseña para continuar</p>
                    <span className={css.olvidePass}>
                        <Link to="/Login" variant="body2">Iniciar sesión</Link>
                    </span>
                </div>) :
                    <>
                        <h1 className={css.tittle}>Recupera tú contraseña</h1>
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
                            {email === "" && (
                                <Typography component="p" variant="p">
                                    {error}
                                </Typography>
                            )}
                            <Button
                                className={css.btn}
                                type="submit"
                                disabled={loading}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset
                            </Button>
                        </form>
                        <span className={css.text_footer}>
                            ¿Aún no te has registrado? <Link to="/Register">Regístrate</Link>
                        </span>
                    </>
                }
            </div>
            <div className={css.content_image}>
                <img className={css.image} src={image} alt='' />
            </div>
        </div>
    )

}