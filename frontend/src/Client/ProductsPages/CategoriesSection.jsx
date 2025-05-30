import React , {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios';
import { ArrowRight, Camera, Image } from 'lucide-react';

function CategoriesSection({setLoadingCategories}) {
    const [categories, setCategories] = useState({})
    const scrollRef = useRef();
    const apiUrl = import.meta.env.VITE_API_URL;

    const getCategories = () => {
        axios.get(`${apiUrl}/admin/items/categories-with-Products`)
            .then(response => {
                setCategories(response.data)
                setLoadingCategories(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoadingCategories(false)
            })
    }

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    };

    const firstLetterToUpperCase = (str) => {
        const result =   str[0].toUpperCase() + str.slice(1,str.length)
        return result;
    }

    useEffect(() => {
        getCategories()
    }, [])
  return (
    <>
        <div className="relative w-full border-b border-gray-300 shadow-lg lg:pt-5 pt-9 pb-3  ">
            <div 
                ref={scrollRef}
                className="flex pt-3 px-8 gap-8 overflow-x-scroll w-full hide-scrollbar scroll-smooth"
            >
                {categories.length > 0
                    && categories?.map((category, index) => (
                    <Link 
                        to={`/products/category/${category.categoryName}`}  
                        key={index} 
                        className="flex max-w-24  flex-col items-center text-center hover:scale-105 transition-transform duration-300"
                    >
                        <div className="lg:w-20 lg:h-20 w-16 h-16 bg-white rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                            {
                                (category.photo)
                                ?(
                                    <img 
                                        src={`${apiUrl}${category.photo}`}
                                        className="w-full h-full object-cover"
                                        alt={category.categoryName}
                                    />
                                ):(
                                    <div className='w-full h-full flex justify-center items-center text-gray-400 bg-gray-100'><Image size={30} /></div>
                                )
                            }
                        </div>
                        <p className="font-semibold text-xs mt-3 capitalize text-gray-700 break-words max-h-16 max-w-24 ">
                            {firstLetterToUpperCase(category.categoryName)}
                        </p>
                    </Link>
                ))}
            </div>

            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            <button 
                onClick={scrollRight}
                className="absolute right-2 top-2/5 -translate-y-1/2 bg-gray-100 border border-gray-400 rounded-full p-2 shadow-md hover:bg-gray-200 transition-all z-20"
            >
                <ArrowRight className="text-gray-600" />
            </button>
        </div>
    </>
  )
}

export default CategoriesSection
