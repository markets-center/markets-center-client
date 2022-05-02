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
    <div>
      {
        <Grid container visibility={true} sx={{padding: '10px'}}>
          <Grid item xs={2}>
            <div className="item content-img">
              <Avatar
                alt="Remy Sharp"
                src={image}
                sx={{ width: 56, height: 56 }}
              />
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="item content-detail">
              <div className="detail item-tittle">
                <Typography variant="subtitle1">{name}</Typography>
                <div className="desc-item">
                  <Typography variant="caption">{accounting.formatMoney(price, '$')}</Typography>
                  <Typography variant="caption">Stock: {stock}</Typography>
                </div>
              </div>
              <div className="detail item-count">
                <button
                  disabled={active}
                  className="btn btn-add"
                  onClick={() => {
                    eventClickCountRes(price, id, (quantity - 1))
                  }}
                >
                  -
                </button>
                <input
                  type="numer"
                  className="btn lb-count"
                  onChange={() =>{}}
                  value={quantity}
                  disabled={true}
                />
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
          <Grid item xs={2}>
            <div className="item btn-remove">
              <IconButton edge="end" onClick={() => {
                eventClickRemoveItem(id);
              }}>
                <DeleteForeverRoundedIcon color="error"/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
      }
    </div>
  );
};

export default CardItem;
