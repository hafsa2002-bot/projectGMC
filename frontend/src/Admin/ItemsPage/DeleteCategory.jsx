import { Check, Info } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DeleteCategory({categoryId, categoryName, setShowPopUp, setShowOptions, categories, setCategories}) {
    const [showSuccess, setShowSuccess] = useState(false)
    const [localCategoryId, setLocalCategoryId] = useState(null)
    const [localCategoryName, setLocalCategoryName] = useState("")

    useEffect(() => {
        setLocalCategoryId(categoryId)
        setLocalCategoryName(categoryName)
    }, [categoryId, categoryName])

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:3003/admin/items/delete-category/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            }
        )
            .then(response => {
                console.log("category deleted: ", response.data)
                setCategories(categories.filter(category => category._id !== id))
                setShowSuccess(true)
                setTimeout(() => {
                    setShowSuccess(false)
                }, 1500)
                
            })
            .catch(error => console.log("Error: ",error))
    }
  return (
    <div  className='w-screen h-screen  top-0 right-0 fixed flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
    <div className=' bg-white opacity-100 px-16 py-6 rounded-md shadow-md flex flex-col items-center gap-5'>
        <div className='flex justify-center items-center  rounded-full w-12 h-12 bg-red-100'>
            <div className='flex justify-center items-center rounded-full bg-red-200 w-9 h-9 '>
                <Info className="relative text-red-600 bg-transparent w-7 h-7 " />
            </div>
        </div>
        <div className='text-center'>
            <p className='text-2xl font-semibold mb-1'>Confirm delete</p>
            <p className='text-gray-400'>Are you sure you want to delete <span className='text-gray-600'>{localCategoryName}</span>?</p>
        </div>
        <div className='flex gap-4'>
            {/* confirm the delete */}
            <button
                onClick={() => {
                    deleteCategory(categoryId)
                    setShowOptions(false)
                    setShowPopUp(false)
                }}
                className=' cursor-pointer px-5 py-3 text-red-600 text-base'>Delete</button>
            {/* cancel the delete */}
            <button
                onClick={() => {
                    setShowPopUp(false)
                    setShowOptions(false)
                }}
                className='cursor-pointer bg-blue-600 text-white  px-5 py-3 text-base rounded-lg'>Cancel</button>
        </div>
    </div>
    {showSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-1.5 bg-white border border-green-400 text-green-800 px-4 py-2 rounded shadow-md z-50">
            <Check/>
            Category deleted successfully
        </div>
    )}
</div>
  )
}

export default DeleteCategory
