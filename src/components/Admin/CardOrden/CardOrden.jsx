import React from 'react'
import style from './CardOrden.module.css'
import { useDispatch } from 'react-redux';
import {useAuth} from '../../../context/AuthContext';
import { Container, Box, Typography, Tooltip, IconButton } from "@mui/material";
import LocalShipping from '@mui/icons-material/LocalShipping';
import {UpdateOrder} from '../../../redux/actions/a.order'
import {allOrders} from '../../../redux/actions/a.admin'
import { formatDate } from '../../../helpers/date';

function CardOrden({o, comprador, estado, vendedores, fecha, id}) {
    let accion = estado==='Aprobada'? 'Despachar' : 'No hay accion disponeble'
    const dispatch = useDispatch();
    const {currentUser} = useAuth()
    async function handleStatus(){
        if(estado==='Aprobada'){
            await dispatch(UpdateOrder({_id:id}, "Despachada", currentUser))
            await dispatch(allOrders(currentUser))
        }
    }
  return (
    <Container className={style.container}>
      
      <Box
        sx={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          marginLeft: '20px'
        }}
      >
        <Typography
            variant='h6'
            color='primary'
          component="h3"
          sx={{
            margin: "5px 0px",
          }}
        >
          {`Comprador:`}
        </Typography>
        <Typography
          component="span"
          sx={{
            margin: "10px 0px",
          }}
        >
          {`${comprador}`}
        </Typography>
        </Box> <Box
        sx={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          marginLeft: '20px'
        }}
      >
        <Typography
            variant='h6'
            color='primary'
          component="h3"
          sx={{
            margin: "5px 0px",
          }}
        >
          {`Vendedores:`}
        </Typography>
        <Typography
          component="span"
          sx={{
            margin: "10px 0px",
          }}
        >
          {`${vendedores}`}
        </Typography>
        </Box> <Box
        sx={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          marginLeft: '20px'
        }}
      >
        <Typography
            variant='h6'
            color='primary'
          component="h3"
          sx={{
            margin: "5px 0px",
          }}
        >
          {`Fecha:`}
        </Typography>
        <Typography
          component="span"
          sx={{
            margin: "10px 0px",
          }}
        >
          {`${formatDate(fecha)}`}
        </Typography>
        </Box> <Box
        sx={{
          width: "250px",
          display: "flex",
          flexDirection: "column",
          marginLeft: '20px'
        }}
      >
        <Typography
            variant='h6'
            color='primary'
          component="h3"
          sx={{
            margin: "5px 0px",
          }}
        >
          {`Estado:`}
        </Typography>
        <Typography
          component="span"
          sx={{
            margin: "10px 0px",
          }}
        >
          {`${estado}`}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
          <Tooltip title={accion} arrow>
            <IconButton
                sx={estado==='Aprobada'?{color:'#FFB233'}:estado==='Rechazada'? {color:'#E2001A'}:estado==='Pendiente'? {color:'#B8B4AE'}:{color:'#6bf178'}}
                onClick={()=>{handleStatus()}}
            >
              <LocalShipping />
            </IconButton>
          </Tooltip>
      </Box>
    </Container>
  )
}

export default CardOrden