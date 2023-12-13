import React from 'react'
import './itemlist.scss'
import { ItemCard } from '../ItemCard/ItemCard'

export const ItemList = ( { title, items } ) => {

  return (
    <>
      <h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      <div className='items-list-map'>
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
