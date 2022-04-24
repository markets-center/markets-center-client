import React, { useState } from 'react';

import NavBar from '../../components/NavBar/NavBar.jsx'
import Categorias from '../../components/Admin/Categorias/Categorias.jsx'
import Usuarios from '../../components/Admin/Usuarios/Usuarios.jsx'


export default function Admin(){
    const [value, setValue] = useState('Categorias');
    return (
        <div>
            <NavBar admin={true} value={value} setValue={setValue}/>
            {
                value === "Usuarios" &&
                <Usuarios />
            }
            {
                value === "Categorias" &&
                <Categorias />
            }
        </div>
    )
}