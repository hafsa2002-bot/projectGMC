import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useCart} from '../CartContext'

function Checkout() {
    const {cart, setCart} = useCart()
    const [total, setTotal] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const [shipping, setShipping] = useState(0)

    const calculateTotal = () => {
        const res = cart.reduce((total, currentValue) => total +(currentValue.price * currentValue.quantity), 0)
        setTotal(res)
    }

    const CalculateTotalQuantity = () => {
        const Qty = cart.reduce((totalQty, currentValue) => totalQty + (currentValue.quantity), 0)
        setTotalQty(Qty)
    }
    useEffect(() => {
        calculateTotal()
        CalculateTotalQuantity()
    }, [cart])

  return (
    <div className=''>
        <div className='flex justify-between py-2 border-b border-gray-300 shadow'>
            <div className='w-1/3 '></div>
            <div className='w-1/3'>
                <Link to="/" className=' gap-1.5 flex justify-center  items-center outline-none '>
                    <h2 className='text-4xl lg:text-5xl font-mono '>Novexa</h2>
                </Link>
            </div>
            <div className='w-1/3'></div>
        </div>
        <div className='flex '>
            <div className='w-7/12 border-r border-gray-300'>
                <div className='bg-red border h-96'>hello</div>
                <div className='bg-red border h-96'>hello</div>
                <div className='bg-red border h-96'>hello</div>
                <div className='bg-red border h-96'>hello</div>
            </div>
            <div className='w-5/12 bg-gray-50 sticky top-0 right-0 h-screen pt-20 '>
                <div className='w-10/12 m-auto  border-b border-gray-300 max-h-72 flex flex-col gap-3 p-3 overflow-y-scroll'>
                    {
                        cart.map((product, index) => (
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <div className='relative w-16 h-16 border border-gray-300 rounded-lg'>
                                        <img className='w-full h-full ' src={`http://localhost:3003${product.productPhoto}`} alt="" />
                                        <div className='absolute -top-1 -right-1 w-5 h-5 bg-gray-700 flex justify-center items-center rounded-full text-white'>{product.quantity}</div>
                                    </div>
                                    <div>
                                        <p>{product.productName}</p>
                                    </div>
                                </div>
                                <div className=' font-mono  '>
                                    <span>{product.price}</span> MAD
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-10/12 m-auto mt-9 '>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <p>Subtotal </p>
                            <p className='border flex justify-cener items-center'></p>
                            <p>{totalQty} Articles</p> 
                        </div>
                        <div className=''>{total} MAD</div> 
                    </div>
                    <div className='flex justify-between mt-2'>
                        <div>Shipping</div>
                        <div>{shipping == 0 ? (<p>FREE</p>) : (<p>{shipping} MAD</p>)}</div>
                    </div>
                    <div className=' font-semibold text-xl flex justify-between items-center mt-8'>
                        <div>Total</div>
                        <div className='font-mono'>{total + shipping} MAD</div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout
