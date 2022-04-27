import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';


export default function CredentialRoute ({children}) {
    const { currentUser} = useAuth();

    if(currentUser){
        if(localStorage.getItem('isAdmin')==='true'){
            return <Navigate to='/Admin' replace />; 
        }else {
            if(localStorage.getItem('isSeller')==='true'){
                return <Navigate to='/Profile' replace />;
            }else {
                return <Navigate to='/User' replace />;
            }
        }
    }
    return children;
}