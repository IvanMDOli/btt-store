import React from 'react'
import { CartWidget } from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import './navbar.scss'
import logoStore from '../../assets/BackToTheStore.png'


export const NavBar = () => {
    return (
        <header className='header'>
            <div className='logo'>
                <Link to={'/'}><img src={logoStore} alt="BackToTheStore Logo" /></Link>
            </div>
            <nav className='nav-bar'>
                <ul className='botones-nav'>
                    <Link className='links-nav' to={"/products/electrodomesticos"}>Electrodomesticos</Link>
                    <Link className='links-nav' to={"/products/vehiculos"}>Vehiculos</Link>
                    <Link className='links-nav' to={"/products/ropa"}>Ropa</Link>
                </ul>
                <ul>
                    <Link to={'/cart'}><CartWidget /></Link>
                </ul>
                <ul className='botones-principales'>
                    <Link className='links-principales' to={'/'}>Inicio</Link>
                    <Link className='links-principales' to={'/'}>Login</Link>
                </ul>
            </nav>
        </header>
    )
}