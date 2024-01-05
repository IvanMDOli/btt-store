import { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase/config"

export const useItemsDetail = ( { itemId } ) => {

    const [item, setItem] = useState ()
    const [loading, setLoading] = useState (true)

    useEffect(() => {
      setLoading(true)
    
      const docRef = doc(db, 'items', itemId)

      getDoc( docRef )
        .then((resp) => {

          const doc = {
            ...resp.data(),
            id: resp.id
          }

          setItem(doc)
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
