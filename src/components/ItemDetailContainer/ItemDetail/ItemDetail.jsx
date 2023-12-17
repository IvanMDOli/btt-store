import React from 'react'
import { useState } from 'react'
import { ItemCount } from './ItemCount/ItemCount'
import './itemdetail.scss'

export const ItemDetail = ( { itemDetail } ) => {

    const [count, setCount] = useState(1);
    const [stockRestante, setStockRestante] = useState(itemDetail.stock)

  const addToCart = () => {

    if(stockRestante > 0){

    setStockRestante(stockRestante - count)
    setCount(1)

    }

    else {
      window.alert('No hay mas stock')
    }

  }

  return (
    <section className='item-detail'>
      <div className='img-detailContainer'>
        <img src={itemDetail.img} alt={itemDetail.name} />
      </div>
      <div className='name-desc'>
        <h2>{itemDetail.name}</h2>
        <p>{itemDetail.description}</p>
      </div>
      <div className='itemcount'>
        <h2>{itemDetail.price} U$D</h2>
        <p>Stock restante: {stockRestante}</p>
        <ItemCount count={count} setCount={setCount} stock={stockRestante} />
        <button onClick={addToCart} className='add-cart'>Agregar al Carrito</button>
      </div>
    </section>
  )
}