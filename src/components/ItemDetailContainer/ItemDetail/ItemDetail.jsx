import React, { useContext } from 'react'
import { useState } from 'react'
import { ItemCount } from './ItemCount/ItemCount'
import './itemdetail.scss'
import { CartContext } from '../../../context/CartContext'

export const ItemDetail = ( { itemDetail } ) => {

    const [count, setCount] = useState(1);
    const [stockRestante, setStockRestante] = useState(itemDetail.stock)

    const [showFullImage, setShowFullImage] = useState(false);
    const [clickedImage, setClickedImage] = useState(null);

  const { addToCart } = useContext(CartContext)

    const handleClick = (image) => {
      setClickedImage(image);
      setShowFullImage(true);
    };
  
    const handleClose = () => {
      setShowFullImage(false);
      setClickedImage(null);
    };

  const handleAdd = () => {

    if(stockRestante > 0){

    setStockRestante(stockRestante - count)
    setCount(1)

    const itemToCart = {
      ...itemDetail,
      count
    }

    addToCart(itemToCart)
    }

    else {
      window.alert('No hay mas stock')
    }

  }


  return (
    <section className='item-detail'>
      <div className='img-detailContainer'>
        <img onClick={() => handleClick(itemDetail.img)} src={itemDetail.img} alt={itemDetail.name} />
      </div>
      <div className='name-desc'>
        <h2>{itemDetail.name}</h2>
        <h3>Description</h3>
        <p>{itemDetail.description}</p>
      </div>
      <div className='itemcount'>
        <h2>{itemDetail.price} U$D</h2>
        <p>Stock restante: {stockRestante}</p>
        <ItemCount count={count} setCount={setCount} stock={stockRestante} />
        <button onClick={handleAdd} className='add-cart'>Agregar al Carrito</button>
      </div>
      {showFullImage && (
        <div className='fullSizeImg-div' onClick={handleClose}>
          <img className='fullSizeImg' src={clickedImage} alt={itemDetail.name}/>
        </div>
      )}
    </section>
  )
}