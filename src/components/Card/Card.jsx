import React, { useState } from "react";
import s from './Card.module.css'
export default function CardProduct(/*nombre, precio, delivery, */){ //deberia recibir props para renderizar segun los productos
    const [hover,setHover] = useState(false);

    function moreInfo(e){
        setHover(true)
    }
    function lessInfo(e){
        setHover(false)
    }
    return (
        <div onMouseEnter={moreInfo} onMouseLeave={lessInfo} className={s.container}>
            <div>
                <img src="https://ferreira.vteximg.com.br/arquivos/ids/226134-588-588/to_21871.jpg?v=636615531533330000" width="200px" alt="producto"/>
            </div>
            <div> Nombre </div>
            <div> Precio </div>
            <div>
                <img src="" alt="carrito"/>
            </div>
            <div>
                <img src="" alt="delivery" />
            </div>
            {hover?<div>
                <div> Vendedor </div>
                <div> Descripcion del producto </div>
                <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Error laudantium corporis qui sapiente ipsam quam sequi tempore temporibus. Repellendus, beatae dolorum ex unde sed eius mollitia repellat quisquam aliquam numquam! </div>
                 </div>:""}
        </div>
        

    )
}