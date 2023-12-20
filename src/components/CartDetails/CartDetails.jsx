import React, { useContext } from 'react'
import './cartdetails.scss'
import { CartContext } from '../../context/CartContext'
import { Icon } from '@iconify/react';


export const CartDetails = () => {
  
  const { cart, totalCart, clearCart, removeItem } = useContext(CartContext)

  return (
    <section className="section-details">
      <div className="cart-details">
        <h1>TU COMPRA</h1>
        <hr/>

        <ul>
            {
                cart.map((item) => (
                    <li key={item.id} className="li-details">
                        
                        <div className='itemInfo-details'>
                            <img src={item.img} alt={item.name} className=""/>
                            <div>
                                <h3>{item.name}</h3>
                                <p>U$D {item.price * item.count}</p>
                                <p>Cantidad: {item.count}</p>
                                <p>c/u: U$D {item.price}</p>
                            </div>
                        </div>
                        <Icon onClick={() => removeItem(item.id)} className='trashIcon-details' icon="memory:trash" />
                    </li>
                ))
            }
        </ul>
        <div className="total-details">
          <button onClick={clearCart}>Vaciar carrito</button>
          <h3>TOTAL: U$D {totalCart()}</h3>
        </div>
      </div>
    </section>
  )
}