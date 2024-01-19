import React, { useContext} from 'react'
import { WishContext } from '../../context/WishContext'
import { USDollar } from '../../utils/utils'
import { Link } from 'react-router-dom'
import './wishlist.scss'


export const WishList = () => {

  const { wishItemList, clearWishList } = useContext(WishContext)

  if(wishItemList == 0) {
    return (
      <section className='section-wishlist'>
        <h1>WISH LIST</h1>
        <h3>Tu wishlist está vacía</h3>
      </section>
    )
  }

  return (
    <section className='section-wishlist'>
      <h1>WISH LIST</h1>
      <ul>
        {wishItemList &&
          wishItemList.map((item) => (
            <li className={item.stock > 0 ? '' : 'sold-out'} key={item.id}>
              <Link to={`/itemdetail/${item.id}`}>
                <img src={item.img} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <h4>{item.stock > 0 ? `Price: ${USDollar.format(item.price)}` : 'Sold Out'}</h4>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
     <button onClick={clearWishList} className='wishlist-button' >Vaciar wishlist</button>
    </section>
  )
}
