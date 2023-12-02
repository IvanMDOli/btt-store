import React from 'react'
import { useState, useEffect } from 'react';
import './itemcount.scss'

export const ItemCount = ( { stock, initial = 1, onAdd } ) => {

    const [count, setCount] = useState(initial);
    const [addToCartBool, setAddToCartBool] = useState(false);
    const [stockRestante, setStockRestante] = useState(stock);

    const sumarCarrito = () => {

        if (count < stock && stockRestante > 0) {
            setCount(count + 1)
        }
    }

    const restarCarrito = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    const agregarAlCarrito = () => {

        if (stockRestante === 0) {
            console.log("No hay mas Stock")
        }

        else {
        setStockRestante(stockRestante - count)
        setAddToCartBool(!addToCartBool)
        }
    }

    useEffect( () => {

            if (addToCartBool){
                onAdd(count, stockRestante)
                setAddToCartBool(!addToCartBool)
                setCount(initial)
            }

            else if (stockRestante === 0) {
                setCount(0)
            }
 
    }, [addToCartBool])

    return (
        <div className='counter'>
            <div className='counter-inputs'>
                <button value="-" onClick={restarCarrito} className='counter-button'>-</button>
                <input className={stockRestante === 0 ? 'counter-display-off' :'counter-display'} type="number" value={count} readOnly/>
                <button value="+" onClick={sumarCarrito} className='counter-button'>+</button>
            </div>
            <button onClick={agregarAlCarrito} className='agregar-carrito-boton'>Agregar al carrito</button>
        </div>
  )
}