import React, { useState } from "react";
import logo from "../../images/Markets Center.svg";
import css from "./SignUp.module.css";
import {
  Button,
  FormControlLabel,
  Input,
  Switch,
  Typography,
} from "@mui/material";
import image from "../../images/signup.svg";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";
import firebase from "firebase/compat/app";
import { Snackbar } from "@mui/material";
import { SnackbarAlert } from "../../components/Alert/success";

export default function SignUp2() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [seller, setSeller] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleUserType(e) {
    setSeller((prevState) => !prevState);
  }

  function handleClose() {
    setError("");
    setErrorMail("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.email === "") {
      return setErrorMail("Se debe ingresar un email.");
    }
    if (user.password !== user.passwordConfirm) {
      return setError("Las contraseñas deben coincidir");
    }
    try {
      setError("");
      setErrorMail("");
      setLoading(true);
      signup(user.email, user.password, seller)
        .then(() => {
          seller ? navigate("/sellerForm") : navigate("/buyerForm");
        }).catch(() => {
          setError("Error al crear una cuenta")
        })
    } catch (error) {
      setError("Error al crear una cuenta");
    }
    setLoading(false);
  }

  async function regWithGoogle() {
    try {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      seller ? navigate("/sellerForm") : navigate("/buyerForm");
    } catch (error) {
      setError("Error al crear una cuenta");
    }
  }

  return (
    <div className={css.content_all_register}>
      <div className={css.content_form}>
        <img src={logo} alt="logo MC" className={css.loguito} />
        <h1 className={css.tittle}>REGISTRARTE</h1>
        <p>Es rápido y fácil</p>
        <form onSubmit={handleSubmit}>
          <FormControlLabel
            label="Modo vendedor:  "
            labelPlacement="start"
            control={
              <Switch
                onChange={handleUserType}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
          <label className={css.label} htmlFor="">
            Correo electrónico
          </label>
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
              {errorMail}
            </Typography>
          )}
          <label className={css.label} htmlFor="">
            Contraseña
          </label>
          <Input
            autoComplete="new-password"
            className={css.input}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            variant="standard"
            onChange={handleChange}
          />
          <label className={css.label} htmlFor="">
            Confirmar contraseña
          </label>
          <Input
            autoComplete="new-password"
            className={css.input}
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Confirma Contraseña"
            type="password"
            id="passwordConfirm"
            onChange={handleChange}
          />
          {user.password !== user.passwordConfirm && (
            <Typography component="p" variant="p">
              {error}
            </Typography>
          )}
          <span className={css.olvidePass}>
            <Link to="/OlvidoPass" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
          </span>
          <Button
            type="submit"
            className={css.btn}
            disabled={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Registrarse
          </Button>
          <Button
            className={css.btnGoogle}
            type="submit"
            fullWidth
            variant="contained"
            onClick={regWithGoogle}
            sx={{ mt: 3, mb: 2, color: "black" }}
          >
            <GoogleIcon fontSize="small" />
            &nbsp; Registrarse con Google
          </Button>
        </form>
        <span className={css.text_footer}>
          ¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión</Link>
        </span>
      </div>
      <div className={css.content_image}>
        <img className={css.image} src={image} alt="" />
      </div>
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          onClose={handleClose}
          color="error"
          variant="filled"
          severity="error"
        >
          {error}
        </SnackbarAlert>
      </Snackbar>
      <Snackbar
        open={!!errorMail}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <SnackbarAlert
          onClose={handleClose}
          color="error"
          variant="filled"
          severity="error"
        >
          {errorMail}
        </SnackbarAlert>
      </Snackbar>
    </div>
  );
}
