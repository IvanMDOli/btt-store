import React from 'react'
import { CartWidget } from './CartWidget'
import './navbar.scss'
import logoStore from '../../assets/BackToTheStore.png'


export const NavBar = () => {
    return (
        <header className='header'>
            <div className='logo'>
                <img src={logoStore} alt="BackToTheStore Logo" />
            </div>
            <nav className='nav-bar'>
                <ul className='botones-nav'>
                    <li>Electrodomesticos</li>
                    <li>Vehiculos</li>
                    <li>Ropa</li>
                </ul>
                <ul>
                    <CartWidget />
                </ul>
                <ul className='botones-principales'>
                    <li>Inicio</li>
                    <li>Login</li>
                </ul>
            </nav>
        </header>
    )
}