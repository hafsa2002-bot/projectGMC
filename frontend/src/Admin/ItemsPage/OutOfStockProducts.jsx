import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ProductsArray from './ProductsArray'

function OutOfStockProducts() {
    const [outOfStockProducts, setOutOfStockProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/admin/items/outOfStock`)
            .then(response => {
                setOutOfStockProducts(response.data)
                setLoading(false)
                console.log("list of products outOfStock: ", response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [])
  return (
    <ProductsArray products={outOfStockProducts} setProducts={setOutOfStockProducts} loading={loading} />
  )
}

export default OutOfStockProducts
