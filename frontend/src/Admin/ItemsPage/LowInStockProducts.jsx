import axios from 'axios'
import { ArrowLeft, EllipsisVertical, Image } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import SpinnerBlue from '../SpinnerBlue'
import ProductsArray from './ProductsArray'

function LowInStockProducts() {
    const [lowInStock, setLowInStock] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/lowInStock")
            .then(response => {
                setLowInStock(response.data)
                setLoading(false)
                // console.log("low in stock products: ", response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [lowInStock])
  return (
    <ProductsArray products={lowInStock} loading={loading} />
  )
}

export default LowInStockProducts
