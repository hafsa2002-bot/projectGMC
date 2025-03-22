import { Info, X } from 'lucide-react'
import React from 'react'
import {useCart} from '../../CartContext'

function DeletePopUp({productId, setShowDeletePopUp}) {
    const {cart, setCart} = useCart()
    const deleteFromLocalStorage = (prdtId) => {
        const updatedCart = cart.filter((product) => product._id !== prdtId)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }
  return (
    <div className='w-screen h-screen  top-0 right-0 fixed flex justify-center  items-center'style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <div className=' bg-white opacity-100 px-5 w-96 py-4 rounded-md shadow-md flex flex-col  gap-8'>
            <div className=''>
                <div className='flex justify-between items-center w-full'>
                    <div className='text-center'>
                        <p className='text-xl font-semibold mb-1'>Remove Product</p>
                    </div>
                    <div 
                        className='cursor-pointer w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center'
                        onClick={() => setShowDeletePopUp(false)}
                    >
                        <X/>
                    </div>
                </div>
                <div className='text-gray-600'>
                    <p>Remove item from cart ?</p>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {/* confirm the delete */}
                <button 
                    onClick={() => {
                        deleteFromLocalStorage(productId)
                        setShowDeletePopUp(false)}}
                    className='font-semibold cursor-pointer px-5 py-3 bg-red-600 text-white text-base rounded-full'>Remove</button>
                {/* cancel the delete */}
                <button
                    onClick={() => setShowDeletePopUp(false)}
                    className='font-semibold cursor-pointer bg-gray-100 text-black  px-5 py-3 text-base rounded-full'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeletePopUp
