import React from 'react'
import './itemcount.scss'

export const ItemCount = ( { stock, count, setCount } ) => {

    const sumCart = () => {

        if (count < stock) {
            setCount(count + 1)
        }
    }

    const minCart = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    return (
            <div className='counter-inputs'>
                <button value="-" onClick={minCart} className='counter-button'>-</button>
                <span className={stock === 0 ? 'counter-display-off' : 'counter-display'}>{stock === 0 ? 0 : count}</span>
                <button value="+" onClick={sumCart} className='counter-button'>+</button>
            </div>
  )
}