import { Check, Heart, ImageOff, ShoppingCart, X } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {useCart} from '../../CartContext'

function ProductItem({product}) {
    const [favorite, setFavorite] = useState(false)
    const [heartHover, setHeartHover] = useState(false)
    const [cartHover, setCartHover] = useState(false)
    const {addToCart, addToFavorites, favorites, setFavorites, currency} = useCart()
    const [showMessage, setShowMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;

    const addToCartFunction = () => {
        if(product.qty - product.expiredQty > 0){
            addToCart(product)
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 1500)
        }else if(product.qty === 0 || product.qty-product.expiredQty <= 0){
            setShowMessage(true)
            setTimeout(() => setShowMessage(false), 1500)
        }
    }

    const addToFavoritesFunction = (x) => {
        if(x){
            // add to favorite
            setFavorite(true)
            addToFavorites(product)
        }else{
            // remove it from favorites 
            setFavorite(false)
            const updatedList = favorites.filter((fav) => fav._id !== product._id)
            localStorage.setItem('favorites', JSON.stringify(updatedList))
            setFavorites(updatedList)
        }
    }

    useEffect(() => {
        const isFavorite = favorites?.some((fav) => fav._id === product._id)
        setFavorite(isFavorite)
    }, [favorites, product._id])
    

  return (
    <>
        <div
            className='lg:w-60 w-40 shadow-lg  overflow-hidden hover:shadow-lg hover:shadow-gray-500 border border-gray-300 rounded-xl pb-3 group'
        >
            <div className='relative'>
                <Link onClick={() => window.scrollTo(0, 0)} to={`/products/${product._id}`} className='relative'>
                    {
                        product.productPhoto 
                            ?(
                                <div className='lg:h-64 h-56 w-full lg:p-7 p-5'>
                                    <img className='w-full h-full ' src={`${apiUrl}${product.productPhoto}`} />
                                </div>
                            )
                            :(
                                // in case the image doesn't exist : h-72
                                <div className='lg:h-64 h-56 w-full bg-gray-50 relative'>
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                                        <ImageOff size={60} color='rgb(156, 163, 175)' />
                                    </div>
                                </div>
                            )
                    }
                </Link>
                <div className='absolute flex gap-2 bottom-3 right-4 '>
                    <div
                        onClick={(e) => {
                            addToFavoritesFunction(!favorite)
                            e.preventDefault() // to don't follow the link <Link></Link>
                        }}
                        onMouseEnter={() => setHeartHover(true)}
                        onMouseLeave={() => setHeartHover(false)}
                        className='cursor-pointer w-10 h-10 bg-gray-100  rounded-full flex justify-center items-center '  > 
                        <Heart fill={(favorite || heartHover) ? 'red' : '#f3f4f6'} strokeWidth={(favorite || heartHover) ? '0' : '2'} size={21}  /> 
                    </div>
                    <div
                        onClick={(e) => {
                            addToCartFunction()
                            e.preventDefault() // to don't follow the link <Link></Link>
                        }}
                        onMouseEnter={() => setCartHover(true)}
                        onMouseLeave={() => setCartHover(false)} 
                        className='cursor-pointer w-10 h-10 bg-gray-100  rounded-full flex justify-center items-center '  > 
                        <ShoppingCart fill={cartHover ? 'black' : '#f3f4f6'} size={21}/> 
                    </div>
                </div>
            </div>
            <div className='text-center px-2 flex flex-col gap-1.5'>
                <h2 className='font-semibold text-2xl text-yellow-400 text-start px-2'><span className=''>{product.price.toFixed(2)} <span className='text-base'>{currency}</span></span> </h2>
                <h2 className='font-bold text-gray-700 text-start px-2 h-13 overflow-hidden '>{product.productName}</h2>
            </div>
        </div>
        {/* a message in case someone trying to add a product to the cart and it already sold out */}
        {
            showMessage && (
                <div className='px-3 py-2 fixed lg:top-20 top-32 lg:w-auto w-10/12  left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-50 flex justify-center items-center gap-3 border border-gray-300 '>
                    <div className='w-4 h-4 bg-red-700 rounded-full flex justify-center items-center'><X className='text-white' size={12}/></div>
                    <p>Product Almost sold out</p> 
                </div>
            )
        } 
         {/* success message */}
        {
            successMessage && (
                <div className=' py-2 px-2 lg:px-6 text-lg fixed lg:top-22 top-32 left-1/2 z-50 transform -translate-x-1/2 text-black text-center rounded-lg lg:bg-green-50 bg-green-50 flex justify-center items-center gap-3 border border-gray-300 shadow '>
                    <div className='w-6 h-6 bg-green-800 rounded-full flex justify-center items-center'><Check className='text-white' size={15} /></div>
                    <p>Added to cart!</p> 
                </div>
            )
        }
    </>
  )
}

export default ProductItem
