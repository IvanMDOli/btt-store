import React from 'react'
import './footer.scss'
import { Link } from 'react-router-dom'
import pokeapi from '../../assets/pokeapi.png'
import logoStore from '../../assets/BackToTheStore.png'

export const Footer = () => {
  return (
    <footer className='footer'>
        <h2>footer information</h2>
        <nav className='footer-nav'>
            <ul>
                <Link className='links-footer' to={'/'}>Contact</Link>
                <Link className='links-footer' to={'/pokeapi'}><img src={pokeapi}/></Link>
                <Link className='links-footer' to={'/'}>About Us</Link>
            </ul>
        </nav>
        <p className='p-footer'>Coderhouse - React JS Course - 2023</p>
    </footer>
  )
}
