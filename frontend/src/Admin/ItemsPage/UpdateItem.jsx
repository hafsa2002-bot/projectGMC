import { ArrowLeft, Barcode, CalendarDays, Check, ChevronDown, CircleHelp, CirclePlus, ImageUp, PrinterCheckIcon, ScanBarcode, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import AddCategory from './AddCategory'
import ListOfCategories from './ListOfCategories'
import axios from 'axios'
import UpdateQuantity from './UpdateQuantity'

function UpdateItem() {
    const {id} = useParams()
    // const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [updatedProductName, setUpdatedProductName] = useState("")
    const [updatedBarcode, setUpdatedBarcode] = useState("")
    const [updatedQty, setUpdatedQty] = useState(0)
    const [updatedMinLevel, setUpdatedMinLevel] = useState(0)
    const [updatedPrice, setUpdatedPrice] = useState(0)
    const [updatedCurrency, setUpdatedCurrency] =  useState('MAD')
    const [showCategories, setShowCategories] = useState(false)
    const [updatedSelectedCategory, setUpdatedSelectedCategory] = useState({id: "", name: ""})
    const [addCategory, setAddCategory] = useState(false)
    const [updatedExpirationDate, setUpdatedExpirationDate] = useState("")
    const [updatedProductPhoto, setUpdatedProductPhoto] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false)
    const [showRequired, setShowRequired] = useState(false)
    const [showMinLevelDetails, setShowMinLevelDetails ] = useState(false)
    const [updateQuantity, setUpdateQuantity] = useState(false)
    const [message, setMessage] = useState(false)
    const navigate = useNavigate()

    let totalValue = () => {
        if (updatedPrice || updatedQty) return `${updatedPrice * updatedQty} `;
        else return `0`
    }
    const handleFileChange = (event) => {
        if(event.target.files.length > 0)
            setUpdatedProductPhoto(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setSubmitted(true)
        console.log("updatedSelectedCategory: ", updatedSelectedCategory)
        try{
            const formData = new FormData();
            formData.append("productName", updatedProductName);
            formData.append("price", updatedPrice);
            // formData.append("qty", updatedQty);
            formData.append("barcode", updatedBarcode);
            formData.append("minLevel", updatedMinLevel);
            formData.append("expirationDate", updatedExpirationDate);
            formData.append("updatedCategoryId", updatedSelectedCategory.id);
            if (updatedProductPhoto instanceof File) {
                formData.append("updatedProductPhoto", updatedProductPhoto);
            }
    
            const response = await axios.patch(
                `http://localhost:3003/admin/items/updateProduct/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            navigate(`/admin/items/view/${id}`)
            console.log('product updated: ', response.data)
        }catch(error){
            console.log('Error updating product: ', error)
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3003/admin/items/view/${id}`)
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
                setUpdatedExpirationDate(data.expirationDate)
                setUpdatedProductPhoto(data.productPhoto)
                console.log("Product By ID: ", response.data)
                // setLoading(false)
            })
            .catch(error => {
                console.log("error: ", error)
                // setLoading(false)
            })
    }, [])

    useEffect(() => {
            if(submitted  && (!updatedQty || updatedQty < 1 || updatedPrice < 1 || !updatedPrice || updatedProductName == "" || updatedMinLevel < 1)){
                setErrorMessage(true)
                setTimeout(() => setErrorMessage(false), 10000)
                setShowRequired(true)
                setSubmitted(false)
            }
            else if(submitted && updatedQty > 1 && updatedPrice > 1 && updatedProductName !== "" && updatedMinLevel > 1 ) {
                setErrorMessage(false)
                setShowRequired(false)
            }
            if(showRequired){
                scrollTo(0, 0)
            }
        }, [submitted, updatedProductName, updatedQty, updatedPrice, updatedMinLevel])
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
                <p className='text-xl font-semibold'>Product Details</p>
                <p className='text-gray-500'>Add your product to make invoicing and cost management easier (<span className='text-red-600 font-semibold'>*</span> for required fields)</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-8 px-3'>
                <div className='flex gap-8 w-full'>
                    {/* product Name */}
                    <div className='w-1/2'>
                        <label htmlFor="updatedProductName" className="block mb-2  font-medium text-gray-900">Product Name <span className='text-red-500'>*</span></label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${(updatedProductName === "" && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                            type="text" 
                            name="updatedProductName" 
                            id="updatedProductName"
                            onChange={(e) => setUpdatedProductName(e.target.value)} 
                            value={updatedProductName} 
                            placeholder='Product name'
                            // required
                        />
                        {(updatedProductName === "" && showRequired ) && (
                            <div className='absolute text-red-600 text-sm'>Required</div>
                        )}
                    </div>
                    {/* Barcode Number */}
                    <div className='w-1/2'>
                        <label htmlFor="updatedBarcode" className="block mb-2 font-medium text-gray-900">Barcode Number </label>
                        <div className='relative'>
                            <input 
                                placeholder='56034-25020'
                                type="number" 
                                name="updatedBarcode" 
                                id="updatedBarcode"
                                value={updatedBarcode}
                                onChange={(e) => setUpdatedBarcode(e.target.value)} 
                                className="[appearance:textfield] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" 
                                
                            />
                            <Link className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 '>
                                <ScanBarcode className='text-blue-600'/>
                            </Link>
                        </div>
                    </div>
                    <div className='w-2/12'></div>
                </div>
                <div className='flex gap-8  w-full items-start'>
                    {/* Quantity */}
                    <div className='relative w-1/2'>
                        <label htmlFor="updatedQty" className="block mb-2 font-medium text-gray-900">Quantity <span className='text-red-500'>*</span></label>
                        <input 
                            type="number" 
                            // min="1"
                            name="updatedQty" 
                            id="updatedQty"
                            value={updatedQty}
                            // onChange={(e) => setUpdatedQty(e.target.value) }
                            placeholder="1" 
                            className={` bg-gray-200 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((updatedQty ==="" || updatedQty == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                            // required 
                            disabled
                        />
                        <div className='flex gap-1 mt-2 font-semibold'>To adjust this quantity, <div onClick={() => setUpdateQuantity(true)} className='text-blue-500 cursor-pointer'>click here</div></div>
                        {updateQuantity && <UpdateQuantity setUpdateQty={setUpdateQuantity} item ={product} setMessage={setMessage} />}
                    </div>
                    {/* Min level */}
                    <div className='w-1/2'>
                        <label htmlFor="updatedMinLevel" className="block mb-2  font-medium text-gray-900 dark:text-white">Minimum qty <span className='text-red-500'>*</span></label>
                        <div className='flex'>
                            <input 
                                type="number"
                                //min="1" 
                                name="updatedMinLevel" 
                                id="updatedMinLevel" 
                                value={updatedMinLevel}
                                onChange={(e) => setUpdatedMinLevel(e.target.value)}
                                className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((updatedMinLevel ==="" || updatedMinLevel == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                                // required
                            />
                        </div>
                        {((updatedMinLevel === "") && showRequired) && (
                            <div className='absolute text-red-600 text-sm'>Required</div>
                        )}
                        {((Number(updatedMinLevel) < 1 && updatedMinLevel !== "") && showRequired) && (
                            <div className='absolute text-red-600 text-sm'>Enter a number greater than 0</div>
                        )}
                    </div>
                    {/* min level infos */}
                    <div className=' w-2/12 relative pt-7 right-5'>
                        <div>
                            <CircleHelp
                                color='gray'
                                className='relative'
                                onMouseEnter={() => setShowMinLevelDetails(true)} 
                                onMouseLeave={() => setShowMinLevelDetails(false)}
                            />
                            {
                                showMinLevelDetails && (
                                    <div className='absolute bg-gray-400 text-white p-2.5 rounded-md bottom-7 left-0'>
                                        <p className=''>The min. number of quantity before a low stock alert</p>
                                    </div>
                                )
                            }
                        </div>
                        
                    </div>
                </div>
                <div className='flex gap-8  w-full items-center'>

                    {/* Price */}
                    <div className='w-1/2'>
                        <label htmlFor="updatedPrice" className="block mb-2 font-medium text-gray-900">Price <span className='text-red-500'>*</span></label>
                        <div className='relative'>
                            <input 
                                type="number"
                                // min="1" 
                                name="updatedPrice" 
                                id="updatedPrice"
                                placeholder='100'
                                onChange={(e) => setUpdatedPrice(e.target.value)}
                                value={updatedPrice}
                                className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((updatedPrice ==="" || updatedPrice == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                                // required                                                            
                            />
                            {(updatedPrice === "" && showRequired) && (
                                <div className='absolute text-red-600 text-sm'>Required</div>
                            )}
                            {(Number(updatedPrice) < 1  && showRequired && price !== "") && (
                                <div className='absolute text-red-600 text-sm'>Enter a number greater than 0</div>
                            )}
                            <div className=' absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 '>
                                <p className='font-medium'>{updatedCurrency}</p>
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
                                <p className='font-medium'>{updatedCurrency}</p>
                            </div>
                        </div>
                    </div>
                    {/* Currency */}
                    <div className='w-2/12'>
                        {/* select units of price MAD, $, Euro */}
                        <p  className="block mb-2 text-sm font-medium text-gray-900">Currency</p>
                        <select 
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            value={updatedCurrency}
                            onChange={(e) => setUpdatedCurrency(e.target.value)}
                        >
                            <option value="USD">USD - US Dollar</option>
                            <option value="MAD">MAD - Moroccan Dirham</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="CAD">CAD - Canadian Dollar</option>
                            <option value="AUD">AUD - Australian Dollar</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="CNY">CNY - Chinese Yuan</option>
                            <option value="INR">INR - Indian Rupee</option>
                        </select>
                    </div>
                </div>
                {/* Category */}
                <div className=' w-full flex gap-8'>
                    <div className='relative w-1/2'>
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
                                <div className='absolute z-20 bg-white border border-gray-300 rounded-lg mt-3 overflow-hidden w-96'>
                                    {/* list of categories */}
                                    <div>
                                        <ListOfCategories setSelectedCategory={setUpdatedSelectedCategory}  setShowCategories={setShowCategories} />
                                    </div>
                                    {/* add new category */}
                                    <div>
                                        <div 
                                            onClick={() => setAddCategory(true)}
                                            className='text-blue-600 border-t border-gray-500 flex gap-3 py-2.5 px-2 items-center cursor-pointer'>
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
                    <div className='w-2/12'></div>
                </div>
                {/* Expire date */}
                <div className=' w-full flex gap-8'>
                    <div className='w-1/2 '>
                        <p className=' block mb-2 font-medium text-gray-900'>Expiry Date</p>
                        <div className='relative w-full'>
                            <div className="absolute z-10 right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <CalendarDays className='text-gray-500' />
                            </div>
                            <DatePicker
                                selected={updatedExpirationDate}
                                onChange={(date) => setUpdatedExpirationDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[450px] p-2.5 '
                                placeholderText='Select Date'
                            />
                        </div>
                    </div>
                    <div className='w-1/2'></div>
                    <div className='w-2/12'></div>
                </div>
                <div>
                    {/* image input */}
                    <p className="block mb-2  font-medium text-gray-900 ">Product Image</p>
                    <div className="flex items-center  w-full">
                        <label htmlFor="updatedProductPhoto" className="flex w-10/12 flex-col items-center  h-32 border-1 border-gray-300  rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100   ">
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
                                    <>
                                        <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">{updatedProductPhoto.name ? updatedProductPhoto.name : updatedProductPhoto}</p>
                                        {/* {updatedProductPhoto.name && (
                                            <img
                                                src={URL.createObjectURL(updatedProductPhoto)}
                                                alt="Preview"
                                                className="w-24 h-10 object-contain"
                                            />
                                        )} */}
                                        {/* <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">{updatedProductPhoto.size && ((updatedProductPhoto.size / 1024).toFixed(2))} KB</p> */}
                                    </>
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
                        <div className='w-1/4 py-2 flex justify-center items-center gap-2 px-3 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-100 border border-gray-200 '>
                            <div className='w-5 h-5 bg-red-600   rounded-full flex justify-center items-center'><X size={14} className='text-white' /></div>
                            <p>Please fill in all required fields</p> 
                        </div>
                    )}
                    {/* {(submitted && ((qty > 1) && (productName != "") && (price > 1 ) && (minLevel > 1))  ) && (
                        <div className='w-1/4 flex gap-2 justify-center items-center py-2 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-white border border-gray-300  '>
                            <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center' ><Check size={14} /></div>
                            <p>Item added successfully</p> 
                        </div>
                    )} */}
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
