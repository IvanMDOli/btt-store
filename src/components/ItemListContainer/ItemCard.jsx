import React from 'react'
import { ItemCount } from './ItemCount'
import './itemcard.scss'
import imagen from '../../assets/imagen-prueba.jpg'

export const ItemCard = ( { itemStock } ) => {
  return (
    <div className='item-card'>
        <h3>Delorean</h3>
        <img src={imagen} alt="imagen-prueba" />
        <ItemCount onAdd={false} stock={itemStock}/>
    </div>
  )
}
