import { ArrowLeft, Barcode, CalendarDays, Check, ChevronDown, CircleHelp, CirclePlus, ImageUp, PrinterCheckIcon, ScanBarcode, X } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import AddCategory from './AddCategory'
import ListOfCategories from './ListOfCategories'

function AddItem() {
    const [productName, setProductName] = useState("")
    const [barcode, setBarcode] = useState("")
    const [qty, setQty] = useState(0)
    const [minLevel, setMinLevel] = useState(0)
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] =  useState('MAD')
    const [showCategories, setShowCategories] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({id: "", name: ""})
    const [addCategory, setAddCategory] = useState(false)
    const [expirationDate, setExpirationDate] = useState("")
    const [productPhoto, setProductPhoto] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false)
    const [showRequired, setShowRequired] = useState(false)
    const [showMinLevelDetails, setShowMinLevelDetails ] = useState(false)
    const navigate = useNavigate()
    const datePickerRef = useRef(null);

    const handleDivClick = () => {
        if (datePickerRef.current) {
        datePickerRef.current.setFocus(); // Open the calendar
        }
    };

    let totalValue = () => {
        if (price || qty) return `${price * qty} `;
        else return `0`
    }
    const handleFileChange = (event) => {
        if(event.target.files.length > 0)
            setProductPhoto(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setSubmitted(true)

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
            navigate("/admin/items")
        }catch(error){
            console.log("Error: ", error)
        }
    }

    useEffect(() => {
        if(submitted  && (!qty || qty < 1 || price < 1 || !price || productName == "" || minLevel < 1)){
            setErrorMessage(true)
            setTimeout(() => setErrorMessage(false), 10000)
            setShowRequired(true)
            setSubmitted(false)
        }
        else if(submitted && qty > 1 && price > 1 && productName !== "" && minLevel > 1 ) {
            setErrorMessage(false)
            setShowRequired(false)
        }
        if(showRequired){
            scrollTo(0, 0)
        }
    }, [submitted, productName, qty, price, minLevel])

  return (
    <div className='my-3'>
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
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 mt-8 px-3'>
                <div className='flex gap-8 w-full'>
                    {/* product Name */}
                    <div className='w-1/2'>
                        <label htmlFor="productName" className="block mb-2  font-medium text-gray-900">Product Name <span className='text-red-500'>*</span></label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${(productName === "" && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                            type="text" 
                            name="productName" 
                            id="productName"
                            value={productName} 
                            onChange={(e) => setProductName(e.target.value)} 
                            placeholder='Product name'
                            // required
                        />
                        {(productName === "" && showRequired ) && (
                            <div className='absolute text-red-600 text-sm'>Required</div>
                        )}
                    </div>
                    {/* Barcode Number */}
                    <div className='w-1/2'>
                        <label htmlFor="barcode" className="block mb-2 font-medium text-gray-900">Barcode Number </label>
                        <div className='relative'>
                            <input 
                                placeholder='56034-25020'
                                type="number" 
                                name="barcode" 
                                id="barcode"
                                value={barcode}
                                onChange={(e) => setBarcode(e.target.value)} 
                                className="[appearance:textfield] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" 
                                
                            />
                            <Link className='absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 '>
                                <ScanBarcode className='text-blue-600'/>
                            </Link>
                        </div>
                    </div>
                    <div className='w-2/12'></div>
                </div>
                <div className='flex gap-8  w-full items-center'>
                    {/* Quantity */}
                    <div className='relative w-1/2'>
                        <label htmlFor="qty" className="block mb-2 font-medium text-gray-900">Quantity <span className='text-red-500'>*</span></label>
                        <input 
                            type="number" 
                            // min="1"
                            name="qty" 
                            id="qty"
                            value={qty}
                            onChange={(e) => setQty(e.target.value) }
                            placeholder="1" 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((qty==="" || qty == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                            // required 
                        />
                        {(qty === "" && showRequired) && (
                            <div className='absolute text-red-600 text-sm'>Required</div>
                        )}
                        {((Number(qty) < 1 && qty !== "") && showRequired) && (
                            <div className='absolute text-red-600 text-sm'>Enter a number greater than 0</div>
                        )}
                    </div>
                    {/* Min level */}
                    <div className='w-1/2'>
                        <label htmlFor="minLevel" className="block mb-2  font-medium text-gray-900 dark:text-white">Minimum qty <span className='text-red-500'>*</span></label>
                        <div className='flex '>
                            <input 
                                type="number"
                                //min="1" 
                                name="minLevel" 
                                id="minLevel" 
                                value={minLevel}
                                onChange={(e) => setMinLevel(e.target.value)}
                                className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((minLevel ==="" || minLevel == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                                // required
                            />
                        </div>
                        {((minLevel === "") && showRequired) && (
                            <div className='absolute text-red-600 text-sm'>Required</div>
                        )}
                        {((Number(minLevel) < 1 && minLevel !== "") && showRequired) && (
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
                        <label htmlFor="price" className="block mb-2 font-medium text-gray-900">Price <span className='text-red-500'>*</span></label>
                        <div className='relative z-0'>
                            <input 
                                type="number"
                                name="price" 
                                id="price"
                                placeholder='100'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none ${((price==="" || price == 0) && showRequired) ? ' border-red-600 ': 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}  `   }
                            />
                            {(price === "" && showRequired) && (
                                <div className='absolute z-0 text-red-600 text-sm'>Required</div>
                            )}
                            {(Number(price) < 1  && showRequired && price !== "") && (
                                <div className='absolute text-red-600 text-sm'>Enter a number greater than 0</div>
                            )}
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
                    {/* Currency */}
                    <div className='w-2/12'>
                        <p  className="block mb-2 text-sm font-medium text-gray-900">Currency</p>
                        <select 
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
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
                    <div className='relative z-10 w-1/2'>
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
                                <div className='absolute z-20 bg-white border border-gray-300 rounded-lg mt-3 overflow-hidden w-96'>
                                    {/* list of categories */}
                                    <div>
                                        <ListOfCategories setSelectedCategory={setSelectedCategory}  setShowCategories={setShowCategories} />
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
                        <div
                            onClick={handleDivClick} 
                            className='flex justify-between items-center pr-2 w-full bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm rounded-lg'>
                            <DatePicker
                                selected={expirationDate}
                                onChange={(date) => setExpirationDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className=' p-2.5 outline-none '
                                placeholderText='Select Date'
                                ref={datePickerRef}
                            />
                            <div >
                                <CalendarDays className='text-gray-500' />
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2'></div>
                    <div className='w-2/12'></div>
                </div>
                <div>
                    {/* image input */}
                    <p className="block mb-2  font-medium text-gray-900 ">Product Image</p>
                    <div className="flex items-center  w-full">
                        <label htmlFor="productPhoto" className="flex w-10/12 flex-col items-center  h-32 border-1 border-gray-300  rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100   ">
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
                    {errorMessage && (
                        <div className='w-1/4 py-2 flex justify-center items-center gap-2 px-3 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-red-100 border border-gray-200 '>
                            <div className='w-5 h-5 bg-red-600   rounded-full flex justify-center items-center'><X size={14} className='text-white' /></div>
                            <p>Please fill in all required fields</p> 
                        </div>
                    )}
                    {(submitted && ((qty > 1) && (productName != "") && (price > 1 ) && (minLevel > 1))  ) && (
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
    </div>
  )
}

export default AddItem
