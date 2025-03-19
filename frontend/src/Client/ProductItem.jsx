import { Heart, ShoppingCart } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

function ProductItem({product, cart, setCart}) {
    const [favorite, setFavorite] = useState(false)
    const [addToCart, setAddToCart] = useState(false)
    const navigaete = useNavigate()
    const [heartHover, setHeartHover] = useState(false)
    const [cartHover, setCartHover] = useState(false)
    // const [cart, setCart] = useState([])
    const handleCart = (productId) => {
        if(!cart.includes(productId)) {
            setCart([...cart, productId])
        }
        // cart.push(productId)
        
    }
    useEffect(() => {
        console.log("cart: ",cart)
    }, [cart])
  return (
    <>
        <div className='lg:w-64 w-52  overflow-hidden shadow-lg shadow-gray-400 rounded-md pb-3 group'>
            <div className='relative'>
                <img className='lg:h-72 h-56 w-full ' src={`http://localhost:3003${product.productPhoto}`} />
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
                        onClick={() => handleCart(product._id)}
                        onMouseEnter={() => setCartHover(true)}
                        onMouseLeave={() => setCartHover(false)} 
                        className='cursor-pointer w-10 h-10 bg-gray-100  rounded-full flex justify-center items-center '  > 
                        <ShoppingCart fill={cartHover ? 'black' : '#f3f4f6'} size={21}/> 
                    </div>
                </div>
                
            </div>
            <div className='text-center'>
                <h2 className=' pt-2  h-9 overflow-hidden'>{product.productName}</h2>
                <h2 className='font-semibold px-2'><span className='text-xl '>{product.price} DH</span> </h2>
            </div>
        </div>    
    </>
  )
}

export default ProductItem
