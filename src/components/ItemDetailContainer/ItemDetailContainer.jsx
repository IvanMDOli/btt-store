import { ItemDetail } from './ItemDetail/ItemDetail';
import { useItemsDetail } from '../../hooks/useItemsDetail';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './itemdetailcontainer.scss';

export const ItemDetailContainer = () => {

  const { itemId } = useParams()

  const { item, loading } = useItemsDetail( { itemId } )
  
  return (

    <section className='item-detail-container'>
      {loading 
        ? <Icon className='loading-icon' icon="svg-spinners:clock" color="#444" width="50" height="50" vFlip={true} />
        : <ItemDetail itemDetail={item}/>}
    </section>
  )
}
