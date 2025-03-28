import axios from 'axios'
import { ArrowLeft, EllipsisVertical } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import SpinnerLoader from '../../SpinnerLoader'
import SpinnerBlue from '../SpinnerBlue'

function ExpiredItems() {
    const [expiredProducts, setExpiredProducts] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/expiredItems")
            .then(response => {
                setExpiredProducts(response.data)
                setLoading(false)
                console.log("Expired products: ", response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [])
  return (
    <div className='my-3'>
        <div className=''>
            <Link to="/admin/items" className='flex gap-2 items-center w-40'>
                <div><ArrowLeft/></div>
                <div className='text-2xl'><p>All Items</p></div>
            </Link>
        </div>
        {loading ? (
            <SpinnerBlue/>
        ):(
        <div className='bg-white pb-5 mt-10  rounded-lg mb-24'>
            <div className='p-7 pb-10'>
                <p className='text-xl font-semibold'>Expired Products</p>
                <p className='text-gray-500'>This page displays products that are no longer valid for sale due to expiration.</p>
            </div>
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
                            Expiry Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Available Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity Sold
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody className=''>
                    {expiredProducts.map((item, index) => (
                        <tr key={index} className=" bg-white border-b border-gray-200">
                            <td scope="row" className="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className='w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                    <img className='w-full h-full' src={`http://localhost:3003${item.productPhoto}`}/>
                                </div>
                                <div>
                                    <p className='text-sm'>{item.productName}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {item.expirationDate.slice(0, 10)}
                            </td>
                            <td className="px-6 py-4">
                                {item.qty}
                            </td>
                            <td className="px-6 py-4 text-red-600 text-2xl">
                                <p>!!!</p>
                            </td>
                            <td className="px-6 py-4">
                                {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                <EllipsisVertical />
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

export default ExpiredItems
