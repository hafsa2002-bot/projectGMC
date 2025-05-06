import { ArrowLeft, Barcode, CalendarDays, Check, ChevronDown, CircleHelp, CirclePlus, ImageUp, PrinterCheckIcon, ScanBarcode, X } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import AddCategory from './AddCategory'
import ListOfCategories from './ListOfCategories'
import axios from 'axios'
import UpdateQuantity from './UpdateQuantity'
import BarCode from './BarCode'
import UpdateBatchForm from './UpdateBatchForm'
import { useCart } from '../../CartContext'
import SucessMessage from '../SucessMessage'

function UpdateItem() {
    const {id} = useParams()
    // const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [updatedProductName, setUpdatedProductName] = useState("")
    const [updatedBarcode, setUpdatedBarcode] = useState("")
    const [updatedQty, setUpdatedQty] = useState(0)
    const [updatedMinLevel, setUpdatedMinLevel] = useState(0)
    const [updatedPrice, setUpdatedPrice] = useState(0)
    const {currency} =  useCart()
    const [showCategories, setShowCategories] = useState(false)
    const [updatedSelectedCategory, setUpdatedSelectedCategory] = useState({id: "", name: ""})
    const [addCategory, setAddCategory] = useState(false)
    const [updatedExpirationDate, setUpdatedExpirationDate] = useState(null)
    const [updatedProductPhoto, setUpdatedProductPhoto] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false)
    const [showRequired, setShowRequired] = useState(false)
    const [showMinLevelDetails, setShowMinLevelDetails ] = useState(false)
    const [updateQuantity, setUpdateQuantity] = useState(false)
    const [batches, setBatches] = useState([]);
    const [message, setMessage] = useState(false)
    // const [errorMessage, setErrorMessage] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const datePickerRef = useRef(null);

    const handleDivClick = () => {
        if (datePickerRef.current) {
        datePickerRef.current.setFocus(); // Open the calendar
        }
    };

    let totalValue = () => {
        if (updatedPrice || updatedQty) return `${(updatedPrice * updatedQty).toFixed(2)} `;
        else return `0`
    }
    const handleFileChange = (event) => {
        if(event.target.files.length > 0)
            setUpdatedProductPhoto(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validBatches = batches.filter(batch => batch.qty > 0);

        // Optional: check if at least one valid batch exists
        if (validBatches.length === 0) {
            console.log("No valid batches to submit.");
            setErrorMessage(true);
            setTimeout(() => setErrorMessage(false), 2400)
            return;
        }
        
        setSubmitted(true)
        console.log("updatedSelectedCategory: ", updatedSelectedCategory)
        try{
            const formData = new FormData();
            formData.append("productName", updatedProductName);
            formData.append("price", updatedPrice);
            formData.append("barcode", updatedBarcode);
            formData.append("minLevel", updatedMinLevel);
            formData.append("updatedCategoryId", updatedSelectedCategory.id);
            formData.append("batches", JSON.stringify(batches));
            if (updatedProductPhoto instanceof File) {
                formData.append("updatedProductPhoto", updatedProductPhoto);
            }
    
            const response = await axios.patch(
                `${apiUrl}/admin/items/updateProduct/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}` 
                    }
                }
            );
            setMessage(true)
            setTimeout(() => setMessage(true), 1500)
            setTimeout(() => navigate(`/admin/items/view/${id}`), 1700)
            console.log('product updated: ', response.data)
        }catch(error){
            console.log('Error updating product: ', error)
        }
    }

    useEffect(() => {
        axios.get(`${apiUrl}/admin/items/view/${id}`)
            .then(response => {
                const data = response.data
                setProduct(data)
                setUpdatedProductName(data.productName)
                setUpdatedBarcode(data.barcode)
                setUpdatedQty(data.qty)
                setUpdatedMinLevel(data.minLevel)
                setUpdatedPrice(data.price)
                setUpdatedSelectedCategory(
                    {id: data.categoryId?._id || "",
                    name: data.categoryId?.categoryName || ""}
                )
                setBatches(data.batches)
                // setUpdatedExpirationDate(data.expirationDate)
                setUpdatedExpirationDate(data.expirationDate?.slice(0, 10));
                setUpdatedProductPhoto(data.productPhoto)
                console.log("Product By ID: ", response.data)
            })
            .catch(error => console.log("error: ", error))
    }, [])
  return (
    <div className='my-3'>
        <div className=' mb-9'>
            <Link to="/admin/items" className='flex gap-2 items-center text-gray-600 w-52'>
                <div><ArrowLeft/></div>
                <div className='text-2xl  pl-2 font-semibold'><p>Update Item</p></div>
            </Link>
        </div>
        <div className='bg-white p-5 mt-5  rounded-lg mb-24'>
            <div className='mb-3'>
                <p className='text-xl font-semibold'> Update Product Details</p>
                <p className='text-gray-500'>Update your product information to keep invoicing and cost management accurate (<span className='text-red-600 font-semibold'>*</span> for required fields)</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-8 px-3'>
                <div className='flex gap-8 w-11/12'>
                    {/* product Name */}
                    <div className='w-1/2'>
                        <label htmlFor="updatedProductName" className="block mb-2  font-medium text-gray-900">Product Name <span className='text-red-500'>*</span></label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500  `   }
                            type="text" 
                            name="updatedProductName" 
                            id="updatedProductName"
                            onChange={(e) => setUpdatedProductName(e.target.value)} 
                            value={updatedProductName} 
                            placeholder='Product name'
                            autoComplete='off'
                            required
                        />
                    </div>
                    {/* Barcode Number */}
                    <div className='w-1/2'>
                        <label htmlFor="updatedBarcode" className="block mb-2 font-medium text-gray-900">Barcode Number </label>
                        <div className='flex justify-between items-center gap-3'>
                            <input 
                                placeholder='x xxxxxx xxxxxx'
                                type="number" 
                                name="updatedBarcode" 
                                autoComplete='off'
                                id="updatedBarcode"
                                value={updatedBarcode}
                                onChange={(e) => setUpdatedBarcode(e.target.value)} 
                                className="[appearance:textfield] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" 
                                
                            />
                            <BarCode setBarcode={setUpdatedBarcode} setProductName={setUpdatedProductName} />
                        </div>
                    </div>
                </div>
                {/* Category */}
                <div className=' w-11/12 flex gap-8'>
                    <div className='relative z-10  w-1/2'>
                        <p className="block mb-2 font-medium text-gray-900">Category</p>
                        <div  
                            onClick={() => setShowCategories(!showCategories)} 
                            className= "flex justify-between h-11 bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" 
                        >
                            <p className={updatedSelectedCategory.name ? 'text-gray-900'  : 'text-gray-500'} >{updatedSelectedCategory.name || "Choose category"}</p>
                            {   
                                showCategories 
                                ? (<ChevronDown className='rotate-180 cursor-pointer' onClick={() => setShowCategories(false)} />)
                                : (<ChevronDown className='cursor-pointer' onClick={() => setShowCategories(true)} />)
                            }
                            
                        </div>
                        {showCategories && 
                            (
                                <div className='absolute z-20 bg-white text-gray-700 border border-gray-400 rounded-lg mt-3 overflow-hidden w-full shadow-lg'>
                                    {/* list of categories */}
                                    <div>
                                        <ListOfCategories setSelectedCategory={setUpdatedSelectedCategory}  setShowCategories={setShowCategories} />
                                    </div>
                                    {/* add new category */}
                                    <div>
                                        <div 
                                            onClick={() => setAddCategory(true)}
                                            className='text-blue-600 border-t border-gray-400 flex gap-3 py-2.5 px-2 items-center cursor-pointer'>
                                            <CirclePlus size={20} />
                                            <p>Add new category</p> 
                                        </div>
                                        {addCategory && (
                                            <AddCategory setAddCategory={setAddCategory}/>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className='w-1/2'></div>
                </div>
                {/* update batches */}
                <UpdateBatchForm rows={batches} setRows={setBatches} />
                <div className='flex gap-8  w-11/12 items-center'>
                    {/* Price */}
                    <div className='w-1/2'>
                        <label htmlFor="updatedPrice" className="block mb-2 font-medium text-gray-900">Price <span className='text-red-500'>*</span></label>
                        <div className='relative'>
                            <input 
                                type="number"
                                name="updatedPrice" 
                                id="updatedPrice"
                                placeholder='100'
                                required
                                min="1"
                                step="any"
                                autoComplete='off'
                                onChange={(e) => setUpdatedPrice(e.target.value)}
                                value={updatedPrice}
                                className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500`   }
                            />
                            <div className=' absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 '>
                                <p className='font-medium'>{currency}</p>
                            </div>
                        </div>
                    </div>
                    {/* Total Value */}
                    <div className='w-1/2'>
                        <label htmlFor="total" className="block mb-2  font-medium text-gray-900 ">Total Value(hidden)</label>
                        <div className='relative'>
                            <input 
                                type="number" 
                                name="total" 
                                id="total"
                                placeholder={totalValue()}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none cursor-not-allowed" 
                                disabled 
                            />
                            <div className='text-gray-400  absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 '>
                                <p className='font-medium'>{currency}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-8  w-11/12 items-center'>
                    {/* Min level */}
                    <div className='w-1/2 flex justify-between items-center'>
                        <div className=' w-full '>
                            <label htmlFor="updatedMinLevel" className="block mb-2  font-medium text-gray-900 dark:text-white">Minimum qty <span className='text-red-500'>*</span></label>
                            <div className='flex'>
                                <input 
                                    type="number"
                                    name="updatedMinLevel" 
                                    id="updatedMinLevel"
                                    min="1"
                                    autoComplete='off'
                                    required  
                                    value={updatedMinLevel}
                                    onChange={(e) => setUpdatedMinLevel(e.target.value)}
                                    className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                                />
                            </div>
                        </div>
                    </div>
                    {/* min level infos */}
                    <div className='w-1/2 relative pt-7 right-5  '>
                        <div>
                            <CircleHelp
                                color='gray'
                                className='relative'
                                onMouseEnter={() => setShowMinLevelDetails(true)} 
                                onMouseLeave={() => setShowMinLevelDetails(false)}
                            />
                            {
                                showMinLevelDetails && (
                                    <div className='w-40 absolute bg-gray-600 text-white p-2.5 rounded-md bottom-9 left-0'>
                                        <p className=''>The min. number of quantity before a low stock alert</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {/* image input */}
                    <p className="block mb-2  font-medium text-gray-900 ">Product Image</p>
                    <div className="flex items-center  w-11/12">
                        <label htmlFor="updatedProductPhoto" className="flex w-full flex-col items-center  h-32 border-1 border-gray-300  rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100   ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 16">
                                    <ImageUp size={30} className='text-blue-600'/>                               
                                </div>
                                {(!updatedProductPhoto)
                                ?(
                                    <>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </>
                                )
                                :(
                                    <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">{updatedProductPhoto.name ? updatedProductPhoto.name : updatedProductPhoto}</p>
                                )}
                            </div>
                            <input 
                                id="updatedProductPhoto"
                                name="updatedProductPhoto" 
                                type="file" 
                                className="hidden"
                                accept='image/*'
                                onChange={handleFileChange}
                            />
                        </label>
                    </div> 
                </div>
                <div className='flex items-center gap-6'>
                    <div className="w-32 text-center cursor-pointer font-semibold bg-blue-500 border border-gray-300 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block  outline-none" >
                        <button className='cursor-pointer h-full p-2.5 w-full' >Save Product</button>
                    </div>
                    {errorMessage && (
                        <div className='w-1/4 py-2 flex justify-center items-center gap-2 px-3 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-100 border border-gray-200 z-50 '>
                            <div className='w-5 h-5 bg-red-600   rounded-full flex justify-center items-center'><X size={14} className='text-white' /></div>
                            <p>Please fill in all required fields</p> 
                        </div>
                    )}
                    {message && (
                        <SucessMessage message="Your product has been successfully updated!" />
                    )}
                    <div className='cursor-pointer text-red-500 font-medium'>
                        <div onClick={() => navigate(-1)}>Cancel</div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateItem
