import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import './pokeapi.scss'

export const PokeApi = () => {

    const [ pokemonId, setPokemonId ] = useState(1)
    const { data: pokemon } = useFetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`, [pokemonId])

    const handleSig = () => {
            setPokemonId(pokemonId + 1)
    }

    const handleAnt = () => {
        pokemonId > 1 && setPokemonId(pokemonId - 1)
    }

  return (
    <div className='poke-container'>
        <h1>POKEAPI</h1>
            <button value='ant' onClick={handleAnt} >Anterior Pokemon</button>
            <button value='sig' onClick={handleSig} >Siguiente Pokemon</button>
        {
            pokemon && 
                <div className='poke-info'>
                    <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h3>Base Experience: {pokemon.base_experience}</h3>
                </div>
        }
    </div>
  )
}
