import React,{useState, useEffect} from 'react'
import axios from 'axios'

function CartElement({productId}) {
    const [product, setProduct] = useState()
    const [qty, setQty] = useState(1)
    const [subTotal, setSubTotal] = useState(1)
    
    useEffect(() => {
        if(product){
            setSubTotal(product.price * qty)
        }
    }, [qty, product])
    useEffect(() => {
        axios.get(`http://localhost:3003/admin/items/view/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log("error: ", error))
    }, [])
  return (
    <div>
        {
            product && (
            <div className='flex justify-between py-5'>
                <div className='flex w-9/12 gap-3 items-center'>
                    <div className='w-20 h-20 rounded-lg border border-gray-300'>
                        {product.productPhoto && (
                            <img src={`http://localhost:3003${product.productPhoto}`} alt={`${product.productName}`} className='w-full h-full' />
                        )}
                    </div>
                    <div className='flex flex-col justify-between w-9/12 gap-3'>
                        <div>
                            <p className='text-lg font-medium text-gray-700'>{product.productName}</p>
                            <p className='text-gray-700'>unit Price: <span className='text-gray-700 font-semibold'>{product.price} MAD</span></p>
                        </div>
                        <div className='bg-white text-black rounded-lg flex justify-between shadow border border-gray-300 w-32 text-lg font-semibold'>
                            <div
                                onClick={() => {qty > 0 && setQty(qty-1)}}
                                className='cursor-pointer w-1/3 text-center text-xl'>
                                -
                            </div>
                            <div className='border-l border-r border-gray-300 w-1/3 text-center'>{qty}</div>
                            <div
                                onClick={() => setQty(qty+1)}
                                className='cursor-pointer w-1/3 text-center text-xl'
                            >
                                +
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between'>
                    <div className='font-mono font-semibold'>{subTotal} MAD</div>
                    <div className='text-red-500 text-lg'>Remove</div>
                </div>
            </div>
            )
        }
        <hr className='text-gray-300 w-11/12 m-auto'/>
    </div>
  )
}

export default CartElement
