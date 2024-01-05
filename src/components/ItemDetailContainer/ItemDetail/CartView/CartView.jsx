import React, { useContext } from 'react'
import './cartview.scss'
import { CartContext } from '../../../../context/CartContext'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { USDollar } from '../../../../utils/utils';

export const CartView = () => {

    const { cart } = useContext(CartContext)

    if(cart.length === 0) {
        return (
          <section className="cartview-container">
            <div className='cartview-empty'>
              <Icon className='empty-icon' icon="solar:cart-broken" color="white" width="100" height="100" />
            </div>
          </section>
        )
      } 

    return (
        <Link className='cartview-container' to={'/cart'}>
            <h2>Cart View</h2>
            {
                cart.map((item) => (
                    <li key={item.id} className="li-cartview">
                        
                        <div className='itemInfo-cartview'>
                            <img src={item.img} alt={item.name}/>
                            <div>
                                <h3>{item.name}</h3>
                                <p>{USDollar.format(item.price * item.count)}</p>
                                <p>Cantidad: {item.count}</p>
                                <p>c/u: U$D {item.price}</p>
                            </div>
                        </div>
                    </li>
                ))
            }
        </Link>
    )
}
