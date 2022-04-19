import React, { useEffect, useState } from "react";
import "./Carrito.css";
import NavBar from "../../components/NavBar/NavBar.jsx";
import {
  Grid,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

export default function Carrito() {
  
  const newItem = [1, 2, 3];
  const [index, setIndex] = useState();

  console.log("INPTU: ", index)

  useEffect(() => {
    newItem.forEach((p, i) => {
      if(index === i) console.log("detectado")
    })
  }, [index]);

  return (
    <div>
      <NavBar searchBar1={false} />
      <div className="car-container">
        <div className="items-content">
          {newItem.map((p, i) => {
            return (
              <>
                <Grid container key={i}>
                  <Grid item xs={2}>
                    <div className="item content-img">
                      <Avatar
                        alt="Remy Sharp"
                        src="https://media.istockphoto.com/photos/mango-picture-id165889914?k=20&m=165889914&s=612x612&w=0&h=zyRoRuQVuQg8xeDW6aj6uK9-TfpmNXlVdggmyicm-nE="
                        sx={{ width: 56, height: 56 }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <div className="item content-detail">
                      <div className="detail item-tittle">
                        <Typography variant="subtitle1">Patatas</Typography>
                        <div className="desc-item">
                          <Typography variant="caption">description</Typography>
                          <Typography variant="caption">Price</Typography>
                        </div>
                      </div>
                      <div className="detail item-count">
                        <button className="btn btn-add" 
                          onClick={() => {
                            setIndex(i)
                          }}
                        >
                          -
                        </button>
                        <input type="text" className="btn lb-count" 
                          defaultValue={index}
                          disabled={true}
                        />
                        <button className="btn btn-res" 
                          onClick={() => setIndex(i)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className="item btn-remove">
                      <IconButton edge="end">
                        <DeleteForeverRoundedIcon color="error" />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
                <Divider/>
              </>
            );
          })}
        </div>
        <div className="pay-container">
          <div className="content-pay tittle-pay">
            <div className="lb-content">
              <Typography variant="body1">Sub Total:</Typography>
              <Typography variant="body1">Iva:</Typography>
              <Typography variant="body1">Total:</Typography>
            </div>
            <div className="lb-content">
              <Typography variant="body1">{"00.0"}</Typography>
              <Typography variant="body1">{"00.0"}</Typography>
              <Typography variant="body1">{"00.0"}</Typography>
            </div>
          </div>
          <hr />
          <div className="content-pay btn-pay">
            <Button variant="outlined" size="small">
              PAGAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
