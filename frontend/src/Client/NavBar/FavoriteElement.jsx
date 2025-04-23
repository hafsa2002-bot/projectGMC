import React, {useState, useEffect} from 'react'
import {useCart} from '../../CartContext'
import axios from 'axios'
import { Check, Heart, Plus, ShoppingCart, X } from 'lucide-react'
function FavoriteElement({product}) {
    const {cart, favorites, setFavorites, addToCart} = useCart()
    const [productById, setProductById] = useState({})
    const [showMessage, setShowMessage] = useState(false)
    const [isInCart, setIsInCart] = useState(false)

    const fetchData = (productId) => {
        axios.get(`http://localhost:3003/admin/items/view/${productId}`)
            .then(response => setProductById(response.data))
            .catch(error => console.log("error: ", error))
    }

    const removeFromFavorites = (prdId) => {
        const updatedList = favorites.filter((product) => product._id !== prdId)
        localStorage.setItem('favorites', JSON.stringify(updatedList))
        setFavorites(updatedList)
    }

    const addToCartFunction = () => {
        if(productById.qty > 0){
            addToCart(product)
            setIsInCart(true)
        }else if(productById.qty === 0){
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000)
        }
    }

    useEffect(() => {
        fetchData(product._id)
        const isProductInCart = cart.some(item => item._id === product._id)
        setIsInCart(isProductInCart)
    }, [cart, product._id])
  return (
    <div>
        {
            product && (
                <div className='flex justify-between  lg:gap-0 gap-4 py-5'>
                    <div className='flex lg:w-9/12 gap-5  items-center'>
                        <div className='w-24 h-24 rounded-lg border border-gray-300 mt-2'>
                            {product.productPhoto && (
                                <img src={`http://localhost:3003${product.productPhoto}`} alt={`${product.productName}`} className='w-full h-full' />
                            )}
                        </div>
                        <div className='flex flex-col justify-start items-start w-9/12 gap-2 h-full'>
                            <p className='text-lg font-medium text-gray-700 w-11/12'>{product.productName}</p>
                            <div className='font-mono font-semibold text-end'>{(product.price).toFixed(2)} MAD</div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-between items-end pr-2'>
                        <div
                            onClick={() => removeFromFavorites(product._id)}
                            className='cursor-pointer border border-gray-300 bg-gray-100 shadow w-8 h-8 flex justify-center items-center rounded-full text-red-500 text-lg'
                        >
                            <Heart size={21} fill='red' strokeWidth='0' />
                        </div>
                        <div>
                            <div
                                onClick={() => addToCartFunction()} 
                                className='bg-gray-100 border border-gray-300 hover:bg-gray-300 cursor-pointer flex  text-sm px-2 py-1 rounded-full'>
                                {isInCart 
                                    ?  <div className='flex justify-center items-center gap-1.5'><Check size={17} /> In Cart</div>
                                    : <p><span className='lg:block hidden'>Add to cart</span> <span className='lg:hidden flex justify-center gap-1 items-center'><ShoppingCart size={17}/> Add</span></p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        <hr className='text-gray-300 w-11/12 m-auto'/>
        {
            showMessage && (
                <div className='px-3 py-2 fixed lg:top-20 top-32 lg:w-auto w-10/12  left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-50 flex justify-center items-center gap-3 border border-gray-300 '>
                    <div className='w-4 h-4 bg-red-700 rounded-full flex justify-center items-center'><X className='text-white' size={12}/></div>
                    <p>Product Almost sold out</p> 
                </div>
            )
        } 
    </div>
    
  )
}

export default FavoriteElement
