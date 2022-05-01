import React from 'react'
import {ListItemIcon, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Button} from '@mui/material';
import Style from './FavCard.module.css';
import Favorite from '@mui/icons-material/Favorite';

function FavCard({name, description, image, rating, id, delF}) {

  return (
      <div >
      <ListItem alignItems="flex-start">
        <div className={Style.image}>
        <ListItemAvatar>
          <Avatar alt={name} src={image} />
        </ListItemAvatar>
        </div>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {rating.toFixed(2)} <i className='fa fa-star' />
              </Typography>
              {` — ${description}`}
            </React.Fragment>
          }
        />
        <ListItemIcon>
          <Button>
          <Favorite color='primary' onClick={()=>delF(id)} />
          </Button>
        </ListItemIcon>
      </ListItem>
      <Divider variant="inset" component="li" />
      </div>
  )
}

export default FavCard