import axios from 'axios'
import { ArrowLeft, EllipsisVertical, Image, PenLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import SpinnerLoader from '../../SpinnerLoader'
import SpinnerBlue from '../SpinnerBlue'
import UpdateQuantity from './UpdateQuantity'
import { jwtDecode } from 'jwt-decode'

function LowInStock() {
    const [lowInStock, setLowInStock] = useState([])
    const [loading, setLoading] = useState(true)
    const [updateQty, setUpdateQty] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null);
    const [message, setMessage] = useState(false)
    const token = localStorage.getItem("token");
    let userRole = null;
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }

    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/lowInStock")
            .then(response => {
                setLowInStock(response.data)
                setLoading(false)
                // console.log("low in stock products: ", response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    // }, [lowInStock])
}, [])

    const handleUpdateQty = (item) => {
        setSelectedItem(item);
        setUpdateQty(true);
    };

  return (
    <div className='my-3'>
        <div className=''>
            <Link to="/admin/items" className='flex gap-3 items-center w-52'>
                <div><ArrowLeft/></div>
                <div className='text-2xl font-poppins'><p>Low In Stock</p></div>
            </Link>
        </div>
        {loading ? (
            <SpinnerBlue/>
        ):(
            <div className='bg-white pb-5 mt-10  rounded-lg mb-24'>
                <div className='p-7 pb-10'>
                    <p className='text-xl font-semibold'>Low Stock Products</p>
                    <p className='text-gray-500'>This page displays items with low stock levels</p>
                </div>
            {
                lowInStock.length > 0
                ?(
                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className=" text-gray-700  bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Minimum Stock
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available Stock
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
                        {  lowInStock.map((item, index) => (
                            <tr key={index} className=" bg-white border-b border-gray-200">
                                <td scope="row" className="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <Link to={`/admin/items/view/${item._id}`} className='flex items-center gap-4 '>
                                        <div className=' flex justify-center items-center realtive w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                            {
                                                item.productPhoto 
                                                ?   <img className='w-full h-full' src={`http://localhost:3003${item.productPhoto}`}/>
                                                :   <div className= '  w-full  h-full flex justify-center items-center bg-gray-200 '><Image className=' text-gray-600 w-6 h-6 ' strokeWidth='1'  /></div>
                                            }
                                        </div>
                                        <div>
                                            <p className='text-base max-w-60 truncate'>{item.productName}</p>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4">
                                    {item.minLevel}
                                </td>
                                <td className="px-6 py-4">
                                    {item.qty}
                                </td>
                                <td className="px-6 py-4 ">
                                    <p>{item.itemsSold}</p>
                                </td>
                                <td className="px-6 py-4 text-base ">
                                    {item.price  } <span className='text-black'>MAD</span>
                                </td>
                                <td className="px-6 py-4">
                                    {userRole == "admin" ? (
                                        <PenLine
                                            className='cursor-pointer'
                                            onClick={() => handleUpdateQty(item)}
                                        />
                                    ):(
                                        <Link to={`/admin/items/view/${item._id}`} className='hover:text-black underline text-blue-500 '>
                                            View
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {updateQty && selectedItem && <UpdateQuantity setUpdateQty={setUpdateQty} item={selectedItem} setMessage={setMessage} />}
                    </tbody>
                </table>
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
        {message && (
            <div className='w-1/4 flex gap-2 justify-center items-center py-2 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-white border border-gray-300  '>
                <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center' ><Check size={14} /></div>
                <p>Category updated successfully</p> 
            </div>
        )}
    </div>
  )
}

export default LowInStock
