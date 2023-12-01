import React from 'react'
import { useState, useEffect } from 'react'
import { ItemList } from '../ItemList/ItemList'
import { pedirDatos } from '../../utils/utils'
import { Icon } from '@iconify/react';
import './itemlistcontainer.scss'

export const ItemListContainer = ( { greeting } ) => {

  const [productos, setProductos] = useState ([])

  const [loading, setLoading] = useState (true)

  console.log("Productos", productos)

  useEffect(() => {
    setLoading(true)
    console.log("Efecto de montaje")
    pedirDatos(true)
        .then((data) => { 
          setProductos(data)
          setLoading(false) })
        .catch((error) => { console.log(error) 
        })
  }, [])
  
  return (

    <section className='item-container'>
      {loading 
        ? <Icon className='loading-icon' icon="svg-spinners:clock" color="#444" width="50" height="50" vFlip={true} />
        : <ItemList productos={productos} />}
    </section>
  )
}
