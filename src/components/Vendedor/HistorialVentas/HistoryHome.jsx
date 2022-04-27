import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordersBySeller } from '../../../redux/actions/a.seller.js'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext.js'
import ListItem from './ListItem.jsx'

import NavBar from '../../NavBar/NavBar.jsx'
import {Button} from '@mui/material'
import OrderDetail from './OrderDetail.jsx'

export default function HistoryHome(){

    // 
    const [openMore, setOpenMore] = useState(false);
    const [input, setInput] = useState('');
    function handleOpenMore(items){
        setInput(items);
        setOpenMore(true)
    }
    const handleCloseMore = () => setOpenMore(false);
    // 
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
                    <div key={order._id}>
                        <ListItem key={order._id} element={order} openMore={openMore} handleOpenMore={handleOpenMore} handleCloseMore={handleCloseMore}/>
                        {input && <OrderDetail input={input} openMore={openMore} handleOpenMore={handleOpenMore} handleCloseMore={handleCloseMore}/>}
                    </div>
                )
            })
            }
        </div>
    )
}

