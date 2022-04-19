import React from 'react';

import {Navigate} from 'react-router-dom';

import {useAuth} from '../../context/AuthContext';

export default function LoginButton ({children}) {
    const { currentUser, oneUser } = useAuth();
    if(currentUser) {
        if(oneUser.isSeller){
            return <Navigate to='/Profile' replace />;
        } else{
            return <Navigate to='/User' replace />;
        }
    }
    return children;
}
