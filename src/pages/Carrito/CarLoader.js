import React from "react";
import "./Carrito.css";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Typography, Button } from "@mui/material";

const CarLoader = () => {
  return (
    <div className="item content-detail-empty">
      <Typography variant='h4'sx={{color: 'black'}}>Tu carrito está vacío</Typography>
      <Typography variant='h6' sx={{textAlign: 'center'}}>¿No sabés qué comprar? ¡Cientos de productos te esperan!</Typography>
{/*       <div className="btn-return">
      <Button variant="outlined" href="/" endIcon={<SentimentSatisfiedAltIcon/>}>
        vamos a comprar
      </Button>
      </div> */}
    </div>
  );
};

export default CarLoader;
