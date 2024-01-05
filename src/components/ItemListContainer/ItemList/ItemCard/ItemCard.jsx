import { Link } from 'react-router-dom'
import './itemcard.scss'
import { USDollar } from '../../../../utils/utils'

export const ItemCard = ( { item } ) => {

  return (

    <Link className='item-card' to={`/itemdetail/${item.id}`}>
          <h3>{item.name}</h3>
          <img src={item.img} alt={item.name} />
          <h4>{USDollar.format(item.price)}</h4>
          <p>{item.description}</p>
    </Link>

  )
}
