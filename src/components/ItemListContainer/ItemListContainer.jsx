import React from 'react'
import { useState, useEffect } from 'react'
import { ItemList } from '../ItemList/ItemList'
import { pedirDatos } from '../../utils/utils'
import { Icon } from '@iconify/react';
import './itemlistcontainer.scss'

export const ItemListContainer = ( { greeting } ) => {

  const [items, setItems] = useState ([])

  const [loading, setLoading] = useState (true)


  console.log("Productos", items)

  useEffect(() => {
    setLoading(true)

    console.log("Efecto de montaje")

    pedirDatos(true)

        .then((data) => { 
          setItems(data)
          setLoading(false) })

        .catch((error) => { console.log(error) 
        })

  }, [])
  
  return (

    <section className='item-container'>
      {loading 
        ? <Icon className='loading-icon' icon="svg-spinners:clock" color="#444" width="50" height="50" vFlip={true} />
        : <ItemList greeting={greeting} items={items} />}
    </section>
  )
}
