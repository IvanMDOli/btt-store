import React from 'react'
import { ItemCard } from './ItemCard'
import './itemlistcontainer.scss'

export const ItemListContainer = ( { greeting } ) => {

  return (

    <div className='item-container'>
      <h1>{greeting}</h1>
        <ItemCard itemStock={2} />
        <ItemCard itemStock={3} />
        <ItemCard itemStock={4} />
        <ItemCard itemStock={5} />
        <ItemCard itemStock={6} />
        <ItemCard itemStock={7} />
    </div>
  )
}
