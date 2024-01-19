import { Link } from 'react-router-dom'
import { USDollar } from '../../../../utils/utils'
import './itemcard.scss'


export const ItemCard = ( { item } ) => {

  return (

    <Link className='item-card' to={`/itemdetail/${item.id}`}>
          <h3>{item.name}</h3>
          <img className={item.stock === 0 ? 'imgCard-sin-stock' : 'imgCard'} src={item.img} alt={item.name} />
          <h4 className={item.stock === 0 ? 'no-price' : 'price'}>{item.stock === 0 ? 'Sold Out' : USDollar.format(item.price)}</h4>
          <p>{item.description}</p>
    </Link>

  )
}
