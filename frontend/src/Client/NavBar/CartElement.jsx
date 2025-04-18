import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {useCart} from '../../CartContext'
import DeletePopUp from './DeletePopUp'
import { X } from 'lucide-react'

function CartElement({product}) {
    const {cart, setCart} = useCart()
    const [showDeletePopUp, setShowDeletePopUp] = useState(false)
    const [productById, setProductById] = useState({})
    const [message, setMessage] = useState(false)

    const fetchData = (productId) => {
        axios.get(`http://localhost:3003/admin/items/view/${productId}`)
            .then(response => setProductById(response.data))
            .catch(error => console.log("error: ", error))
    }
    
    const updateQty = (productId, action)  => {
        let updatedCart = cart.map(product => {
            if(product._id === productId){
                if(action == "plus"){
                    if(productById.qty > product.quantity){
                        return {...product, quantity: product.quantity + 1}
                    }
                    else{
                        setMessage(true)
                        setTimeout(() => setMessage(false), 3000)
                    }
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
    
    
    useEffect(() => {
        fetchData(product._id)
    }, [])
    
    
  return (
    <div>
        {
            product && (
            <div className='flex justify-between  lg:gap-0 gap-4 py-5'>
                <div className='flex w-9/12 gap-5  items-start'>
                    <div className='w-24 h-24 rounded-lg border border-gray-300 mt-2'>
                        {product.productPhoto && (
                            <img src={`http://localhost:3003${product.productPhoto}`} alt={`${product.productName}`} className='w-full h-full' />
                        )}
                    </div>
                    <div className='flex flex-col justify-between w-9/12 gap-3 h-full'>
                        <div>
                            <p className='text-lg font-medium text-gray-700 w-11/12'>{product.productName}</p>
                            <p className='text-gray-700'>unit Price: <span className='text-gray-700 font-semibold'>{product.price} MAD</span></p>
                        </div>
                        <div className='bg-white text-black rounded-full flex justify-between shadow border border-gray-300 w-32 text-lg font-semibold overflow-hidden'>
                            <div
                                onClick={() => updateQty(product._id, "minus")}
                                className='cursor-pointer w-1/3 text-center text-xl hover:bg-gray-100'>
                                -
                            </div>
                            <div className='border-l border-r border-gray-300 w-1/3 text-center'>{product.quantity}</div>
                            <div
                                onClick={() => {
                                    updateQty(product._id, "plus")
                                }}
                                className='cursor-pointer w-1/3 text-center text-xl hover:bg-gray-100'
                            >
                                +
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between items-end pr-2'>
                    <div className='font-mono font-semibold text-end'>{(product.quantity * product.price).toFixed(2)} MAD</div>
                    <div
                        onClick={() => setShowDeletePopUp(true)}
                        className='cursor-pointer text-red-500 text-lg'
                    >
                        Remove
                    </div>
                    {showDeletePopUp && (<DeletePopUp productId={product._id} setShowDeletePopUp={setShowDeletePopUp} />)}
                </div>
            </div>
            )
        }
        <hr className='text-gray-300 w-11/12 m-auto'/>
        {message && (
            <div className='px-3 py-2 fixed top-20 left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-50 flex justify-center items-center lg:w-auto w-11/12  gap-3 border border-gray-300 '>
                <div className='w-4 h-4 bg-red-700 rounded-full flex justify-center items-center'><X className='text-white' size={12}/></div>
                <p>The maximum available quantity is {productById.qty}</p> 
            </div>
        )}
    </div>
  )
}

export default CartElement
