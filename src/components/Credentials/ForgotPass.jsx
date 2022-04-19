import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useAuth } from "../../context/AuthContext";

import { Avatar, Button, CssBaseline, TextField } from "@mui/material";
import { Link } from "@mui/material";
import { Grid, Box, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function ForgotPass() {
  const theme = createTheme();
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
    if(email !=='') {
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
    <>
      {message !== ''? <div>Revisa tu correo electronico</div>:
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
              Reset de Contraseña
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
                onChange={handleChange}
              />
              {email === "" && (
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
                Reset
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    {"¿Necesitas una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>}
    </>
  );
}

export default ForgotPass;
