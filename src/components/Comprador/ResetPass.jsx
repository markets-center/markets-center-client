import React, {useState} from "react";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import {useAuth} from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import style from './Style/User.module.css'


function ResetPass({ name, email, image, handleClosePass }) {
    const[state, setState] = useState({pass:'', passConfirm:''})
    const [error, setError] = useState('');
    const {updatePassword} = useAuth();
    const navigate = useNavigate();
  
    function handleChange(e){
        setState({...state, [e.target.name]: e.target.value})
    }
  
    function handleSubmit(e) {
        e.preventDefault()
        if(state.pass !== state.passConfirm) {
            setError("las contraseñas debe ser iguales")
        } else {
            updatePassword(state.pass);
            // dispatch(updateUser(state));
            handleClosePass()
            navigate('/User')
        }
    }

  return (
      <Container component="main" maxWidth="xs" className={style.formPass}
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '10px', 
        textAlign: 'center'
        }}>
          <Typography component="h1" variant="h4">
            Cambio de contraseña
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Container className={style.pic}
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ display: "inline" }}>
                <img
                  src={image}
                  alt=""
                  style={{ padding: "10px", width: "100px" }}
                />
              </Box>
              <Box sx={{display: "block"}}>
              <Typography component="h3" variant="h4">
                {name}
              </Typography>
              <Typography component="h5" variant="h5">
                {email}
              </Typography>
              </Box>
            </Container>
            {error!=='' &&<Typography component="h3" variant="h5">
                {error}
              </Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="pass"
              label="Contraseña"
              name="pass"
              type="password"
              value={state.pass}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="passConfirm"
              label="Confirme nueva contraseña"
              name="passConfirm"
              type="password"
              value={state.passConfirm}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth variant="contained">
              Cambiar Contraseña
            </Button>
          </Box>
      </Container>
  );
}

export default ResetPass;
