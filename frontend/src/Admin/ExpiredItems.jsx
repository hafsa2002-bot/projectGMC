import axios from 'axios'
import { ArrowLeft, EllipsisVertical } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import SpinnerLoader from '../SpinnerLoader'

function ExpiredItems() {
    const [expiredProducts, setExpiredProducts] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/expiredItems")
            .then(response => {
                setExpiredProducts(response.data)
                console.log("Expired products: ", response.data)
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
                <p className='text-xl font-semibold'>Expired Products</p>
                <p className='text-gray-500'>This page displays products that are no longer valid for sale due to expiration.</p>
            </div>
            <table class=" w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class=" text-gray-700  bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Expiry Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Available Stock
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity Sold
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expiredProducts
                        ?(
                            expiredProducts.map((item, index) => (
                                <tr key={index} class=" bg-white border-b border-gray-200">
                                    <td scope="row" class="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className='w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                            <img className='w-full h-full' src={`http://localhost:3003${item.productPhoto}`}/>
                                        </div>
                                        <div>
                                            <p className='text-sm'>{item.productName}</p>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.expirationDate.slice(0, 10)}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.qty}
                                    </td>
                                    <td class="px-6 py-4 text-red-600 text-2xl">
                                        <p>!!!</p>
                                    </td>
                                    <td class="px-6 py-4">
                                        {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
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

export default ExpiredItems
