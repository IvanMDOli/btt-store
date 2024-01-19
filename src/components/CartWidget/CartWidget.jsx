import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import { CartContext } from '../../context/CartContext'
import './cartwidget.scss'


export const CartWidget = () => {

    const { itemsInCart } = useContext(CartContext)

    return (
        <>
            <Icon icon="dashicons:cart" color="#313131" width="40" height="40" />
            <span className={itemsInCart() === 0 ? 'span-off' : 'span'}>{itemsInCart()}</span>
        </>
    )
}