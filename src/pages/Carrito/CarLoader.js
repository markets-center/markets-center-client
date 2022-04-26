import React from "react";
import "./Carrito.css";

import { Typography, Button } from "@mui/material";

const CarLoader = ({ msg }) => {
  return (
    <div className="item content-detail">
      <Typography variant='h4'>{msg}</Typography>
      <div className="btn-return">
      <Button variant="outlined" href="/">
        Vámos a Comprar
      </Button>
      </div>
    </div>
  );
};

export default CarLoader;
