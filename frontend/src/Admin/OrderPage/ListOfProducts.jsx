import React from 'react'

function ListOfProducts({products, setSelectedProduct, setProductName, setShowProducts}) {
  return (
    <div className='w-full'>
        {products?.map((product, index) => (
            <>
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
            </>
        ))}
    </div>
  )
}

export default ListOfProducts
