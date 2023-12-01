import React from 'react'
import './itemlist.scss'
import { ItemCard } from '../ItemCard/ItemCard'
import { ItemCount } from '../ItemCount/ItemCount'

export const ItemList = ( { productos } ) => {
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
      <ItemCount stock={5} />
      <ItemCount stock={6} />
      <ItemCount stock={7} />
    </>
  )
}
