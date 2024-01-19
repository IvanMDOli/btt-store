import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemCount } from './ItemCount/ItemCount'
import { CartContext } from '../../../context/CartContext'
import closeIcon from '../../../assets/close-icon.png'
import { Icon } from '@iconify/react';
import { CartView } from './CartView/CartView'
import { USDollar } from '../../../utils/utils'
import Swal from 'sweetalert2'
import './itemdetail.scss'
import { WishContext } from '../../../context/WishContext'

export const ItemDetail = ( { itemDetail } ) => {

  const { addToCart } = useContext(CartContext)
  const { addToWishArray, removeWishItem } = useContext(WishContext)

  const savedStockFromLocalStorage = localStorage.getItem(`stock_${itemDetail.id}`);
  const parsedSavedStock = savedStockFromLocalStorage && JSON.parse(savedStockFromLocalStorage);
  
  const savedStock = parsedSavedStock === 0 || parsedSavedStock ? parsedSavedStock : (itemDetail.stock || 0);

  const wishListLocalStorage = localStorage.getItem(`wish-list_${itemDetail.id}`);
  const wishListBool = wishListLocalStorage && JSON.parse(wishListLocalStorage) || (false);

  const [count, setCount] = useState(1);
  const [stockRestante, setStockRestante] = useState(savedStock)

  const [showFullImage, setShowFullImage] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);

  const [addToWishList, setAddToWishList] = useState(wishListBool)

  const navigate = useNavigate()

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

  const handleAddToWishList = () => {
    setAddToWishList(!addToWishList)
  }

  useEffect(() => {
    localStorage.setItem(`stock_${itemDetail.id}`, JSON.stringify(stockRestante));
  }, [stockRestante]);

  useEffect(() => {
    localStorage.setItem(`wish-list_${itemDetail.id}`, JSON.stringify(addToWishList))

    if(addToWishList) {
      addToWishArray(itemDetail)
    }
    else {
      removeWishItem(itemDetail.id)
    }
  }, [addToWishList])

  return (
    itemDetail 
      ? (
        <section className='item-detail'>
          <div className='close-icon-div'>
            <img onClick={handleBack} src={closeIcon} alt="close-icon" />
              <Icon onClick={handleAddToWishList} icon={wishListBool ? "uis:favorite" : "mi:favorite"} color="yellow" width="35" height="35" />
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
        </section>
      )
      : <h2>No se encontraron productos</h2>
  )
}