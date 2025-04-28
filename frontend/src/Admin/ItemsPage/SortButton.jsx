import { ChevronDown } from 'lucide-react';
import React, {useState} from 'react'

function SortButton({setSelectedOption}) {
    const [showSortOptions, setShowSortOptions] = useState(false)
    const [sortOption, setSortOption] = useState("all-items")

    const handleSelect = (option) => {
        setShowSortOptions(false);            
        setSortOption(option);    
        setSelectedOption(option);  
    };
  return (
    <div 
        onClick={() => {
            setShowSortOptions(!showSortOptions)
            // if (showFilter) setShowFilter(false)
        }} 
        className='border border-gray-400 relative w-3/12 bg-gray-100 flex justify-center items-center gap-3 text-gray-500 rounded-lg cursor-pointer'
    >
        <div>Sort by 
            <span className='font-semibold text-gray-700 pl-2'>
                {
                    (sortOption === "all-items") ? "Most recent" 
                    : (sortOption === "low-to-high") ? "Price: Low to High" 
                    : (sortOption === "high-to-low") ? "Price: High to Low" 
                    : (sortOption === "best-selling") ? "Best Selling" 
                    : (sortOption === "top-earning") ? "Top Earning" 
                    : "Most recent"
                }
            </span>
        </div>
        <ChevronDown className='text-gray-700'/>
        {showSortOptions && (
            <div className='w-full font-semibold bg-white text-gray-800 absolute top-12 z-10 border border-gray-200 rounded-lg shadow-xl'>
                <div 
                    onClick={() => handleSelect("all-items")}
                    className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                >Most Recent</div>
                <div 
                    onClick={() => handleSelect("low-to-high")}
                    className='border-b hover:bg-gray-100 border-gray-300 px-2.5 py-2 cursor-pointer'
                >Price: (Low to High)</div>
                <div
                    onClick={() => handleSelect("high-to-low")}
                    className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                >Price: (High to Low)</div>
                <div
                    onClick={() => handleSelect("best-selling")}
                    className='hover:bg-gray-100 border-b border-gray-300 px-2.5 py-2 cursor-pointer'
                >Best selling</div>
                <div
                    onClick={() => handleSelect("top-earning")}
                    className='hover:bg-gray-100 px-2.5 py-2 cursor-pointer'
                >Top earning products</div>
            </div>
        )}
    </div>
  )
}

export default SortButton
