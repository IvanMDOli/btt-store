import { useEffect, useState } from "react"
import { getItem } from '../utils/utils'

export const useItemsDetail = ( { itemId } ) => {

    const [item, setItem] = useState ()
    const [loading, setLoading] = useState (true)

    useEffect(() => {
        setLoading(true)
    
        getItem(true)
    
            .then((data) => { 
              const selectedItem = data.find( (item) => item.id === Number(itemId) )
              setItem(selectedItem)
            })
            .finally(() => setLoading(false) )
    
            .catch((error) => { console.log(error) 
            })
    
      }, [])    

  return {
    item,
    loading
  }
}
