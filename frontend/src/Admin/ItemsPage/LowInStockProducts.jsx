import axios from 'axios'
import { ArrowLeft, EllipsisVertical, Image } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import SpinnerBlue from '../SpinnerBlue'
import ProductsArray from './ProductsArray'

function LowInStockProducts({products, setProducts}) {
    const [lowInStock, setLowInStock] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/admin/items/lowInStock`)
            .then(response => {
                setLowInStock(response.data)
                setLoading(false)
                // console.log("low in stock products: ", response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [])
  return (
    <ProductsArray products={lowInStock} loading={loading} setProducts={setLowInStock} />
  )
}

export default LowInStockProducts
