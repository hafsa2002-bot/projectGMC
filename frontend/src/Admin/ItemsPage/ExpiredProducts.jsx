import axios from 'axios'
import { ArrowLeft, EllipsisVertical, Image } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import SpinnerBlue from '../SpinnerBlue'

function ExpiredProducts() {
    const [expiredProducts, setExpiredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/admin/items/expiredItems`)
            .then(response => {
                setExpiredProducts(response.data)
                setLoading(false)
                // console.log("Expired products: ", response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [])
  return (
    <div className='my-3'>
        {loading ? (
            <SpinnerBlue/>
        ):(
        <div className='bg-white pb-5 mt-10  rounded-lg mb-7'>
            {
                expiredProducts.length > 0
                ?(
            <table className=" w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className=" text-gray-700  bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Expired Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Available Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity Sold
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {expiredProducts.map((item, index) => (
                        <tr key={index} className=" bg-white border-b border-gray-200">
                            <td scope="row" className="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                                <span className='font-semibold mr-1'>{item.expiredQty}</span> items
                            </td>
                            <td className="px-6 py-4">
                                <span className='font-semibold mr-1'>{item.qty}</span> items
                            </td>
                            <td className="px-6 py-4">
                                <span className='font-semibold mr-1'>{item.itemsSold}</span> items
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )
            : (
                <div className='flex flex-col gap-3  justify-center items-center py-14 m-auto'>
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

export default ExpiredProducts
