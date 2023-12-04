import React from 'react'
import { useState } from 'react'
import { ItemCount } from '../ItemCount/ItemCount'
import './itemdetail.scss'

export const ItemDetail = ( { itemDetail } ) => {

    const [stockVar, setStockVar] = useState(itemDetail.stock)

    const addToCart = (cnt, stk) => {
        setStockVar(stk)
        console.log("Se agregaron ", cnt, " items al carrito")
        console.log("Stock restante ", stk)
    }

  return (
    <section className='item-detail'>
            <img src={itemDetail.img} alt="#" />
        <div className='name-desc'>
            <h2>{itemDetail.name}</h2>
            <h5>{itemDetail.description}</h5>
        </div>
        <div className='itemcount'>
            <h2>{itemDetail.price} U$D</h2>
            <p>Stock restante ({stockVar})</p>
            <ItemCount onAdd={addToCart} stock={stockVar} />
        </div>
    </section>
  )
}
