import { useState } from 'react';
import React from 'react'
import '../styles/itemcount.css'

export const ItemCount = ({ carrito, setCarrito }) => {

    let [count, setCount] = useState(0);

    const contadorCarrito = (e) => {

        if (e.target.value == "-" && count > 0) {
            setCount(count - 1);
        }

        else if (e.target.value == "+") {
            setCount(count + 1);
        }
    }

    const agregarAlCarrito = () => {
        const newItem = {
            cantidad: count,
        }
        setCarrito([...carrito, newItem]);

        setCount(0);
    }

    return (
        <div className='contador'>
            <h5>Nombre producto</h5>
            <div>
                <button value="+" onClick={contadorCarrito} className='contador-boton'>+</button>
                <input type="number" value={count} readOnly/>
                <button value="-" onClick={contadorCarrito} className='contador-boton'>-</button>
            </div>
            <button onClick={agregarAlCarrito} className='agregar-carrito-boton'>Agregar al carrito</button>
        </div>
  )
}
