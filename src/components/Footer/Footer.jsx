import React from 'react'
import './footer.scss'
import { Link } from 'react-router-dom'
import pokeapi from '../../assets/pokeapi.png'

export const Footer = () => {
  return (
    <footer className='footer'>
        <nav className='footer-nav'>
            <ul>
                <Link className='links-footer' to={'/read-me'}>Read Me</Link>
                <Link className='links-footer' to={'/pokeapi'}><img src={pokeapi}/></Link>
                <Link className='links-footer' to={'/about-me'}>About Me</Link>
            </ul>
        </nav>
        <p className='p-footer'>Coderhouse - React JS Course - 2023</p>
    </footer>
  )
}
