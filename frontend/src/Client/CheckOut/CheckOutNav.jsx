import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CheckOutNav() {
    const navigate = useNavigate()

    return (
    <div className='flex justify-between items-center py-3 border-b border-gray-300 shadow'>
        <div className='w-1/3 '></div>
        <div className='w-1/3'>
            <Link to="/" className=' gap-2 flex justify-center  items-center outline-none '>
                <img className='w-1ß h-10' src="/images/newLogo5.png" alt="" />
                <h2 className='text-4xl lg:text-5xl font-mono font-bold '>Novexa</h2>
            </Link>
        </div>
        <div className='w-1/3 flex justify-end pr-6'>
            <Link to="/products" 
                className='cursor-pointer'
                // onClick={() => navigate("/products")} 
            >
                <ShoppingCart size={30} />
            </Link>
        </div>
    </div>
  )
}

export default CheckOutNav
