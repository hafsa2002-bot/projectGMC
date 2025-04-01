import { X } from 'lucide-react'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function UpdateCategory({categoryId, categoryName, setUpdateCategory, setShowOptions}) {
    const [updatedCategoryName, setUpdatedCategoryName] = useState(categoryName);
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()
    const handleUpdateCategory = async () => {
        if(!updatedCategoryName){
            setErrorMessage(true)
            return
        }
        try{
            const response = await axios.patch(`http://localhost:3003/update/category/${categoryId}`, { categoryName: updatedCategoryName })
            setUpdateCategory(false)
            setShowOptions(false)
            navigate("/admin/items/categories")
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
                    <p className='text-gray-600'>This will update your category name</p>
                </div>
            </div>

            {/* I used a <div> instead of a <form> to avoid nesting a form inside another form */}
            <div className='flex flex-col gap-5'>
                <div  className='flex flex-col gap-2'>
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
            <div 
                onClick={() => handleUpdateCategory(categoryId, categoryName)}
                className='cursor-pointer text-white font-semibold text-center bg-blue-600 bordertext-white rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
            >
                Update category
            </div>
            {/* {(submitCategory && categoryExists) && (
              <div className='  text-red-700 bg-red-100 rounded-lg px-3 py-1 flex gap-2 w-full border'>
                <div className=''><Info/></div>
                <p className=''> this category already exist</p>
              </div>
            )} */}
          </div>
        </div>
    </div>
  )
}

export default UpdateCategory
