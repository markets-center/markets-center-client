import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";

// import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import ResetPass from './ResetPass'

// import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import UserForm from './UserForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
const stylePass = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '550px',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function UserData() {
  //   const { oneUser } = useAuth();
  const oneUser = useSelector(state => state.oneUser)

  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenPass = () => setOpenPass(true);
  const handleClosePass = () => setOpenPass(false);


  // const navigate = useNavigate();

  return (
    <>
      <Container sx={{ borderBottom: "2px solid black" }}>
        <Container
          sx={{
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            sx={{
              width: "100px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{
            }}>
              <Typography variant='h6' sx={{
                fontWeight: 'bold'
              }}>
                {oneUser.name}
              </Typography>
            </Box>
            <Box>
              <img
                src={oneUser.image}
                alt=""
                style={{ width: "150px", borderRadius: "50%", objectFit: 'cover' }}
              />
            </Box>
          </Container>
          <Container
            sx={{
              width: "1400px",
              height: "200px",
              margin: "0 50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container
              sx={{
                height: "160px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Box sx={{ display: "inline" }}>
                <Typography component="h5" variant="h5">Dirección:</Typography>
                <Typography >{oneUser.address}</Typography>
              </Box>
              <Box>
                <Typography component="h5" variant="h5">Teléfono: </Typography>
                <Typography>{oneUser.phone}</Typography>
              </Box>
            </Container>
            <Container
              sx={{
                height: "160px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <Box>
                <Typography component="h5" variant="h5">E-mail: </Typography>
                <Typography >{oneUser.email}</Typography>
              </Box>
              <Box>
                <Typography component="h5" variant="h5">DNI: </Typography>
                <Typography >{oneUser.IdDocument}</Typography>
              </Box>
            </Container>
          </Container>
        </Container>
        <Container
          sx={{
            height: "60px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Actualizar Datos
          </Button>
          <Button
            onClick={handleOpenPass}
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, height: "50px" }}
          >
            Cambio de contraseña
          </Button>
        </Container>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UserForm
            name={oneUser.name}
            email={oneUser.email}
            image={oneUser.image}
            IdDocument={oneUser.IdDocument}
            phone={oneUser.phone}
            address={oneUser.address}
            userId={oneUser.userId}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <Modal
        open={openPass}
        onClose={handleClosePass}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylePass}>
          <ResetPass
            name={oneUser.name}
            email={oneUser.email}
            image={oneUser.image}
            handleClosePass={handleClosePass}
          />
        </Box>
      </Modal>
    </>
  );
}
