import React, {useEffect, useState}from "react";
import "./Carrito.css";
import accounting from 'accounting';
import {
  Grid,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const CardItem = ({id, name, image, price, stock, quantity, eventClickCountAdd, eventClickCountRes, eventClickRemoveItem}) => {

  const [active, setActive] = useState(true);
  const [activeStock, setActiveStock] = useState(false);
  
  useEffect(() => {
    quantity >= stock ? setActiveStock(true) : setActiveStock(false)
    quantity > 1 ? setActive(false) : setActive(true)  
  }, [quantity])
  
  return (
    <div className="card-item-container">
      {
        <Grid container visibility={true} sx={{padding: '10px'}}>
          <Grid item xs={2}>
            <div className="item content-img">
              <Avatar
                alt="Remy Sharp"
                src={image}
                sx={{ width: 100, height: 100 }}
              />
            </div>
          </Grid>
          <Grid item xs={8} >
            <div className="item content-detail">
              <div className="detail item-tittle">
                <Typography variant="h5" gutterBottom='true' className="info-prod">{name}</Typography>
                <div className="desc-item">
                  <Typography variant="caption">Stock: {stock}
                    <IconButton edge="end"  size='small'onClick={() => {
                       eventClickRemoveItem(id);
                    }} sx={{marginLeft:'15px'}}>
                      <DeleteForeverRoundedIcon color="error" size='small'/>
                    </IconButton>
                  </Typography>
                </div>
              </div>
            <div className="detail item-count"> {/* botones para agregar/quitar */}
                <button
                  disabled={active}
                  className="btn btn-add"
                  onClick={() => {
                    eventClickCountRes(price, id, (quantity - 1))
                  }}
                >
                  -
                </button>
                <button className="btn btn-number">{quantity}</button>
                <button
                  disabled={activeStock}
                  className="btn btn-res"
                  onClick={() => {
                    eventClickCountAdd(price, id, (quantity + 1))
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </Grid>
          <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center', paddingTop:'30px'}}> {/* el boton para borrar prod */}
            <Typography variant="h5" className="info-prod">{accounting.formatMoney(price, '$')}</Typography>

          </Grid>
        </Grid>
      }
    </div>
  );
};

export default CardItem;
