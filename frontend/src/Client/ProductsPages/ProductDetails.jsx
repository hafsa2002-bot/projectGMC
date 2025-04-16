import React from 'react'
import { useParams } from 'react-router-dom'


function ProductDetails() {
     const {product_id} = useParams()
  return (
    <div className='lg:mt-24 mt-32'>
        product id : {product_id}
        {/* product name : {product.productName} */}
    </div>
  )
}

export default ProductDetails
