import React, { useContext } from 'react'
import './cartwidget.scss'
import { Icon } from '@iconify/react'
import { CartContext } from '../../context/CartContext'

export const CartWidget = () => {

    const { itemsInCart } = useContext(CartContext)

    return (
        <>
            <Icon icon="dashicons:cart" color="#313131" width="40" height="40" />
            <span className='notificacion-carrito'>{itemsInCart()}</span>
        </>
    )
}