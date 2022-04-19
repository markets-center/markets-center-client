import React from 'react';
import UserProfile from '../../components/Comprador/UserProfile'
import UserData from '../../components/Comprador/UserData'
import NavBar from '../../components/NavBar/NavBar'


export default function Comprador(){

    return (
        <div>
            <NavBar />
            <UserData />
            <UserProfile/>
        </div>
    )
}