import { PlusCircle } from 'lucide-react'
import React from 'react'

function ListOfProducts({products, setSelectedProduct, setProductName, setShowProducts}) {
  return (
    <div className='w-full'>
        {
            (products && products.length > 0) 
            ? (
                products.map((product, index) => (
                    <div key={index} >
                        <div
                            
                            onClick={() => {
                                setSelectedProduct(product)
                                setProductName(product.productName)
                                setShowProducts(false)
                            }}
                            className='cursor-pointer py-2 px-2 truncate whitespace-nowrap overflow-hidden'
                        >
                            {product.productName}
                        </div>
                        <hr className='text-gray-300'/>
                    </div>
                ))
            ):(
                <div className='text-blue-600 flex justify-center items-center font-semibold py-2 gap-2'><PlusCircle size={17} /> Add new Item </div>
            )
        }
    </div>
  )
}

export default ListOfProducts
