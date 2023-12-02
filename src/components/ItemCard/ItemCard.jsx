import './itemcard.scss'

import React from 'react'

export const ItemCard = ( { item } ) => {
  return (
    <article className='item-card'>
        <h3>{item.name}</h3>
        <img src={item.img} alt="#" />
        <h4>{item.price} U$D</h4>
        <p>{item.description}</p>
    </article>
  )
}
