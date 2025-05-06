import { Check, ImagePlus, Info, X } from 'lucide-react'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function UpdateCategory({categoryId, categoryName, setUpdateCategory, setShowOptions, setMessage, categories, setCategories}) {
    const [updatedCategoryName, setUpdatedCategoryName] = useState(categoryName);
    const [updatedPhoto, setUpdatedPhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    // const [message, setMessage] = useState(false)
    const navigate = useNavigate()
    const handleUpdateCategory = async () => {
        const formData = new FormData();
        formData.append("categoryName", updatedCategoryName);
        if (updatedPhoto) formData.append("photo", updatedPhoto);

        if(!updatedCategoryName){
            setErrorMessage(true)
            return
        }
        try{
            const response = await axios.patch(`${apiUrl}/update/category/${categoryId}`, 
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }
            )
            setCategories(categories.map(category => {
                if(category._id == categoryId){
                    // category.categoryName = updatedCategoryName
                    return {...category, categoryName: updatedCategoryName, photo: response.data.photo}
                }
                return category
            }))
            setMessage(true)
            setTimeout(() => setMessage(false), 3000)
            setUpdateCategory(false)
            setShowOptions(false) 
            // navigate("/admin/items/categories")
            console.log('category updated: ', response.data)
        }catch(error){
            console.log('Error updating category: ', error)
        }
    }
  return (
    <div className='bg-black  w-screen h-screen fixed z-50 top-0 right-0 flex justify-center items-center' style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <div className='bg-white flex flex-col rounded-lg p-6 gap-4 w-4/12'>
            <div className=''>
                <div className='w-full flex justify-end'>
                    <div 
                        onClick={() => {
                            setUpdateCategory(false)
                            setShowOptions(false)
                        }}
                        className='flex justify-center items-center rounded-full hover:bg-gray-200 w-8 h-8 cursor-pointer'>
                        <X/>
                    </div>
                </div>
                <div >
                    <p className='text-2xl font-semibold'>Update Category</p>
                    <p className='text-gray-600'>This will update your category name and photo</p>
                </div>
            </div>

            {/* I used a <div> instead of a <form> to avoid nesting a form inside another form */}
            <div className='flex flex-col gap-5'>
                <div className='flex gap-3 justify-between items-end '>
                    {/* category name */}
                    <div  className='w-10/12 flex flex-col gap-2'>
                        <label htmlFor="categoryName" className='text-gray-700 font-medium'>Category Name</label>
                        <input
                            onChange={(e) => setUpdatedCategoryName(e.target.value)} 
                            value={updatedCategoryName}
                            type="text" 
                            name="categoryName" 
                            id="categoryName"
                            className='bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none  border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            // className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((qty==="" || qty == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                        />
                    </div>
                    {/* category photo */}
                    <div className='w-2/12 '>
                        <label htmlFor="photo" className='w-full h-full py-2 text-center text-gray-600 flex justify-center items-center bg-gray-100 rounded-lg border border-gray-300 cursor-pointer'>
                            <ImagePlus />
                        </label>
                        <input
                            id='photo' 
                            name='photo'
                            type="file"
                            accept="image/*"
                            className='hidden'
                            onChange={(e) => setUpdatedPhoto(e.target.files[0])}
                        />
                    </div>
                </div>
                {updatedPhoto && (<p className='text-gray-700'><span className='text-black'>photo: </span>{updatedPhoto.name}</p>)}
            <div 
                onClick={() => {
                    handleUpdateCategory(categoryId, categoryName)
                }}
                className='cursor-pointer text-white font-semibold text-center bg-blue-600 bordertext-white rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
            >
                Update category
            </div>
            {(errorMessage && updatedCategoryName === "") && (
                <div className='  text-red-700 bg-red-100 rounded-lg px-3 py-1 flex gap-2 w-full border'>
                    <div className=''><Info/></div>
                    <p className=''>Please enter a valid name to update</p>
                </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default UpdateCategory
