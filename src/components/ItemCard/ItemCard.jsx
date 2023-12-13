import { Link } from 'react-router-dom'
import './itemcard.scss'

export const ItemCard = ( { item } ) => {


  return (

    <Link className='item-card' to={`/itemdetail/${item.id}`}>

        <h3>{item.name}</h3>
        <img src={item.img} alt="#" />
        <h4>{item.price} U$D</h4>
        <p>{item.description}</p>
        
    </Link>

  )
}
