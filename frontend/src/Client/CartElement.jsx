import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useCart} from '../CartContext'

function CartElement({product}) {
    const {cart, setCart} = useCart()
    
    const deleteFromLocalStorage = (productId) => {
        const updatedCart = cart.filter((product) => product._id !== productId)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }

    const updateQty = (productId, action)  => {
        let updatedCart = cart.map(product => {
            if(product._id === productId){
                if(action == "plus"){
                    return {...product, quantity: product.quantity + 1}
                }else if (action == "minus" && product.quantity > 0){
                    return {...product, quantity: product.quantity - 1}
                    
                }
            }
            return product
        })
        
        updatedCart = updatedCart.filter(product => product.quantity > 0)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }
    /*
    useEffect(() => {
        axios.get(`http://localhost:3003/admin/items/view/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log("error: ", error))
    }, [])
    */
    
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
                                onClick={() => updateQty(product._id, "minus")}
                                className='cursor-pointer w-1/3 text-center text-xl'>
                                -
                            </div>
                            <div className='border-l border-r border-gray-300 w-1/3 text-center'>{product.quantity}</div>
                            <div
                                onClick={() => updateQty(product._id, "plus")}
                                className='cursor-pointer w-1/3 text-center text-xl'
                            >
                                +
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between'>
                    <div className='font-mono font-semibold'>{product.quantity * product.price} MAD</div>
                    <div
                        onClick={() => deleteFromLocalStorage(product._id)}
                        className='cursor-pointer text-red-500 text-lg'>Remove</div>
                </div>
            </div>
            )
        }
        <hr className='text-gray-300 w-11/12 m-auto'/>
    </div>
  )
}

export default CartElement
