import React from 'react'
import { ItemCount } from './ItemCount'
import './itemlistcontainer.scss'

export const ItemListContainer = ( { greeting } ) => {

  return (

    <div className='item-container'>
      <h1>{greeting}</h1>
        <ItemCount />
    </div>
  )
}
