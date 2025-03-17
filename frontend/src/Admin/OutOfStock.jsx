import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ArrowLeft, EllipsisVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import SpinnerLoader from '../SpinnerLoader'

function OutOfStock() {
    const [outOfStockProducts, setOutOfStockProducts] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/outOfStock")
            .then(response => {
                setOutOfStockProducts(response.data)
                console.log("list of products outOfStock: ", response.data)
            })
            .catch(error => console.log("Error: ", error))
    }, [])
  return (
    <div className='my-3'>
        <div className=''>
            <Link to="/admin/items" className='flex gap-2 items-center w-40'>
                <div><ArrowLeft/></div>
                <div className='text-2xl'><p>All Items</p></div>
            </Link>
        </div>
        <div className='bg-white pb-5 mt-10  rounded-lg mb-24'>
            <div className='p-7 pb-10'>
                <p className='text-xl font-semibold'>Out of Stock Products</p>
                <p className='text-gray-500'>This page lists items that are currently unavailable</p>
            </div>
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
                    {
                        outOfStockProducts
                        ?(
                            outOfStockProducts.map((item, index) => (
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
                                        {item.minLevel}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.qty}
                                    </td>
                                    <td className="px-6 py-4 text-red-600 text-2xl">
                                        <p>!!!</p>
                                    </td>
                                    <td className="px-6 py-4 text-base ">
                                        {item.price  } <span className='text-black'>MAD</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                        <EllipsisVertical />
                                    </td>
                                </tr>
                            ))
                        )
                        : (
                            <SpinnerLoader/>
                        )
                    }           
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OutOfStock
