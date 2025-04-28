import { SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react'

function FilterButton({setSelectedOption}) {
    const [showFilter, setShowFilter] = useState(false)
    const [filterOption, setFilterOption] = useState("all-items")

    const handleSelect = (option) => {
        setShowFilter(false);            
        setFilterOption(option);    
        setSelectedOption(option);  
    };
  return (
    <div
        onClick={() => {
            setShowFilter(!showFilter)
            // if(showSortOptions) setShowSortOptions(false)
        }} 
        className='border border-gray-400 relative cursor-pointer bg-gray-100 flex items-center justify-center gap-2 w-2/12 rounded-lg px-3 py-2.5 text-gray-700'
    >
        <SlidersHorizontal size={20} />
        <p>
            {
                (filterOption === "all-items") ? "All items" 
                : (filterOption === "out-of-stock") ? "Out Of Stock" 
                : (filterOption === "low-in-stock") ? "Low in stock" 
                : (filterOption === "expired")? "Expired items" : "Filter"
            }
        </p>
        {/* dropdown */}
        {showFilter && (
            <div className='w-full font-semibold bg-white text-gray-800 absolute top-12 z-10 shadow-xl border border-gray-200 rounded-lg'>
                <div 
                    onClick={() => handleSelect("all-items")}
                    className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                >All Items</div>
                <div 
                    onClick={() => handleSelect("out-of-stock")}
                    className='border-b hover:bg-gray-100 border-gray-300 px-2.5 py-2 cursor-pointer'
                >Out of stock items</div>
                <div
                    onClick={() => handleSelect("low-in-stock")}
                    className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                >Low in stock items</div>
                <div
                    onClick={() => handleSelect("expired")}
                    className='hover:bg-gray-100 px-2.5 py-2 cursor-pointer'
                >Expired items</div>
            </div>
        )}
    </div>
  )
}

export default FilterButton
