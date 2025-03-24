import { Check, Heart, ImageOff, ShoppingCart, X } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {useCart} from '../../CartContext'
import axios from 'axios'

function ProductItem({product}) {
    const [favorite, setFavorite] = useState(false)
    // const [addToCart, setAddToCart] = useState(false)
    const navigate = useNavigate()
    const [heartHover, setHeartHover] = useState(false)
    const [cartHover, setCartHover] = useState(false)
    const {cart, setCart, addToCart} = useCart()
    const [productById, setProductById] = useState({})
    const [showMessage, setShowMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [showStockStatus, setShowStockStatus] = useState(false)
    
    const fetchData = (productId) => {
            axios.get(`http://localhost:3003/admin/items/view/${productId}`)
                .then(response => setProductById(response.data))
                .catch(error => console.log("error: ", error))
    }

    useEffect(() => {
        fetchData(product._id)
    }, [productById])

    const addToCartFunction = () => {
        if(productById.qty > 0){
            addToCart(product)
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000)
        }else if(productById.qty === 0){
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 3000)
        }
    }
    

  return (
    <>
        <div
            className='lg:w-64 w-52  overflow-hidden shadow-lg shadow-gray-400 rounded-md pb-3 group'>
            <div className='relative '>
                {
                    product.productPhoto 
                        ?(
                            <>
                                <img className='lg:h-72 h-56 w-full ' src={`http://localhost:3003${product.productPhoto}`} />
                                {/* {((productById?.qty === 0) && showStockStatus) && (
                                    <div className='absolute top-0 py-1.5 w-full text-center text-white text-sm' style={{backgroundColor:"rgba(0, 0, 0, 0.7)"}}>Almost sold out</div>
                                )} */}
                            </>
                        )
                        :(
                            <div className='lg:h-72 w-full bg-gray-50 h-full relative'>
                                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                    <ImageOff size={60} color='rgb(156, 163, 175)' />
                                </div>
                            </div>
                        )
                }
                {/* just a comment */}
                <div>
                {/* <div className='absolute lg:flex hidden gap-2 bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div 
                        className='w-10 h-10 bg-gray-100 hover:bg-black rounded-full flex justify-center items-center cursor-pointer' 
                        // onMouseEnter={() => setHeartColor('white')} 
                        // onMouseLeave={() => setHeartColor('black')}
                    > 
                    <Heart color={heartColor} size={21} /> 
                    </div>
                    <div className='w-10 h-10 bg-gray-100 hover:bg-black rounded-full flex justify-center items-center cursor-pointer'  
                        // onMouseEnter={() => setCartColor('white')} 
                        // onMouseLeave={() => setCartColor('black')}
                    > 
                        <ShoppingCart  color={cartColor} size={21}/> 
                    </div>
                </div> */}
                </div>
                <div className='absolute flex gap-2 bottom-3 right-4 '>
                    <div
                        onClick={() => setFavorite(!favorite)}
                        onMouseEnter={() => setHeartHover(true)}
                        onMouseLeave={() => setHeartHover(false)}
                        className='cursor-pointer w-10 h-10 bg-gray-100  rounded-full flex justify-center items-center '  > 
                        <Heart fill={(favorite || heartHover) ? 'red' : '#f3f4f6'} strokeWidth={(favorite || heartHover) ? '0' : '2'} size={21}  /> 
                    </div>
                    <div
                        onClick={() => addToCartFunction()}
                        onMouseEnter={() => setCartHover(true)}
                        onMouseLeave={() => setCartHover(false)} 
                        className='cursor-pointer w-10 h-10 bg-gray-100  rounded-full flex justify-center items-center '  > 
                        <ShoppingCart fill={cartHover ? 'black' : '#f3f4f6'} size={21}/> 
                    </div>
                </div>
                
            </div>
            <div className='text-center'>
                <h2 className=' pt-2  h-9 overflow-hidden'>{product.productName}</h2>
                <h2 className='font-semibold px-2'><span className='text-xl '>{product.price} <span className='text-sm'>MAD</span></span> </h2>
            </div>
        </div>  
        {
            showMessage && (
                <div className='px-3 py-2 fixed top-36 left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-50 flex justify-center items-center gap-3 border border-gray-300 '>
                    <div className='w-4 h-4 bg-red-700 rounded-full flex justify-center items-center'><X className='text-white' size={12}/></div>
                    <p>Product Almost sold out</p> 
                </div>
            )
        }  
        {
            successMessage && (
                <div className=' py-2 px-3 fixed top-36 left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg bg-white flex justify-center items-center gap-3 border border-gray-200'>
                    <div className='w-4 h-4 bg-green-800 rounded-full flex justify-center items-center'><Check className='text-white' size={12} /></div>
                    <p>Added to cart!</p> 
                </div>
            )
        }
    </>
  )
}

export default ProductItem
