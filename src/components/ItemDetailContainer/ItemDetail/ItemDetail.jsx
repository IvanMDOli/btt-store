import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemCount } from './ItemCount/ItemCount'
import { CartContext } from '../../../context/CartContext'
import closeIcon from '../../../assets/close-icon.png'
import './itemdetail.scss'
import { CartView } from './CartView/CartView'
import { USDollar } from '../../../utils/utils'
import Swal from 'sweetalert2'

export const ItemDetail = ( { itemDetail } ) => {

    const [count, setCount] = useState(1);
    const [stockRestante, setStockRestante] = useState(itemDetail.stock)

    const [showFullImage, setShowFullImage] = useState(false);
    const [clickedImage, setClickedImage] = useState(null);

    const navigate = useNavigate()

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
      Swal.fire('No hay mas stock')
    }

  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
      itemDetail 
        ? (<section className='item-detail'>
        <div className='close-icon-div'>
          <img onClick={handleBack} src={closeIcon} alt="close-icon" />
        </div>
        <div className='img-detailContainer'>
          <img onClick={() => handleClick(itemDetail.img)} src={itemDetail.img} alt={itemDetail.name} />
        </div>
        <div className='name-desc'>
          <h2>{itemDetail.name}</h2>
          <h3>Description</h3>
          <p>{itemDetail.description}</p>
        </div>
        <div className='itemcount-container'>
          <div className='itemcount'>
            <h2>{USDollar.format(itemDetail.price)}</h2>
            <p>Stock restante: {stockRestante}</p>
            <ItemCount count={count} setCount={setCount} stock={stockRestante} />
            <button onClick={handleAdd} className='add-cart'>Agregar al Carrito</button>
          </div>
        </div>
        <CartView />
        {showFullImage && (
          <div className='fullSizeImg-div' onClick={handleClose}>
            <img className='fullSizeImg' src={clickedImage} alt={itemDetail.name}/>
          </div>
        )}
      </section>)
        : <h2>No se encontraron productos</h2>
  )
}