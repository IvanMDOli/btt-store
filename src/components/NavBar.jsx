import React from 'react'
import { CartWidget } from './CartWidget'
import '../styles/navbar.css'
import logoStore from '../assets/BackToTheStore.png'
import carrito from '../assets/carrito.png'

export const NavBar = () => {
    return (
        <div className='nav-bar'>
            <div className='logo'>
                <img src={logoStore} alt="BackToTheStore Logo" />
            </div>
            <nav>
                <ul className='botones-nav'>
                    <li>Electrodomesticos</li>
                    <li>Vehiculos</li>
                    <li>Ropa</li>
                </ul>
                <img className='carrito' rel="carrito-icono" src={carrito} />
                <ul className='botones-principales'>
                    <li>Inicio</li>
                    <li>Login</li>
                </ul>
            </nav>
        </div>
    )
}