import React from 'react'
import './itemlist.scss'
import { ItemCard } from './ItemCard/ItemCard'

export const ItemList = ( { title, items } ) => {

  return (
    <>
      <div className='items-list-map'>
        <h1>{title}</h1>
        <hr/>
        { items.map((e) => (
            <ItemCard 
              key={e.id}
              item={e}
            />
        )) }
      </div>
    </>
  )
}
