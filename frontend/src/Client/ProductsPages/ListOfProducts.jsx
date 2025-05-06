import React from 'react'
import ProductItem from './ProductItem'

function ListOfProducts({products}) {
  return (
   <div className='grid lg:grid-cols-5 grid-cols-2  lg:gap-9 gap-x-3 gap-y-9 lg:px-10 px-3  '>
        {
            products?.map((product, index) => (
                <ProductItem product = {product} key={index}  />
            ))
        }
    </div>
  )
}

export default ListOfProducts
