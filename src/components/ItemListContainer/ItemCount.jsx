import { useState } from 'react';
import React from 'react'
import './itemcount.scss'

export const ItemCount = () => {

    let [count, setCount] = useState(0);
    
    /* Para el contador combiene tener 2 funciones separadas (suma y resta) 
    o se puede tener con un condicional como está hecho?*/

    const contadorCarrito = (e) => {

        if (e.target.value == "-" && count > 0) {
            setCount(count - 1);
        }

        else if (e.target.value == "+") {
            setCount(count + 1);
        }
    }

    const agregarAlCarrito = () => {
        console.log(count);
    }

    return (
        <div className='counter'>
            <h5>Nombre producto</h5>
            <div className='counter-inputs'>
                <button value="+" onClick={contadorCarrito} className='counter-button'>+</button>
                <input className='counter-display' type="number" value={count} readOnly/>
                <button value="-" onClick={contadorCarrito} className='counter-button'>-</button>
            </div>
            <button onClick={agregarAlCarrito} className='agregar-carrito-boton'>Agregar al carrito</button>
        </div>
  )
}
