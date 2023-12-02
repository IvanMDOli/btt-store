import React from 'react'
import { useState, useEffect } from 'react';
import './itemcount.scss'

export const ItemCount = ( { stock, initial = 1, onAdd } ) => {

    let [count, setCount] = useState(initial);
    let [addToCartBool, setAddToCartBool] = useState(false);
    let [stockRestante, setStockRestante] = useState(0)

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
        setStockRestante(stockRestante - count)
        setAddToCartBool(!addToCartBool) 
    }

    useEffect( () => {

            if (addToCartBool){
                onAdd(count, stock)
                setAddToCartBool(!addToCartBool)
            } 
 
    }, [addToCartBool])

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