import React, {useState, useEffect} from 'react'
import CartElement from './CartElement'
import { ShoppingCart, X } from 'lucide-react'
import {useCart} from '../../CartContext'
import { Link, useNavigate } from 'react-router-dom'

function Cart({setShowCart}) {
  const {cart, setCart} = useCart()
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  const calculateTotal = () => {
    const res = cart.reduce((total, currentValue) => total +(currentValue.price * currentValue.quantity), 0)
    setTotal(res)
  }

  useEffect(() => {
    calculateTotal()
  }, [cart])

  const submitOrder = () => {

  }
  return (
    <div className='bg-white w-[450px] absolute top-32 right-0 border-l border-gray-300 shadow-2xl h-[80vh] pl-5 pr-2 pt-3 pb-10 overflow-y-scroll'>
      <div className='flex justify-between items-center pt-2 pb-4'>
        <p className='text-xl font-mono'>Shopping Cart</p> 
        <div
          onClick={() => setShowCart(false)}
          className='hover:bg-gray-100 cursor-pointer p-1 rounded-full'
        >
          <X/>
        </div>
      </div> 
      {cart.map((product, index) => (
        <CartElement product={product} setShowCart={setShowCart} key={index} />
      ))}
      {
        (cart.length > 0 )
        ?(
          <div className='pt-5'>
            <div className='flex justify-between items-center text-lg font-mono font-semibold'>
              <p className=''>Total</p>
              <p>{total} MAD</p>
            </div>
            <div
              onClick={() => navigate("/checkout")}
              className="cursor-pointer text-center text-white bg-gradient-to-r  from-gray-700 via-gray-800  to-gray-900  px-4 py-2 rounded-lg text-lg font-semibold mt-5"
            >
              <p>Checkout</p>
            </div>
          </div>
        ):(
          <div className=' flex flex-col justify-center items-center gap-6 h-[60vh]'>
            <div className='flex flex-col justify-center items-center text-gray-300'>
              <ShoppingCart size={80} fill="rgb(203, 213, 225)"/>
              <p className='text-gray-500 font-semibold'>Your cart is empty</p>
            </div>
            <div 
              onClick={() => {
                navigate("/products")
                setShowCart(false)
              }}
              className=' cursor-pointer border w-8/12 text-white bg-gradient-to-tr from-gray-500 via-gray-600 to bg-gray-900 font-semibold text-center text-lg py-1.5 rounded-full'
            >
              <div>Explore items</div>
            </div>
          </div>
        )
      }
                    
    </div>
  )
}

export default Cart
