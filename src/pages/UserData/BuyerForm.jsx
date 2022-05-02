import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postNewUser } from '../../redux/actions/a.users';
import {
  Container,
  Box,
  Button,
  styled,
} from "@mui/material";
import { Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddAPhoto } from "@mui/icons-material/";
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useAuth } from "../../context/AuthContext";

const Input = styled("input")({
  display: "none",
});

function BuyerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme();
  const { currentUser } = useAuth();
  const [disableForm, setDisableForm] = useState(true);
  const [fileInputState, setFileInputState] = useState('');
  const [selectedDate, handleDateChange] = useState(new Date());
  const [data, setData] = useState({ name: '', phone: "", IdDocument: "", address: "" });

  function handleImageChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setFileInputState(reader.result);
    };
  }


  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    let flagDisable = true
    data.name !== '' && currentUser?.displayName !== '' ? flagDisable = true : flagDisable = false
    data.phone === '' ? flagDisable = true : flagDisable = false
    data.IdDocument === '' ? flagDisable = true : flagDisable = false
    data.address === '' ? flagDisable = true : flagDisable = false
    setDisableForm(flagDisable)
  }

  function validateForm(user) {
  }

  function handleSubmit(e) {
    e.preventDefault()
    let uploadImg;
    let img
    if (currentUser.photoURL) {
      uploadImg = false
      img = currentUser.photoURL
    } else {
      if (fileInputState) {
        uploadImg = true
        img = fileInputState
      }
    }
    let userData = {
      isAdmin: false,
      isSeller: false,
      uploadImg,
      name: currentUser?.displayName || data.name,
      userId: currentUser.uid,
      phone: data.phone,
      email: currentUser.email,
      IdDocument: data.IdDocument,
      address: data.address,
      delivery: false,
      image: img,
      dateOfBirth: selectedDate
    };
    validateForm(userData)
    dispatch(postNewUser(userData, currentUser));
    navigate('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Bienvenido {currentUser?.displayName}!
          </Typography>
          <Typography component="h3" variant="h5">
            Por favor, completa tus datos.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {!currentUser?.displayName && <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              onChange={handleChange}
              autoFocus
            />}
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Número de teléfono"
              name="phone"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="IdDocument"
              label="DNI"
              name="IdDocument"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Dirección"
              onChange={handleChange}
              name="address"
              autoFocus
            />
            {!currentUser?.photoURL && (
              <>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    style={{ width: "200px", margin: "5px" }}
                    startIcon={<AddAPhoto />}
                  >
                    Foto de Perfil
                  </Button>
                </label>
              </>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                autoOk
                variant="inline"
                inputVariant="outlined"
                label="Fecha de Nacimiento"
                inputFormat="dd/MM/yyyy"
                value={selectedDate}
                renderInput={(props) => (
                  <TextField {...props} />
                )}
                InputAdornmentProps={{ position: "start" }}
                onChange={(date) => handleDateChange(date)}
              />
            </LocalizationProvider>
            <Button
              disabled={disableForm}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Guardar Datos
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default BuyerForm;
