import React from 'react'
import { useState } from 'react'
import './itemlist.scss'
import { ItemCard } from '../ItemCard/ItemCard'
import { ItemCount } from '../ItemCount/ItemCount'

export const ItemList = ( { items, greeting } ) => {

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
    </>
  )
}
