import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

export default function AdminRoute ({children}) {
    
    const { currentUser } = useAuth();
    if(!currentUser){
        return <Navigate to='/Login' replace />;
    }else {
        if(localStorage.getItem('isAdmin')==='false'){
            return <Navigate to='/Login' replace />;
        }
    }

    return children;
}