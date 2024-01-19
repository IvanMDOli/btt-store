import React from 'react'
import { Link } from 'react-router-dom'
import pokeapi from '../../assets/pokeapi.png'
import './footer.scss'


export const Footer = () => {
  return (
    <footer className='footer'>
        <nav className='footer-nav'>
            <ul>
                <Link className='links-footer' to={'/orders'}>Orders</Link>
                <Link className='links-footer' to={'/pokeapi'}><img src={pokeapi}/></Link>
                <Link className='links-footer' to={'/about-me'}>About Me</Link>
            </ul>
        </nav>
        <p className='p-footer'>Coderhouse - React JS Course - 2023</p>
    </footer>
  )
}
