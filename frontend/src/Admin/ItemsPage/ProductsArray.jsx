import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { EllipsisVertical, Eye, Image, PenLine, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import PopUp from './PopUp'
import { jwtDecode } from 'jwt-decode'
import SpinnerLoader from '../../SpinnerLoader'
import { useCart } from '../../CartContext'

function ProductsArray({products, loading, setProducts}) {
    const [showOptions, setShowOptions] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const token = localStorage.getItem("token");
    let userRole = null;
    const {currency} = useCart()
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }
  return (
    <div className='my-3'>
        {loading ? (
            <SpinnerLoader/>
        ):(
            <div className='bg-white pb-5 mt-3  rounded-lg mb-7'>
                {
                    products.length > 0
                    ?(
                        
                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className=" text-gray-700  bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Minimum Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity Sold
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Unit price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={index} className=" bg-white border-b border-gray-200">
                                <td scope="row" className="px-6 py-4 flex items-center gap-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link to={`/admin/items/view/${item._id}`} className='flex items-center gap-4 '>
                                        <div className=' flex justify-center items-center realtive w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                            {
                                                item.productPhoto 
                                                ?   <img className='w-full h-full' src={`${apiUrl}${item.productPhoto}`}/>
                                                :   <div className= '  w-full  h-full flex justify-center items-center bg-gray-200 '><Image className=' text-gray-600 w-6 h-6 ' strokeWidth='1'  /></div>
                                            }
                                        </div>
                                        <div>
                                            <p className='text-base max-w-60 truncate'>{item.productName}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    {item.qty}
                                </td>
                                <td className="px-6 py-4">
                                    {item.minLevel}
                                </td>
                                <td className="px-6 py-4 ">
                                    <p>{item.itemsSold}</p>
                                </td>
                                <td className="px-6 py-4 text-base ">
                                    {item.price  } <span className='text-black'> {currency} </span>
                                </td>
                                <td className="relative px-6 py-4">
                                    {
                                        userRole == "admin" ? (
                                            <>
                                            <EllipsisVertical  onClick={() => setShowOptions(index === showOptions ? null : index)} className='cursor-pointer' />
                                            {
                                                showOptions === index && (
                                                    <div className=' z-30 absolute right-12 top-16 bg-white shadow-md border border-gray-200 rounded-lg text-black w-32'>
                                                        <Link to={`/admin/items/view/${item._id}`} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                            <div><Eye /></div>
                                                            <p>View</p>
                                                        </Link>
                                                        <Link to={`/admin/items/update-item/${item._id}`} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                            <div><PenLine /></div>
                                                            <p>Update</p>
                                                        </Link>
                                                        <Link onClick={() => setPopUp(true)} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center text-red-600'>
                                                            <div><Trash2 /></div>
                                                            <p>Delete</p>
                                                        </Link>
                                                        {popUp && <PopUp setPopUp={setPopUp} name={item.productName} id={item._id} setShowOptions={setShowOptions} products={products} setProducts={setProducts} />}
                                                    </div>
                                                )
                                            }
                                            </>
                                        ):(
                                            <Link to={`/admin/items/view/${item._id}`} className='hover:text-black underline text-blue-500 '>
                                                View
                                            </Link>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            //    <ProductsArray products ={OutOfStockProducts} />
                )
                : (
                    <div className='flex flex-col gap-3  justify-center items-center py-14'>
                        <img src="/images/sticker.svg" className='w-32 ' alt="" />
                        <div className='flex flex-col items-center'>
                            <p className='text-xl font-semibold'>Your products show up here</p>
                            <p className='text-gray-600'>Click the <span className='font-semibold'>Add Item</span> button below to add products </p>
                        </div>
                        <Link to="/admin/items/add-item" className='text-white bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                            <p>Add Item</p>
                        </Link>
                    </div>
                )
            }           
            </div>
        )}   
    </div>
  )
}

export default ProductsArray
