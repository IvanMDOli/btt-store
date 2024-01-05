import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useItems = ({categoryId}) => {

    const [items, setItems] = useState ([])
    const [loading, setLoading] = useState (true)
  
    useEffect(() => {
      setLoading(true)

      const itemsRef = collection(db, 'items')
      const docsRef = categoryId
                        ? query( itemsRef, where('category', '==', categoryId) )
                        : itemsRef
                        
      getDocs( docsRef )
        .then((resp) => {

          const data = resp.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }))

          setItems(data)
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
