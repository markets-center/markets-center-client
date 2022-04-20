import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from '@mui/material/';
import { MenuItem } from "@mui/material";
import { getAllCategories } from '../../redux/actions/a.category';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';


export default function Filters() {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState('');
  const [selected, setSelected] = useState('')
  const allCategories = useSelector(state => state.allCategories)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };
  console.log(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e, newValue) => {
    e.preventDefault()
    let category = categories.length === 0 ? e.target.textContent : '-' + e.target.textContent
    setCategories((prev) => prev + category);
    setSelected(newValue);
  };

  // useEffect(() => {
  //   dispatch('Proximamente')
  // },categories)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  return (
    <Tabs
      textColor="inherit"
      indicatorColor="secondary"
      variant='fullWidth'
      onChange={handleChange}
      value={selected}
    >
      <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MenuIcon sx={anchorEl ? { width: 30, height: 30, color: 'red' } : { width: 30, height: 30, color: 'background.paper' }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {
            allCategories?.map(element => {
              return (<MenuItem key={element._id} onClick={handleChange} value={element.name}>{element.name}</MenuItem>)
            })
          }
        </Menu>
      </React.Fragment>
      <Tab value={allCategories[0]?.name} label={allCategories[0]?.name} />
      <Tab value={allCategories[1]?.name} label={allCategories[1]?.name} />
      <Tab value={allCategories[2]?.name} label={allCategories[2]?.name} />
    </Tabs>
  )
}