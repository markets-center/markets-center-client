import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

import { useAuth } from "../../context/AuthContext";
import { auth } from "../../firebase";

import {Avatar, Button, CssBaseline, TextField} from '@mui/material';
import {Link} from "@mui/material";
import {Grid, Box, Typography, Container} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function LogUser() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const theme = createTheme();

  function handldeCange(e) {
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
            Inicia sesión
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >

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
                {error}
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
                        {user.password === "" && (
              <Typography component="p" variant="p">
                {errorMail}
              </Typography>
            )}
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={regWithGoogle}
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresa con Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"¿No tienes cuanta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}