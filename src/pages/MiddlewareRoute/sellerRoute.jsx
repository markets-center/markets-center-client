import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';


export default function SellerRoute ({children}) {
    const { currentUser} = useAuth();
    if(!currentUser){
        return <Navigate to='/Login' replace />
    }else {
        if(localStorage.getItem('isAdmin')==='true'){
            return <Navigate to='/Admin' replace />
        } else {
            if(localStorage.getItem('isSeller') === 'false'){
             return <Navigate to='/User' replace />   
            }
        }
    }
    return children;
}