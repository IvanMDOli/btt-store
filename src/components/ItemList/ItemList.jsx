import React from 'react'
import { useState, useEffect } from 'react'
import './itemlist.scss'
import { ItemCard } from '../ItemCard/ItemCard'
import { ItemCount } from '../ItemCount/ItemCount'

export const ItemList = ( { items, greeting } ) => {
  
  const [stockVar, setStockVar] = useState(0)



  const addToCart = (cnt, stk) => {
    setStockVar(stk)
    console.log("Se agregaron ", cnt, " items al carrito")
    console.log("Stock restante ", stk)
  }

  return (
    <>
      <h2>{greeting}</h2>
      <div className='items-list-map'>
        { items.map((e) => (
            <ItemCard 
              key={e.id}
              item={e}
            />
        )) }
      </div>
      <ItemCount onAdd={addToCart} stock={stockVar ? stockVar : 20} />
      <ItemCount onAdd={addToCart} stock={stockVar ? stockVar : 25} />
      <ItemCount onAdd={addToCart} stock={stockVar ? stockVar : 30} />
    </>
  )
}
