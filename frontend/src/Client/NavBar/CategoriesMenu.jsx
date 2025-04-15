import React from 'react'
import {Link} from 'react-router-dom'

function CategoriesMenu({categories, setShowMenu}) {
  return (
    <div className="absolute right-0 top-12 z-50 mt-2 w-64 rounded-xl bg-white border border-gray-300 shadow-lg overflow-y-auto max-h-[75vh] transition-all duration-200 hide-scrollbar">
        <ul className="flex flex-col divide-y divide-gray-200">
            {categories.map((category, index) => (
            <Link
                onClick={() => setShowMenu(false)}
                to={`/products/${category.categoryName}`}
                key={index}
                className="px-5 py-3 text-base text-gray-700 font-medium hover:bg-black hover:text-white transition-colors duration-200"
                role="menuitem"
            >
                {category.categoryName}
            </Link>
            ))}
        </ul>
    </div>
  )
}

export default CategoriesMenu
