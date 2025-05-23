import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { EllipsisVertical, Eye, FolderOpen, Layers, PenLine, Search, Trash2 } from 'lucide-react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import DeleteCategory from './DeleteCategory'
import UpdateCategory from './UpdateCategory'
import { useCart } from '../../CartContext'

function SearchedCategories({categories}) {
    const [showOptions, setShowOptions] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [updateCategory, setUpdateCategory] = useState(false)
    const navigate = useNavigate()
    const {currency} = useCart()
    const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <div className='flex flex-wrap mb-32 gap-10 mt-2 w-full'>
        { (categories.length > 0)
        ?(
            categories.map((category, index) => (
                <div  key={category._id} className='border-3 border-white  rounded-lg hover:shadow-xl cursor-pointer'>
                    <div onClick={() => navigate(`/admin/items/categories/${category._id}`)} className=''>
                        <div className=''>
                            {/* {(category.products && category.products.length > 0)
                            ?(
                            <div className='flex w-60 h-40 '>
                                <div className='w-1/2 border-r-3 border-b-3 border-white flex justify-center items-center'>
                                    {
                                        (category.products.length > 0 && category.products[0].productPhoto)
                                        ? (
                                            <img className='' src={`${apiUrl}${category.products[0].productPhoto}`} alt="" />
                                        ):(
                                            <div className="bg-gray-500"></div>
                                        )
                                    }
                                </div>
                                <div className='flex flex-col w-1/2 '>
                                    <div className=' h-1/2 border-b-3 border-white flex justify-center items-center'>
                                        {
                                            (category.products.length > 1 && category.products[1].productPhoto)
                                            ? (
                                                <img className='w-20 h-18 m-auto' src={`${apiUrl}${category.products[1].productPhoto}`} alt="" />
                                            ):(
                                                <div className="bg-gray-500"></div>
                                            )
                                        }
                                    </div>
                                    <div className='h-1/2 border-b-3 border-white  flex justify-center items-center'>
                                        {
                                            (category.products.length > 2 && category.products[2].productPhoto)
                                            ? (
                                                <img className='w-20 h-18 m-auto' src={`${apiUrl}${category.products[2].productPhoto}`} alt="" />
                                            ):(
                                                <div className="bg-gray-500"></div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            ):
                            (
                                <div className='w-60 h-40 bg-gray-300 text-gray-800 rounded-md flex justify-center items-center'>
                                    <FolderOpen size={50} />
                                </div>
                            )} */}
                            {
                                category.photo
                                ?(
                                    <div className='w-full lg:h-56 overflow-hidden rounded-lg'>
                                        <img className='w-full h-full' src={`${apiUrl}${category.photo}`} />
                                    </div>
                            
                                ):(
                                    <div className='w-full h-56 bg-gray-300 text-gray-800 rounded-md flex justify-center items-center'>
                                        <FolderOpen size={60} />
                                    </div>
                                )
                            }
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
                                    <p>{category.totalValue.toFixed(2)}  {currency} </p>
                                </div>
                            </div>
                        </div>
                        <div 
                            className='relative' 
                        >
                            <EllipsisVertical  onClick={() => setShowOptions(index === showOptions ? null : index)}  />
                            {
                                showOptions === index && (
                                    <div className='absolute z-50 top-6 right-4  flex flex-col  px-1 py-1 rounded-lg bg-white border border-gray-200 text-gray-500 w-28 '>
                                        <Link 
                                            to={`/admin/items/categories/${category._id}`} 
                                            className='flex gap-2 items-center px-3 py-2 hover:bg-gray-100 text-black rounded-lg'>
                                            <Eye size={19} />
                                            <p className='text-black'>View</p>
                                        </Link>
                                        <div 
                                            onClick={() => setUpdateCategory(true)}
                                            className='flex gap-2 items-center px-3 py-2 hover:bg-gray-100 text-black rounded-lg'>
                                            <PenLine size={19} />
                                            <p className=''>Update</p>
                                        </div>
                                        {updateCategory && <UpdateCategory categoryId={category._id} categoryName={category.categoryName} setUpdateCategory={setUpdateCategory} setShowOptions={setShowOptions} setMessage={setMessage}  />}
                                        <div
                                            // deleteCategory(category._id)
                                            onClick={() => setShowPopUp(true)}
                                            className='flex gap-2 items-center px-3 py-2 text-red-500 hover:bg-gray-100 rounded-lg'>
                                            <Trash2 size={19} />
                                            <p>Delete</p>
                                        </div>
                                        {showPopUp && <DeleteCategory categoryId={category._id} categoryName={category.categoryName} setShowPopUp={setShowPopUp} setShowOptions={setShowOptions} />}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            ))
        ):(
            <div className='w-full flex justify-center'>
                <div className=' w-8/12 pt-14 rounded-md flex flex-col gap-3  justify-center items-center'>
                    <img src="/images/sticker.svg" className='w-36 ' alt="" />
                    <div className='flex flex-col items-center'>
                        <p className='text-xl font-semibold'>Your Categories show up here</p>
                        <p className='text-gray-600'>Click the <span className='font-semibold'>Add Item</span> button below to add products </p>
                    </div>
                    <Link to="/admin/items/add-item" className='text-white bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                        <p>Add Item</p>
                    </Link>
                </div>
            </div>
        )}
    </div>
  )
}

export default SearchedCategories
