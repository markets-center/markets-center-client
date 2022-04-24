import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordersBySeller } from '../../../redux/actions/a.seller.js'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.js'
import ListItem from './ListItem.jsx'

import NavBar from '../../NavBar/NavBar.jsx'
import {Button} from '@mui/material'


export default function HistoryHome(){
    const navigate = useNavigate()
    const {oneUser} = useAuth()
    const history = useSelector(state => state.history)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ordersBySeller(oneUser._id))
    }, [dispatch, oneUser._id])
    return (
        <div>
            <NavBar />
            <Button 
                        onClick={() => navigate('/Login')}
                        variant="contained" 
                        color="primary" 
                        sx={{
                            m: 2,
                            left: '1240px',
                            fontWeight: '600',
                        }}
                    >
                        Volver
                    </Button>
            {
            history.map( order => {
                return (
                    <ListItem element={order}/>
                )
            })
            }
        </div>
    )
}

