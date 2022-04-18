import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";

import {Avatar, Button, CssBaseline, TextField} from '@mui/material';
import {Switch, FormControlLabel, Link} from "@mui/material";
import {Grid, Box, Typography, Container} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SignUp() {
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

  const theme = createTheme();

  function handldeCange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleUserType(e) {
    setSeller((prevState) => !prevState);
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
      await signup(user.email, user.password);
      seller ? navigate("/sellerForm"):navigate("/buyerForm");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function regWithGoogle() {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    seller ? navigate("/sellerForm"):navigate("/buyerForm");  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handldeCange}
            />
            {user.email === "" && (
              <Typography component="p" variant="p">
                {errorMail}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              onChange={handldeCange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirma Contraseña"
              type="password"
              id="passwordConfirm"
              onChange={handldeCange}
            />
            {user.password !== user.passwordConfirm && (
              <Typography component="p" variant="p">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Button
              //   type="submit"
              fullWidth
              variant="contained"
              onClick={regWithGoogle}
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse con Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Login" variant="body2">
                  {"¿Ya tienes una cuenta? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
