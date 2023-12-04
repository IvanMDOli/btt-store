import './itemcard.scss'
import React, { useEffect, useState } from 'react'

export const ItemCard = ( { item, displayDetail } ) => {

  const [details, setDetails] = useState(false)

  useEffect( () => {

    return () => {
        console.log(details)
      }
    
  }, [details])

    const goToDetails = () => {
      setDetails(!details)
  }

  return (
      <article onClick={goToDetails} className='item-card'>
          <h3>{item.name}</h3>
          <img src={item.img} alt="#" />
          <h4>{item.price} U$D</h4>
          <p>{item.description}</p>
      </article>
  )
}
