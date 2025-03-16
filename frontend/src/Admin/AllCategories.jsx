import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { EllipsisVertical, Eye, FolderOpen, Layers, Trash2 } from 'lucide-react'
import AddCategory from './AddCategory'
function AllCategories() {
    const [categories, setCategories] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    // const [addCategory, setAddCategory] = useState(false)
    
    const categoriesWithProducts = () => {
        axios.get("http://localhost:3003/admin/items/categories-with-Products")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        categoriesWithProducts()
    }, [categories])
  return (
    <>
    <div className='flex justify-between px-5 pb-10'>
        <p className=' '></p>
        {/* <div 
            onClick={() => setAddCategory(true)}
            className='cursor-pointer bg-blue-600 px-3 py-2 rounded-xl font-semibold '
        > */}
        {/* {addCategory && 
            <AddCategory setAddCategory={setAddCategory}/>
        } 
            <p className='text-white'>Add Category</p>
         </div> */}
    </div>
    <div className='flex flex-wrap ml-8 mb-10 gap-10'>
       { (categories.length > 0)
       ?(
            categories.map((category, index) => (
                <div className='border-3 border-white  rounded-lg hover:shadow-xl cursor-pointer'>
                    {/* <p>{category.categoryName}</p> */}
                    <div>
                        <div className=''>
                            {(category.products && category.products.length > 0)
                            ?(
                            <div className='flex w-60 h-32 '>
                                <div className='w-1/2 border-r-3 border-b-3 border-white'>
                                    {
                                        (category.products.length > 0 && category.products[0].productPhoto)
                                        ? (
                                            <img src={`http://localhost:3003${category.products[0].productPhoto}`} alt="" />
                                        ):(
                                            <div className="bg-gray-500"></div>
                                        )
                                    }
                                </div>
                                <div className='flex flex-col w-1/2 '>
                                    <div className=' h-1/2 border-b-3 border-white'>
                                        {
                                            (category.products.length > 1 && category.products[1].productPhoto)
                                            ? (
                                                <img src={`http://localhost:3003${category.products[1].productPhoto}`} alt="" />
                                            ):(
                                                <div className="bg-gray-500"></div>
                                            )
                                        }
                                    </div>
                                    <div className='h-1/2 border-b-3 border-white'>
                                        {
                                            (category.products.length > 2 && category.products[2].productPhoto)
                                            ? (
                                                <img src={`http://localhost:3003${category.products[2].productPhoto}`} alt="" />
                                            ):(
                                                <div className="bg-gray-500"></div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            ):
                            (
                                <>
                                    <div className='w-60 h-32 bg-gray-300 text-gray-800 rounded-md flex justify-center items-center'>
                                        <FolderOpen size={50} />
                                    </div>
                                    
                                    {/* <div className='w-60 h-32  bg-neutral-400 text-neutral-200 flex justify-center items-center'>
                                        <FolderOpen size={50} />
                                    </div> */}
                                </>
                            )}
                            
                        </div>
                    </div>
                    <div className='bg-white flex justify-between items-center  pl-3 pr-2 py-1'>
                        <div className=' text-gray-700 font-semibold'>
                            <div><p>{category.categoryName}</p></div>
                            <div className='text-sm flex text-gray-400 font-normal '>
                                <div className=' flex items-center gap-1 w-auto'>
                                    <Layers size={14} />
                                    <p>{category.totalQty}</p>
                                    <hr className='rotate-90 w-2 mr-1'/>
                                </div>
                                <div>
                                    <p>{category.totalValue} MAD</p>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => setShowOptions(index === showOptions ? null : index)} className='relative' >
                            <EllipsisVertical />
                            {
                                showOptions === index && (
                                    <div className='absolute z-50 top-6 right-4  flex flex-col  px-1 py-1 rounded-lg bg-white border border-gray-200 text-gray-500 w-28 '>
                                        <div 
                                            // onClick={() => }
                                            className='flex gap-2 items-center px-3 py-2 hover:bg-gray-100 rounded-lg'>
                                            <Eye size={19} />
                                            <p className='text-black'>View</p>
                                        </div>
                                        <div 
                                            // onClick={() => }
                                            className='flex gap-2 items-center px-3 py-2 text-red-500 hover:bg-gray-100 rounded-lg'>
                                            <Trash2 size={19} />
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            ))
       ):(
        <p>No category Found</p>
       )}
    </div>
    </>
  )
}

export default AllCategories
