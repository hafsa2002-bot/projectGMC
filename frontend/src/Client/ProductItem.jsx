import { Heart, ShoppingCart } from 'lucide-react'
import React, {useState} from 'react'

function ProductItem(props) {
    const [heartColor, setHeartColor] = useState('black')
    const [cartColor, setCartColor] = useState('black')
  return (
    <>
        <div className='lg:w-64 w-52  overflow-hidden shadow-lg shadow-gray-400 rounded-md pb-3 group'>
            <div className='relative'>
                <img className='lg:h-72 h-56 w-full ' src={props.val.images[0]} />
                <div className='absolute lg:flex hidden gap-2 bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='w-10 h-10 bg-gray-100 hover:bg-black rounded-full flex justify-center items-center cursor-pointer' onMouseEnter={() => setHeartColor('white')} onMouseLeave={() => setHeartColor('black')}> 
                    <Heart color={heartColor} size={21} /> 
                    </div>
                    <div className='w-10 h-10 bg-gray-100 hover:bg-black rounded-full flex justify-center items-center cursor-pointer'  onMouseEnter={() => setCartColor('white')} onMouseLeave={() => setCartColor('black')}> 
                        <ShoppingCart  color={cartColor} size={21}/> 
                    </div>
                </div>
                <div className='absolute flex lg:hidden gap-2 bottom-3 right-4 '>
                    <div className='w-10 h-10 bg-gray-100  rounded-full flex justify-center items-center '  > 
                    <Heart  size={21} /> 
                    </div>
                    <div className='w-10 h-10 bg-gray-100  rounded-full flex justify-center items-center '  > 
                        <ShoppingCart size={21}/> 
                    </div>
                </div>
                
            </div>
            <div className='text-center'>
                <h2 className=' pt-2  h-9 overflow-hidden'>{props.val.title}</h2>
                <h2 className='font-semibold px-2'><span className='text-xl '>{props.val.price} DH</span> </h2>
            </div>
        </div>    
    </>
  )
}

export default ProductItem
