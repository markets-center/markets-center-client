import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordersBySeller } from '../../../redux/actions/a.seller.js'
import { useAuth } from '../../../context/AuthContext.js'

export default function ListItem(){
    const {oneUser} = useAuth()
    const history = useSelector(state => state.history)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ordersBySeller(oneUser._id))
    })
    console.log(history)
    return (
        <div>
            
        </div>
    )
}