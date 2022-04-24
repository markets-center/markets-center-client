import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordersBySeller } from '../../../redux/actions/a.seller.js'
import { useAuth } from '../../../context/AuthContext.js'
import ListItem from './ListItem.jsx'


export default function HistoryHome(){
    const {oneUser} = useAuth()
    const history = useSelector(state => state.history)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ordersBySeller(oneUser._id))
    }, [dispatch, oneUser._id])
    return (
        <div>
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

