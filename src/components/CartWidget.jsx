import React from 'react'
import '../styles/cartwidget.css'
import { Icon } from '@iconify/react'

export const CartWidget = () => {
    return (
        <>
        <a href="#">
            <Icon icon="dashicons:cart" color="#313131" width="40" height="40" />
            <span className='notificacion-carrito'>3</span>
        </a>
        </>
    )
}