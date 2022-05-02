import React from "react";
import { Box, Container, Avatar } from "@mui/material";
import { IconButton, Typography } from "@mui/material";
import { ShoppingBasket, ExpandMore } from "@mui/icons-material";
import style from './Style/HistoryItems.module.css'

function HistoryItems({ item, handleOpenMore, handleOpenCancel }) {
  const fecha = `${item.createdAt[8]}${item.createdAt[9]}/${item.createdAt[5]}${item.createdAt[6]}/${item.createdAt[0]}${item.createdAt[1]}${item.createdAt[2]}${item.createdAt[3]}`
  return (
      <Container
        sx={{
          height: "60px",
          width: "850px",
          border: "2px solid gray",
          margin: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            height: "max-content",
          }}
        >
          <Avatar>
            <ShoppingBasket />
          </Avatar>
        </Box>
        <Box>
          <Typography
            component="span"
            sx={{
              margin: "10px 0px",
            }}
          >
            {`Fecha: ${fecha}`}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="span"
            sx={{
              margin: "10px 0px",
            }}
          >
            {`Monto: $ ${item.amount}`}
          </Typography>
          </Box>
          <Box>
          <Typography
            component="span"
            sx={{
              margin: "10px 0px",
            }}
          >
            {`Estado: ${item.status}`}
          </Typography>
        </Box>
        <Box>
        <IconButton
              onClick={() => handleOpenMore(item)}
              sx={{ padding: "20px" }}
              edge="end"
              aria-label="delete"
            >
              <ExpandMore />
            </IconButton>
        </Box>
      </Container>
  );
}


export default HistoryItems;
