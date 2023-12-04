import React from 'react'
import { useState, useEffect } from 'react'
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { getItem } from '../../utils/utils'
import { Icon } from '@iconify/react';
import './itemdetailcontainer.scss'

export const ItemDetailContainer = ( { itemDetailId } ) => {

  const [item, setItem] = useState ()

  const [loading, setLoading] = useState (true)


  useEffect(() => {
    setLoading(true)

    console.log("Efecto de montaje")

    getItem(true)

        .then((data) => { 
          const selectedItem = data.find( (item) => item.id === itemDetailId )
          setItem(selectedItem)
          setLoading(false) })

        .catch((error) => { console.log(error) 
        })

  }, [])
  
  return (

    <section className='item-detail-container'>
      {loading 
        ? <Icon className='loading-icon' icon="svg-spinners:clock" color="#444" width="50" height="50" vFlip={true} />
        : <ItemDetail itemDetail={item}/>}
    </section>
  )
}
