import axios from 'axios'
import React, { useState, useEffect } from 'react'

function ListOfCategories({setSelectedCategory, setShowCategories}) {
    const [listOfCategories, setListOfCategories] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;
    const getCategories = async () => {
        axios.get(`${apiUrl}/admin/items/categories`)
            .then(response => setListOfCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    // // console.log("categories: ", listOfCategories)
    useEffect(() => {
        getCategories()
    }, [listOfCategories])
  return (
    <div>
        <ul className='h-32 overflow-y-scroll'>
        {
            listOfCategories.length > 0 
            ? (
                [...listOfCategories].reverse().map((category, index) => (
                    <li 
                        onClick={() => {
                            setSelectedCategory({id: category._id, name: category.categoryName})
                            setShowCategories(false)
                        }}
                        className='cursor-pointer hover:bg-gray-100 py-2.5 px-2 border-b border-gray-300 truncate'
                    >
                        {category.categoryName}
                    </li>
                ))
            )
            : (
                <li className='hover:bg-gray-100 py-2.5 px-2 border-b border-gray-300'>No category found</li>
            )
        }

      </ul>
    </div>
  )
}

export default ListOfCategories
