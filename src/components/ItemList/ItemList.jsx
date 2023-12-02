import React from 'react'
import './itemlist.scss'
import { ItemCard } from '../ItemCard/ItemCard'
import { ItemCount } from '../ItemCount/ItemCount'

export const ItemList = ( { productos } ) => {

  const addToCart = (cnt, stk) => {
    console.log("Se agregaron ", cnt, " items al carrito")
  }

  return (
    <>
      <h2>Productos</h2>
      <div className='items-list-map'>
        { productos.map((e) => (
            <ItemCard 
              key={e.id}
              item={e}
            />
        )) }
      </div>
      <ItemCount onAdd={addToCart} stock={20} />
      <ItemCount onAdd={addToCart} stock={25} />
      <ItemCount onAdd={addToCart} stock={30} />
    </>
  )
}
