import { useState, useEffect } from 'react';
import React from 'react'
import './itemcount.scss'

export const ItemCount = ( { stock, initial = 1, onAdd } ) => {

    let [count, setCount] = useState(initial);
    let [addToCart, setAddToCart] = useState(false);
    

    const sumarCarrito = () => {

        if (count < stock) {
            setCount(count + 1)
        }
    }

    const restarCarrito = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const agregarAlCarrito = () => {
        setAddToCart(!addToCart)
    }

    useEffect( () => {
            if (addToCart){
                console.log("Se agregaron ", count, " items al carrito.")
                onAdd = addToCart
                setAddToCart(!addToCart)
                setCount(initial)
            } 
 
    }, [addToCart])

    return (
        <div className='counter'>
            <div className='counter-inputs'>
                <button value="-" onClick={restarCarrito} className='counter-button'>-</button>
                <input className='counter-display' type="number" value={count} readOnly/>
                <button value="+" onClick={sumarCarrito} className='counter-button'>+</button>
            </div>
            <button onClick={agregarAlCarrito} className='agregar-carrito-boton'>Agregar al carrito</button>
        </div>
  )
}