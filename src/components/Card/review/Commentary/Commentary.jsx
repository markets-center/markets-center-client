import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Review from "../Review";
import s from './Commentary.module.css'
import Chip from '@mui/material/Chip';

export default function Commentary({ user }) {
  return (
    <div>
      {user.length > 0 ?
      (<List className={s.container}>
        {
          user?.map(element => {
            return (
              <div className={s.commentary}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={element.name} secondary={element.fecha} />
                  <Review rating={element.rating} size={10}/>
                </ListItem>
                <Typography>{element.review}</Typography>
                <Divider className={s.divider}/>
              </div>
            )
          })
        }
      </List>
      ) :
        <div className={s.noCommentary}>
          <Divider><Chip label="NO TIENE REVIEWS"/></Divider>
          <p className={s.noCommentaryText}>Por el momento este producto no tiene reviews, compralo y se el primero</p>
          <Divider/>
        </div>
        }
    </div>
  );
}