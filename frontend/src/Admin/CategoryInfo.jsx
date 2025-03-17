import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function CategoryInfo() {
    const {categoryId} = useParams()
    const [categoryInfo, setCategoryInfo] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3003/admin/items/category/${categoryId}`)
            .then(response => {
                setCategoryInfo(response.data)
                console.log("Category by Id: ", response.data)
            })
            .catch(error => console.log("Error: ", error))
    }, [])
  return (
    <div>
        <p>{categoryInfo.categoryName}</p>
        { (Array.isArray(categoryInfo.products) && categoryInfo.products.length > 0)  &&
            (categoryInfo.products.map((product, index) => (
                <p>Produit {index}: {product.productName}</p>
            )))
        }
    </div>
  )
}

export default CategoryInfo
