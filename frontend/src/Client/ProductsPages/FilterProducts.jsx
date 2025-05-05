import { SlidersHorizontal } from 'lucide-react'
import React, {useState} from 'react'

function FilterProducts({setSelectedOption}) {
    const [open, setOpen] = useState(false);
    const [filterOption, setFilterOption] = useState("default")

    const handleSelect = (option) => {
        setOpen(false);            
        setFilterOption(option);    
        setSelectedOption(option);  
    };


  return (
    <>
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
                <SlidersHorizontal className="w-5 h-5" />
                <div className=''>Trier par</div> 
                <div className='font-semibold'>
                    {
                        filterOption == "default" ? <p>Défaut</p>
                        : filterOption == "popular" ? <p>Popularité</p>
                        : filterOption == "recent" ? <p>Récents </p>
                        : filterOption == "prix_crss" ? <p>Prix croissant</p>
                        : filterOption == "prix_decrss" ? <p>Prix décroissant</p>
                        : null
                    }
                </div>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0  mt-2 w-full bg-white border text-sm text-gray-700 border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-1">
                        <div
                            onClick={() => handleSelect("default")}  
                            className={`block hover:font-semibold hover:text-black  cursor-pointer  w-full text-left px-4 py-2  hover:bg-gray-100 ${filterOption == "default" && 'text-black font-semibold'}`}
                        >
                            Défaut
                        </div>
                        <div
                            onClick={() => handleSelect("popular")} 
                            className={`block hover:font-semibold hover:text-black  cursor-pointer  w-full text-left px-4 py-2  hover:bg-gray-100 ${filterOption == "popular" && 'text-black font-semibold'}`}
                        >
                            Popularité
                        </div>
                        <div 
                            onClick={() => handleSelect("recent")} 
                            className={`block hover:font-semibold hover:text-black  cursor-pointer  w-full text-left px-4 py-2  hover:bg-gray-100 ${filterOption == "recent" && 'text-black font-semibold'}`}
                        >
                            Récents 
                        </div>
                        <div
                            onClick={() => handleSelect("prix_crss")}  
                            className={`block hover:font-semibold hover:text-black  cursor-pointer  w-full text-left px-4 py-2  hover:bg-gray-100 ${filterOption == "prix_crss" && 'text-black font-semibold'}`}
                        >
                            Prix croissant
                        </div>
                        <div
                            onClick={() => handleSelect("prix_decrss")}   
                            className={`block hover:font-semibold hover:text-black  cursor-pointer  w-full text-left px-4 py-2  hover:bg-gray-100 ${filterOption == "prix_decrss" && 'text-black font-semibold'}`}
                        >
                            Prix décroissant
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default FilterProducts
