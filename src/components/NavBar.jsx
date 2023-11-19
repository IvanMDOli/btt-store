import React from 'react'
import '../styles/navbar.css'
import logoStore from '../assets/BackToTheStore.png'

function NavBar() {
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
                <ul className='botones-principales'>
                    <li>Inicio</li>
                    <li>Login</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;