import React, {useEffect, useState}from "react";
import "./Carrito.css";

import {
  Grid,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const CardItem = ({item}) => {

  const [itemCar, setItemcar] = useState(1);
  const [active, setActive] = useState(true);

  const handleAddItemToCart = () => {
    setItemcar(itemCar + 1);
  };

  const handleResItemToCart = () => {
    setItemcar(itemCar - 1);
  };

  const removeItem = (id) => {
    console.log("eliminado")
  }
  
  useEffect(() => {
    itemCar > 1 ? setActive(false) : setActive(true)  
  }, [itemCar])
  
  return (
    <div>
      {
        <Grid container visibility={true}>
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
                  {/* <Typography variant="caption">{item.userId}</Typography> */}
                  <Typography variant="caption">${item.price}</Typography>
                </div>
              </div>
              <div className="detail item-count">
                <button
                  disabled={active}
                  className="btn btn-add"
                  onClick={handleResItemToCart}
                >
                  -
                </button>
                <input
                  type="text"
                  className="btn lb-count"
                  defaultValue={1}
                  value={itemCar}
                  disabled={true}
                />
                <button
                  className="btn btn-res"
                  onClick={handleAddItemToCart}
                >
                  +
                </button>
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="item btn-remove">
              <IconButton edge="end">
                <DeleteForeverRoundedIcon color="error" onClick={removeItem}/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
      }
    </div>
  );
};

export default CardItem;
