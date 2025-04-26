import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Check, EllipsisVertical, Eye, FolderOpen, Layers, PenLine, Search, Trash2 } from 'lucide-react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import AddCategory from './AddCategory'
import SpinnerLoader from '../../SpinnerLoader'
import SpinnerBlue from '../SpinnerBlue'
import DeleteCategory from './DeleteCategory'
import UpdateCategory from './UpdateCategory'
import SearchedCategories from './SearchedCategories'
import { jwtDecode } from 'jwt-decode'

function AllCategories() {
    const [categories, setCategories] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updateCategory, setUpdateCategory] = useState(false)
    const navigate = useNavigate()
    const [categoryName, setCategoryName] = useState("")
    const [filteredCategories, setFilteredCategories] = useState([])
    const [message, setMessage] = useState(false)
    const token = localStorage.getItem("token");
    let userRole = null;
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }

    const filterCategories = (name) => {
        const result = categories?.filter(category => category.categoryName.toLowerCase().includes(name.toLowerCase()))
        setFilteredCategories(result)
    }
    
    const categoriesWithProducts = () => {
        axios.get("http://localhost:3003/admin/items/categories-with-Products")
            .then(response => {
                setCategories(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }
    
    useEffect(() => {
        categoriesWithProducts()
    }, [])
    
  return (
    <>
    {
        loading 
        ?(
            <SpinnerBlue/>
        ):(
            <>
                {/* search category */}
                <div className='w-full flex '>
                    <div className='bg-white border border-gray-400 ml-8 mt-2 flex items-center px-3 gap-3 w-5/12 text-gray-400 outline-blue-500  rounded-xl'>
                        <Search size={20} />
                        <input
                            onChange={(e) => {
                                setCategoryName(e.target.value)
                                if(e.target.value != "") filterCategories(e.target.value)
                                else setFilteredCategories(categories)
                            }}
                            value={categoryName} 
                            autoComplete='off'
                            type="search" name="categoryName" id="categorytName"
                            placeholder='Search to find Category'
                            className="outline-none text-black placeholder:text-gray-400 w-11/12  py-2.5" 
                        />
                    </div>
                </div>
                <div className='flex flex-wrap ml-8 mb-32 gap-10 mt-7'>
                    { (categories.length > 0)
                    ?(  
                        categoryName !== "" 
                        ? <SearchedCategories categories={filteredCategories}/>
                        : (
                            [...categories].reverse().map((category, index) => (
                                <div  key={category._id} className='border-3 border-white  rounded-lg hover:shadow-xl cursor-pointer'>
                                    <div onClick={() => navigate(`/admin/items/categories/${category._id}`)} className=''>
                                        <div className=''>
                                            {(category?.products && category?.products?.length > 0)
                                            ?(
                                            <div className='flex w-60 h-40'>
                                                <div className='w-1/2 border-r-3 border-b-3 border-white flex justify-center items-center'>
                                                    {
                                                        (category.products.length > 0 && category.products[0].productPhoto)
                                                        ? (
                                                            <img className='' src={`http://localhost:3003${category.products[0].productPhoto}`} alt="" />
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
                                                                <img className='w-20 h-18 m-auto' src={`http://localhost:3003${category.products[1].productPhoto}`} alt="" />
                                                            ):(
                                                                <div className="bg-gray-500"></div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className='h-1/2 border-b-3 border-white  flex justify-center items-center'>
                                                        {
                                                            (category.products.length > 2 && category.products[2].productPhoto)
                                                            ? (
                                                                <img className='w-20 h-18 m-auto' src={`http://localhost:3003${category.products[2].productPhoto}`} alt="" />
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
                                            )}
                                            
                                        </div>
                                    </div>
                                    <div className='bg-white flex justify-between items-center  pl-3 pr-2 py-1'>
                                        <div className=' text-gray-700 font-semibold w-10/12'>
                                            <div className="max-w-44"><p className='truncate'>{category?.categoryName}</p></div>
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
                                        <div 
                                            className='relative' 
                                        >
                                            {
                                                userRole == "admin" 
                                                ?(
                                                    <>
                                                        <EllipsisVertical  onClick={() => setShowOptions(index === showOptions ? null : index)}  />
                                                        {
                                                            showOptions === index && (
                                                                <div className='absolute z-40 top-6 shadow-lg right-4  flex flex-col  px-1 py-1 rounded-lg bg-white border border-gray-300 text-gray-500 w-28 '>
                                                                    <Link 
                                                                        to={`/admin/items/categories/${category._id}`} 
                                                                        className='flex gap-2 items-center px-2 py-2 hover:bg-gray-100 text-black rounded-lg'>
                                                                        <Eye size={17} />
                                                                        <p className='text-black'>View</p>
                                                                    </Link>
                                                                    <div 
                                                                        onClick={() => setUpdateCategory(true)}
                                                                        className='flex gap-2 items-center px-2 py-2 hover:bg-gray-100 text-black rounded-lg'>
                                                                        <PenLine size={17} />
                                                                        <p className=''>Update</p>
                                                                    </div>
                                                                    {updateCategory && 
                                                                        <UpdateCategory 
                                                                            categoryId={category._id} 
                                                                            categoryName={category.categoryName} 
                                                                            setUpdateCategory={setUpdateCategory} 
                                                                            setShowOptions={setShowOptions} 
                                                                            setMessage={setMessage}
                                                                            categories={categories}
                                                                            setCategories = {setCategories}
                                                                        />}
                                                                    <div
                                                                        onClick={() => setShowPopUp(true)}
                                                                        className='flex gap-2 items-center px-2 py-2 text-red-500 hover:bg-gray-100 rounded-lg'>
                                                                        <Trash2 size={17} />
                                                                        <p>Delete</p>
                                                                    </div>
                                                                    {showPopUp && 
                                                                        <DeleteCategory 
                                                                            categoryId={category._id} 
                                                                            categoryName={category.categoryName} 
                                                                            setShowPopUp={setShowPopUp} 
                                                                            setShowOptions={setShowOptions}
                                                                            categories={categories}
                                                                            setCategories = {setCategories} 
                                                                        />}
                                                                </div>
                                                            )
                                                        }
                                                    </>
                                                ):(
                                                    <Link 
                                                        to={`/admin/items/categories/${category._id}`} 
                                                        className='text-blue-500 underline hover:text-black'>
                                                        {/* <Eye size={17} /> */}
                                                        <p className='text-xs'>View</p>
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {message && (
                                        <div className='w-1/4 flex gap-2 justify-center items-center py-2 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-white border border-gray-300  '>
                                            <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center' ><Check size={14} /></div>
                                            <p>Category updated successfully</p> 
                                        </div>
                                    )}
                                </div>
                            ))

                        )

                    ):(
                        <div className='bg-white w-11/12 rounded-md flex flex-col gap-3  justify-center items-center py-14'>
                            <img src="/images/sticker.svg" className='w-32 ' alt="" />
                            <div className='flex flex-col items-center'>
                                <p className='text-xl font-semibold'>Your Categories show up here</p>
                                <p className='text-gray-600'>Click the <span className='font-semibold'>Add Item</span> button below to add products </p>
                            </div>
                            <Link to="/admin/items/add-item" className='text-white bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                                <p>Add Item</p>
                            </Link>
                        </div>
                    )}
                </div>

            </>

        )
    }
    </>
  )
}

export default AllCategories
