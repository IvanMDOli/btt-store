import React from 'react'
import './footer.scss'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='footer'>
        <h3>Contacto/Información/Redes</h3>
        <nav className='footer-nav'>
            <ul>
                <Link className='links-footer' to={'/'}>Link 1</Link>
                <Link className='links-footer' to={'/pokeapi'}>PokeApi</Link>
                <Link className='links-footer' to={'/'}>Link 3</Link>
            </ul>
        </nav>
    </footer>
  )
}
