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

const CardItem = ({item, eventClickCountAdd, eventClickCountRes, eventClickRemoveItem, id, quanty, stock}) => {

  const [active, setActive] = useState(true);
  const [activeStock, setActiveStock] = useState(false);
  
  useEffect(() => {
    quanty >= stock ? setActiveStock(true) : setActiveStock(false)
    quanty > 1 ? setActive(false) : setActive(true)  
  }, [quanty])
  
  return (
    <div>
      {
        <Grid container visibility={true} >
          <Grid item xs={2}>
            <div className="item content-img">
              <Avatar
                alt="Remy Sharp"
                src={item.image}
                sx={{ width: 56, height: 56 }}
              />
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="item content-detail">
              <div className="detail item-tittle">
                <Typography variant="subtitle1">{item.name}</Typography>
                <div className="desc-item">
                  <Typography variant="caption">{accounting.formatMoney(item.price, '$')}</Typography>
                  <Typography variant="caption">Stock: {item.stock}</Typography>
                </div>
              </div>
              <div className="detail item-count">
                <button
                  disabled={active}
                  className="btn btn-add"
                  onClick={() => {
                    eventClickCountRes(item.price, id, (quanty - 1))
                  }}
                >
                  -
                </button>
                <input
                  type="numer"
                  className="btn lb-count"
                  onChange={() =>{}}
                  value={quanty}
                  disabled={true}
                />
                <button
                  disabled={activeStock}
                  className="btn btn-res"
                  onClick={() => {
                    eventClickCountAdd(item.price, id, (quanty + 1))
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
                eventClickRemoveItem(item.id);
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
