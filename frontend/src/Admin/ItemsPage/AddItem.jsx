import { AlertCircle, ArrowLeft, Barcode, CalendarDays, Check, ChevronDown, CircleHelp, CirclePlus, ImageUp, PrinterCheckIcon, ScanBarcode, X } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css"
import AddCategory from './AddCategory'
import ListOfCategories from './ListOfCategories'
import BarCode from './BarCode'
import BatchForm from './BatchForm'
import { useCart } from '../../CartContext'

function AddItem() {
    const [productName, setProductName] = useState("")
    const [barcode, setBarcode] = useState("")
    const [qty, setQty] = useState(0)
    const [minLevel, setMinLevel] = useState(0)
    const [price, setPrice] = useState(0)
    const {currency} = useCart()
    const [showCategories, setShowCategories] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({id: "", name: ""})
    const [addCategory, setAddCategory] = useState(false)
    const [expirationDate, setExpirationDate] = useState("")
    const [productPhoto, setProductPhoto] = useState(null)
    const [successMessage, setSuccessMessage] = useState(false)
    const [showMinLevelDetails, setShowMinLevelDetails ] = useState(false)
    const [batches, setBatches] = useState([{ id: 1, qty: 0, expirationDate: "" }]);
    const [errorMessage, setErrorMessage] = useState(false)
    const navigate = useNavigate()
    const datePickerRef = useRef(null);

    const handleDivClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setFocus(); // Open the calendar
        }
    };

    let totalValue = () => {
        // if (price || qty) return `${(price * qty).toFixed(2)} `;
        // else return `0`
        
        let total = batches.reduce((acc, batch) => {
            return acc + (price * batch.qty);
        }, 0);
        
          // Return the formatted total value (rounded to two decimals)
        return total.toFixed(2);
    }
    const handleFileChange = (event) => {
        if(event.target.files.length > 0)
            setProductPhoto(event.target.files[0])
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
        
        const formData = new FormData();
        formData.append("productName", productName)
        formData.append("barcode", barcode)
        formData.append("qty", qty)
        formData.append("itemsSold", 0)
        formData.append("minLevel", minLevel)
        formData.append("price", price)
        formData.append("productPhoto", productPhoto)
        formData.append("expirationDate", expirationDate)
        formData.append("categoryId", selectedCategory.id)
        formData.append("batches", JSON.stringify(validBatches));

        try{
            const response = await fetch("http://localhost:3003/admin/items/add-item", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            })
            if(!response.ok){
                throw new Error("failed to add item")
            }
            const result = await response.json()
            console.log("Item added: ", result)
            setSuccessMessage(true)
            setTimeout(() => setSuccessMessage(false), 1500)
            scrollTo(0, 0)
            setTimeout(() => navigate("/admin/items"), 2000)
        }catch(error){
            console.log("Error: ", error)
        }
    }

  return (
    <div className='lg:my-3 mt-5 lg:px-0 px-3'>
        <div className=' mb-9'>
            <Link to="/admin/items" className='flex gap-2 items-center text-gray-600 w-52'>
                <div><ArrowLeft/></div>
                <div className='text-2xl  pl-2 font-semibold'><p>Add New Item</p></div>
            </Link>
        </div>
        <div className='bg-white p-5 mt-5  rounded-lg mb-24'>
            <div className='mb-3'>
                <p className='text-xl font-semibold'>Product Details</p>
                <p className='text-gray-500'>Add your product to make invoicing and cost management easier (<span className='text-red-600 font-semibold'>*</span> for required fields)</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-8 lg:px-3'>
                <div className='lg:flex gap-8 w-11/12 '>
                    {/* product Name */}
                    <div className='lg:w-1/2 w-full lg:mb-0 mb-4'>
                        <label htmlFor="productName" className="block mb-2  font-medium text-gray-900">Product Name <span className='text-red-500'>*</span></label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                            type="text" 
                            name="productName" 
                            id="productName"
                            autoComplete='off'
                            value={productName} 
                            onChange={(e) => setProductName(e.target.value)} 
                            placeholder='Product name'
                            required
                        />
                    </div>
                    {/* Barcode Number */}
                    <div className='lg:w-1/2 w-full'>
                        <label htmlFor="barcode" className="block mb-2 font-medium text-gray-900">Barcode Number </label>
                        <div className='w-full flex justify-between items-center gap-3'>
                            <input 
                                placeholder='x xxxxxx xxxxxx'
                                type="number" 
                                name="barcode"
                                autoComplete='off' 
                                id="barcode"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)} 
                                className="[appearance:textfield] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" 
                            />
                            <BarCode setBarcode={setBarcode} setProductName={setProductName} />
                        </div>
                    </div>
                </div>
                {/* Category */}
                <div className=' lg:w-11/12 w-11/12 flex lg:gap-8'>
                    <div className='relative z-10 lg:w-1/2 w-full'>
                        <p className="block mb-2 font-medium text-gray-900">Category</p>
                        <div  onClick={() => setShowCategories(!showCategories)} className= "flex justify-between h-11 bg-gray-50 cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" >
                            <p className={selectedCategory.name ? 'text-gray-900'  : 'text-gray-500'} >{selectedCategory.name || "Choose category"}</p>
                            {   
                                showCategories 
                                ? (<ChevronDown className='rotate-180 cursor-pointer' onClick={() => setShowCategories(false)} />)
                                : (<ChevronDown className='cursor-pointer' onClick={() => setShowCategories(true)} />)
                            }
                            
                        </div>
                        {showCategories && 
                            (
                                <div className='absolute z-50 bg-white text-gray-700 border border-gray-400 rounded-lg mt-3 overflow-hidden w-full shadow-lg'>
                                    {/* list of categories */}
                                    <div>
                                        <ListOfCategories setSelectedCategory={setSelectedCategory}  setShowCategories={setShowCategories} />
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
                    <div className='lg:w-1/2 hidden lg:flex'></div>
                </div>
                {/* Batches */}
                <BatchForm rows={batches} setRows={setBatches}  />
                <div className='lg:flex gap-8  w-11/12 items-center'>
                    {/* Price */}
                    <div className='lg:w-1/2  '>
                        <label htmlFor="price" className="block mb-2 font-medium text-gray-900">Price <span className='text-red-500'>*</span></label>
                        <div className='relative z-0'>
                            <input 
                                type="number"
                                min="1"
                                name="price" 
                                id="price"
                                step="any"
                                autoComplete='off'
                                placeholder='100'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                required
                                className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500  `   }
                            />
                            <div className=' absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 '>
                                <p className='font-medium'>{currency}</p>
                            </div>
                        </div>
                    </div>
                    {/* Total Value */}
                    <div className='lg:w-1/2 lg:mt-0 mt-5'>
                        <label htmlFor="total" className="block mb-2  font-medium text-gray-900 ">Total Value(hidden)</label>
                        <div className='relative'>
                            <input 
                                type="number" 
                                name="total" 
                                id="total"
                                autoComplete='off'
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
                <div className='flex lg:gap-8 gap-2  w-11/12 items-center '>
                    {/* Min level */}
                    <div className='lg:w-1/2 w-11/12 flex justify-between items-center '>
                        <div className=' w-full'>
                            <label htmlFor="minLevel" className="block mb-2  font-medium text-gray-900 dark:text-white">Minimum qty <span className='text-red-500'>*</span></label>
                            <div className='flex '>
                                <input 
                                    type="number"
                                    min="1" 
                                    name="minLevel"
                                    autoComplete='off' 
                                    id="minLevel" 
                                    value={minLevel}
                                    onChange={(e) => setMinLevel(e.target.value)}
                                    className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    {/* min level infos */}
                    <div className=' lg:w-1/2 w-1/12 relative pt-7 lg:right-5 '>
                        <CircleHelp
                            color='gray'
                            className='relative'
                            onMouseEnter={() => setShowMinLevelDetails(true)} 
                            onMouseLeave={() => setShowMinLevelDetails(false)}
                        />
                        {
                            showMinLevelDetails && (
                                <div className=' w-40 absolute bg-gray-600 text-white p-2.5 rounded-md bottom-9 lg:left-0 lg:right-0 right-0'>
                                    <p className=''>The min. number of quantity before a low stock alert</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    {/* image input */}
                    <p className="block mb-2  font-medium text-gray-900 ">Product Image</p>
                    <div className="flex items-center  w-11/12">
                        <label htmlFor="productPhoto" className="flex w-full flex-col items-center  h-32 border-1 border-gray-300  rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100   ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 16">
                                    <ImageUp size={30} className='text-blue-600'/>                               
                                </div>
                                {(!productPhoto)
                                ?(
                                    <>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </>
                                )
                                :(
                                    <>
                                        <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">{productPhoto.name && productPhoto.name}</p>
                                        <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">{productPhoto.size && ((productPhoto.size / 1024).toFixed(2))} KB</p>
                                    </>
                                )}
                            </div>
                            <input 
                                id="productPhoto"
                                name="productPhoto" 
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
                    {  successMessage && (
                        <div className='w-1/4 flex gap-2 justify-center items-center py-2 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-white border border-gray-300  '>
                            <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center' ><Check size={14} /></div>
                            <p>Item added successfully</p> 
                        </div>
                    )}
                    <div className='cursor-pointer text-red-500 font-medium'>
                        <div onClick={() => navigate(-1)}>Cancel</div>
                    </div>
                </div>
            </form>
        </div>
        {
            errorMessage && 
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-xl shadow-md flex items-center gap-3 z-50">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>Please fill in at least one valid batch</span>
            </div>
        }
    </div>
  )
}

export default AddItem
