import React from 'react'
import {Link} from 'react-router-dom'

function CategoriesMenu({categories, setShowMenu}) {
  return (
    <div className='absolute right-0 top-9 z-50 mt-2 w-60 py-4 rounded-md bg-white border border-gray-400 overflow-y-scroll max-h-[80vh]' >
        <ul className='flex flex-col'>
        {
            categories.map((category, index) => (
                <Link 
                    onClick={() => setShowMenu(false)} 
                    to={`/products/${category.categoryName}`} 
                    key={index} 
                    className='text-lg font-medium text-black pl-4 border-b border-stone-400 py-3 hover:bg-black hover:text-white' 
                    role='menuitem ' 
                >
                    <p>{category.categoryName} </p>
                </Link>
            ))
        }
        </ul>
    </div>
  )
}

export default CategoriesMenu
