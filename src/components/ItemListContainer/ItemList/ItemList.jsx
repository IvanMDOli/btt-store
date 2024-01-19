import React, { useState } from 'react'
import { ItemCard } from './ItemCard/ItemCard'
import { Pagination } from './Pagination/Pagination';
import './itemlist.scss'


export const ItemList = ( { title, items } ) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div className='items-list-map'>
        <h1>{title}</h1>
        <hr/>
        {currentItems.map((e) => (
          <ItemCard
            key={e.id}
            item={e}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />
    </>
  )
}
