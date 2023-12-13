import { useEffect, useState } from 'react'
import { getItem } from '../utils/utils'

export const useItems = ({categoryId}) => {

    const [items, setItems] = useState ([])
    const [loading, setLoading] = useState (true)
  
    useEffect(() => {
      setLoading(true)
  
      getItem(true)
  
          .then((data) => { 
            const categoryFilter = categoryId
                                    ? data.filter(prod => prod.category === categoryId)
                                    : data 
  
            setItems(categoryFilter)
          })
          .finally(() => setLoading(false))
  
          .catch((error) => { console.log(error) 
          })
  
    }, [categoryId])

  return {
    loading,
    items
  }
}
