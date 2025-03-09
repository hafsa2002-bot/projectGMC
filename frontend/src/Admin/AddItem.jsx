import { ArrowLeft, Barcode, ChevronDown, CirclePlus, ImageUp, ScanBarcode } from 'lucide-react'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function AddItem() {
    const [productName, setProductName] = useState("")
    const [barcode, setBarcode] = useState("")
    const [qty, setQty] = useState(1)
    const [minLevel, setMinLevel] = useState(0)
    const [price, setPrice] = useState(0)
    const [currency, setCurrency] =  useState('MAD')
    const [category, setCategory] = useState("")
    const [productPhoto, setProductPhoto] = useState("")
    const [showCategories, setShowCategories] = useState(false)
    const navigate = useNavigate()

    let totalValue = () => {
        if (price || qty) return `${price * qty} `;
        else return `0`
    }
    const handleFileChange = (event) => {
        setProductPhoto(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("productName", productName)
        formData.append("barcode", barcode)
        formData.append("qty", qty)
        formData.append("minLevel", minLevel)
        formData.append("price", price)
        formData.append("productPhoto", productPhoto)

        try{
            const response = await fetch("http://localhost:3003/admin/items/add-item", {
                method: "POST",
                body: formData,
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

  return (
    <div className='mt-3'>
        <div className=''>
            <Link to="/admin/items" className='flex gap-2 items-center w-40'>
                <div><ArrowLeft/></div>
                <div className='text-2xl'><p>All Items</p></div>
            </Link>
        </div>
        <div className='bg-white p-5 mt-5  rounded-lg mb-24'>
            <div className='mb-3'>
                <p className='text-xl font-semibold'>Product Details</p>
                <p className='text-gray-500'>Add your product to make invoicing and cost management easier (* for required fields)</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-8 px-3'>
                <div className='flex gap-8 w-9/12'>
                    {/* product Name */}
                    <div className='w-1/2'>
                        <label htmlFor="productName" className="block mb-2  font-medium text-gray-900">Product Name <span className='text-red-500'>*</span></label>
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" 
                            type="text" 
                            name="productName" 
                            id="productName"
                            value={productName} 
                            onChange={(e) => setProductName(e.target.value)} 
                            placeholder='Product name'
                        />
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
                </div>
                <div className='flex gap-8  w-9/12'>
                    {/* Quantity */}
                    <div className='w-1/2'>
                        <label htmlFor="qty" className="block mb-2 font-medium text-gray-900">Quantity <span className='text-red-500'>*</span></label>
                        <input 
                            type="number" 
                            min="0"
                            name="qty" 
                            id="qty"
                            value={qty}
                            onChange={(e) => setQty(e.target.value) }
                            placeholder="1" 
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" 
                            required 
                        />
                    </div>
                    {/* Min level */}
                    <div className='w-1/2'>
                        <label htmlFor="minLevel" className="block mb-2  font-medium text-gray-900 dark:text-white">Min Level <span className='text-red-500'>*</span></label>
                        <input 
                            type="text" 
                            name="minLevel" 
                            id="minLevel" 
                            value={minLevel}
                            onChange={(e) => setMinLevel(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   outline-none" 
                            required
                        />
                    </div>
                </div>
                <div className='flex gap-8  w-11/12 items-center'>

                    {/* Price */}
                    <div className='w-1/2'>
                        <label htmlFor="price" className="block mb-2 font-medium text-gray-900">Price <span className='text-red-500'>*</span></label>
                        <div className='relative'>
                            <input 
                                type="number"
                                min="0" 
                                name="price" 
                                id="price"
                                placeholder='100'
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" 
                                required                                                            
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
                    <div >
                        {/* select units of price DH, Dolar , Euro */}
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
                <div className=' w-9/12 flex gap-8'>
                    {/* <div >
                        select Category 
                        <p  className="block mb-2 text-sm font-medium text-gray-900">Category</p>
                        <select 
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            value={category}
                            onChange={handleCategoryChange}
                        >
                            <option value="">No category found</option>
                            <option value="add" className='hover:bg-white text-blue-600'>Add New Category</option>
                        </select>
                    </div> */}
                    <div className='relative w-1/2'>
                        <p className="block mb-2 text-sm font-medium text-gray-900">Category</p>
                        <div className="flex justify-between h-11 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5" >
                            <p>Choose category</p>
                            {   
                                showCategories 
                                ? (<ChevronDown className='rotate-180' onClick={() => setShowCategories(false)} />)
                                : (<ChevronDown onClick={() => setShowCategories(true)} />)
                            }
                            
                        </div>
                        {
                            showCategories && 
                            (
                                <div className='absolute bg-white border border-gray-300 w-full rounded-lg mt-3 overflow-hidden'>
                                    <ul>
                                        <li className='hover:bg-gray-100 py-2.5 px-2 border-b border-gray-300'>No category found</li>
                                    </ul>
                                    <div>
                                        <Link to="/admin/items/add-category" className='text-blue-600 flex gap-3 py-2.5 px-2 items-center'><CirclePlus size={20} /><p>Add new category</p> </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='w-1/2'></div>
                </div>
                <div>
                    {/* image input */}
                    <p className="block mb-2  font-medium text-gray-900 ">Product Image</p>
                    <div className="flex items-center justify-center w-11/12">
                        <label htmlFor="productPhoto" className="flex flex-col items-center justify-center w-full h-32 border-1 border-gray-300  rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 16">
                                    <ImageUp size={30} className='text-blue-600'/>                               
                                </div>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
                    <div className="w-32 text-center cursor-pointer font-semibold bg-blue-500 border border-gray-300 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none" >
                        <button className='cursor-pointer'>Save Product</button>
                    </div>
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
