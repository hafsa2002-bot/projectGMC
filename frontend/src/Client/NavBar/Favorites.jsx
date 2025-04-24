import { Heart, ShoppingCart, X } from 'lucide-react'
import React from 'react'
import FavoriteElement from './FavoriteElement'
import {useCart} from '../../CartContext'

function Favorites({setShowFavorite}) {
  const {favorites} = useCart()
  
  return (
    <div className='bg-white text-black lg:w-[450px] w-full absolute top-20  right-0 border-l border-gray-300 shadow-2xl h-[90vh] lg:pl-5 pl-2.5 pr-2 pt-3 pb-10 overflow-y-scroll'>
      <div className='flex justify-between items-center pt-2 pb-4'>
        <p className='text-xl font-mono'>Favorites</p> 
        <div
          onClick={() => setShowFavorite(false)}
          className='hover:bg-gray-100 cursor-pointer p-1 rounded-full'
        >
          <X/>
        </div>
      </div>
      {favorites.length > 0
        ?(
          favorites.map((product, index) => (
            <FavoriteElement product={product} key={index} />
          ))
        ):(
          <div className=' flex flex-col justify-center items-center gap-6 h-[73vh]'>
            <div className='flex flex-col justify-center items-center text-gray-300'>
              <Heart size={80} fill="rgb(203, 213, 225)"/>
              <p className='text-gray-500 font-semibold'>Your Wish List is empty</p>
            </div>
            <div 
              onClick={() => {
                navigate("/products")
                setShowFavorite(false)
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

export default Favorites
