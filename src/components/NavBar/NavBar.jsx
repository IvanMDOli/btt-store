import React, { useContext } from 'react'
import { CartWidget } from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { Icon } from '@iconify/react';
import logoStore from '../../assets/BackToTheStore.png'
import './navbar.scss'


export const NavBar = () => {

    const { user } = useContext(UserContext) 

    return (
        <header className='header'>
            <div className='logo'>
                <Link to={'/'}><img src={logoStore} alt="BackToTheStore Logo" /></Link>
            </div>
            <nav className='nav-bar'>
                <ul className='botones-nav'>
                    <Link className='links-nav' to={"/products/electronics"}>Electronics</Link>
                    <Link className='links-nav' to={"/products/vehicles"}>Vehicles</Link>
                    <Link className='links-nav' to={"/products/clothes"}>Clothes</Link>
                </ul>
                <ul className='cart-wish'>
                    <Link to={'/cart'}><CartWidget /></Link>
                    <Link to={'/wish-list'}><Icon icon="ph:star-duotone" color="#313131" width="40" height="40" /></Link>
                </ul>
                <ul className='botones-principales'>
                    <Link className='links-principales' to={'/'}>Inicio</Link>
                    {user.logged 
                        ? <Link className='links-principales' to={'/profile'}>{`${user.name}`}</Link>
                        : <Link className='links-principales' to={'/login'}>Login</Link>
                    }
                </ul>
            </nav>
        </header>
    )
}