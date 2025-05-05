import { ChevronDown, Scale } from 'lucide-react'
import React, { useState } from 'react'

function Ingredients({product, barcode}) {
    const [showIngredients, setShowIngredients] = useState(true)
    console.log(product)
  return (
    <div className='w-11/12 max-w-5xl mx-auto lg:px-4'>
        <h1  className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-2.5">Ingrédients</h1>
        <div  className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div
                onClick={() => setShowIngredients(!showIngredients)}
                className="px-4 py-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-3 w-full text-gray-800 font-semibold text-lg ">
                    <div className="w-12 h-12 text-gray-600">
                        <svg 
                            className="w-full h-full" 
                            fill="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path xmlns="http://www.w3.org/2000/svg" d="m16.2 11l4.1-6.5l1.7 1l-3.4 5.5h-2.4m-.6 1H2v3c0 3.9 3.1 7 7 7h6c3.9 0 7-3.1 7-7v-3h-6.4Z"/>
                        </svg>
                    </div>
                    <p className='flex  '>{product?.ingredients_n} Ingrédients</p>
                </div>
                <ChevronDown className={`transition-transform ${showIngredients ? 'rotate-180' : ''}`} />
            </div>

            {showIngredients && (
  <div className="lg:px-6 px-2 py-6 bg-white rounded-lg shadow-md max-w-5xl mx-auto">
    <h2 className="lg:text-2xl text-lg font-semibold text-gray-800 mb-4">Liste des Ingrédients</h2>

    {/* Display ingredients text */}
    {product?.ingredients_text && (
      <p className="text-gray-700 mb-4">{product.ingredients_text}</p>
    )}
    <div className='lg:flex items-start justify-between gap-5'>
        {product?.ingredients?.length > 0 ? (
        <ul className="space-y-1 w-full">
            {product.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-800 hover:bg-gray-100 p-3 rounded-md transition-colors w-11/12 ">
                {/* Display main ingredient with percentage */}
                <div className="flex justify-between items-center font-semibold  ">
                <span>{ingredient.text}:</span>
                <span className="text-gray-600">
                    {ingredient.percent_estimate < 2 ? `< 2%` : `${ingredient.percent_estimate.toFixed(1)}%`} (estimation)
                </span>
                </div>

                {/* Display sub-ingredients if they exist */}
                {ingredient.ingredients?.length > 0 && (
                <div className="pl-4 mt-2 text-gray-500 text-sm space-y-1">
                    {ingredient.ingredients.map((subIngredient, subIndex) => (
                    <div key={subIndex} className="flex justify-between items-center  ">
                        <span>— {subIngredient.text}</span>
                        <span className="text-gray-600">
                        {subIngredient.percent_estimate < 2 ? `< 2%` : `${subIngredient.percent_estimate.toFixed(1)}%`} (estimation)
                        </span>
                    </div>
                    ))}
                </div>
                )}
            </li>
            ))}
        </ul>
        ) : (
        <p className="text-gray-600">Aucun ingrédient disponible.</p>
        )}
        {/* <img 
        src={`https://images.openfoodfacts.org/images/products/${barcode.slice(0, 3)}/${barcode.slice(3, 6)}/${barcode.slice(6, 9)}/${barcode.slice(9, 13)}/ingredients_fr.12.400.jpg`} 
        alt="Product Ingredients"
        /> */}
        <img className='w-auto h-auto' src={`${product?.image_ingredients_url}`} alt="" />
    </div>
    {/* Display ingredients list */}
  </div>
)}
        </div>
    </div>
  )
}

export default Ingredients
