import React, { useEffect, useState } from 'react'
import { getItem } from '../../utils/utils'

const withProductsData = ( Component ) => {
  
    const WithProductsData = () => {
        const [items, setItems] = useState()
        const [loading, setLoading] = useState()

        useEffect(() => {
            setLoading(true)
            getItem()
                .then((data) => {
                setItems(data)
                })
                .finally(() => [
                    setLoading(false)
                ])
        }, [])

        return <Component items={items} loading={loading} />
    }

    return WithProductsData
}

export default withProductsData
