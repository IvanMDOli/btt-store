import React from 'react'
import { ItemList } from './ItemList/ItemList'
import { useItems } from '../../hooks/useItems'
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import './itemlistcontainer.scss'


export const ItemListContainer = () => {

  const { categoryId } = useParams()
  const { items, loading } = useItems( { categoryId } )

  return (

    <section className='item-container'>
      {
        loading 
          ? <Icon className='loading-icon' icon="svg-spinners:clock" color="#444" width="50" height="50" vFlip={true} />
          : <ItemList title={categoryId ? categoryId : 'products'} items={items} />
      }
    </section>
  )
}
