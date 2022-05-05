import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {updateUser} from '../../redux/actions/a.users';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../../context/AuthContext';
import style from './Style/User.module.css'

import { Container, Box, Button, styled, Typography, TextField } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material/";
import CancelIcon from '@mui/icons-material/Cancel';
 

  const Input = styled("input")({
    display: "none",
  });  

function UserForm({name, email, image, IdDocument, phone, address, userId, handleClose}) {
    const [state, setState] = useState({name:name, email: email, image: image, IdDocument:IdDocument, phone:phone, address: address, userId: userId, uploadImg:false})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {updateEmail, currentUser} = useAuth();


    function handleChange(e){
        setState({...state, [e.target.name]:e.target.value})
    }

    function handleImageChange (e){
      setState({...state, uploadImg:true})
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          setState({...state, image: reader.result});
        };
    }

    function handleSubmit(e){
        e.preventDefault();
        if(email !== state.email) {
          updateEmail(state.email)
        }
        dispatch(updateUser(state, currentUser));
        handleClose()
        navigate('/User')
    }

  return (
    <div>
      <Container component="main" maxWidth="md">
        <CancelIcon color="secondary" className={style.x} onClick={handleClose} />
          <Box className={style.boxForm}>
            <Typography component="h1" variant="h5">
            Datos de Usuario
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
              <Container className={style.containerPic}>  
                <Box sx={{display: 'inline'}}>
              <img
                src={image}
                alt=""
                style={{ padding: "10px", width: "100px" }}
                />
            </Box>
                <label sx={{display: 'inline'}}
                htmlFor="contained-button-file">
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
                    // style={{ width: "200px", margin: "5px" }}
                    startIcon={<AddAPhoto />}
                    >
                        Cambiar Foto de Perfil
                  </Button>
                </label>
                      </Container>
               <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              value={state.name}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={state.email}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Número de teléfono"
              name="phone"
              value={state.phone}
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
              value={state.IdDocument}
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
              value={state.address}
              autoFocus
            />
            
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            </LocalizationProvider> */}
          <Button
              type="submit"
              fullWidth
              variant="contained"
              
            >
              Guardar Datos
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default UserForm