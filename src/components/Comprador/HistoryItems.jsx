import React from "react";
import { ListItem, ListItemText, Avatar } from "@mui/material";
import { IconButton, ListItemAvatar } from "@mui/material";
import { ShoppingBasket, Delete, ExpandMore } from "@mui/icons-material";

function HistoryItems({item, handleOpenMore}) {
  return (
    <div>
      <ListItem
        secondaryAction={
          <>
            <IconButton onClick={()=>handleOpenMore(item)} sx={{ padding: "20px" }} edge="end" aria-label="delete">
              <ExpandMore />
            </IconButton>
            <IconButton sx={{ padding: "20px" }} edge="end" aria-label="delete">
              <Delete />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <ShoppingBasket />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.createdAt} />
        <ListItemText primary={`$ ${item.amount}`} />
        <ListItemText primary={item.status} />
      </ListItem>
    </div>
  );
}

export default HistoryItems;
