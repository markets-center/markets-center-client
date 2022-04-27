import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';


export default function BuyerRoute ({children}) {
    const { currentUser} = useAuth();

    if(!currentUser){
        <Navigate to='/Login' replace />
    }else {
        if(localStorage.getItem('isAdmin')==='true'){
            return <Navigate to='/Admin' replace />
        } else {
            if(localStorage.getItem('isSeller') === 'true'){
             return <Navigate to='/Profile' replace />   
            }
        }
    }
    return children;
}