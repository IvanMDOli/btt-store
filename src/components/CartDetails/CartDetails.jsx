import React, { useContext } from 'react'
import './cartdetails.scss'
import { CartContext } from '../../context/CartContext'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { USDollar } from '../../utils/utils';


export const CartDetails = () => {
  
  const { cart, totalCart, clearCart, removeItem } = useContext(CartContext)

  if(cart.length === 0) {
    return (
      <section className="section-details">
        <h1 className='empty-card'>your cart is empty</h1>
        <div className='section-details-empty'>
          <Icon className='empty-icon' icon="solar:cart-broken" color="white" width="200" height="200" />
        </div>
      </section>
    )
  } 

  return (
    <section className="section-details">
      <div className="cart-details">
        <h1>CART</h1>
        <hr/>

        <ul>
            {
                cart.map((item) => (
                  
                      <li key={item.id} className="li-details">
                          <Link className='link-details' to={`/itemdetail/${item.id}`}>
                          <div className='itemInfo-details'>
                              <img src={item.img} alt={item.name}/>
                              <div>
                                  <h3>{item.name}</h3>
                                  <p>{USDollar.format(item.price * item.count)}</p>
                                  <p>Cantidad: {item.count}</p>
                                  <p>c/u: {USDollar.format(item.price)}</p>
                              </div>
                          </div>
                          </Link>
                          <Icon onClick={() => removeItem(item.id)} className='trashIcon-details' icon="memory:trash" />
                      </li>
                    
                ))
            }
        </ul>
        <div className="total-details">
          <div className='buttons-div'>
            <button className='cart-buttons' onClick={clearCart}>Vaciar carrito</button>
            <Link className='cart-buttons' to={'/checkout'}>Terminar Compra</Link>
          </div>
          <h3>TOTAL: {USDollar.format(totalCart())}</h3>
        </div>
      </div>
    </section>
  )
}