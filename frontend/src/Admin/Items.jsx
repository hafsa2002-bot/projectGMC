import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { EllipsisVertical, PackageX, TrendingDown, TriangleAlert } from 'lucide-react'
import SpinnerLoader from '../SpinnerLoader'

function Items() {
    const [items, setItems] = useState([])
    const [stock, setStock] = useState({})

    const getItems = () => {
        axios.get("http://localhost:3003/admin/items/list")
        .then(response => setItems(response.data))
        .catch(error => console.log("Error: ", error))
    }
    const stockInfo = () => {
        axios.get("http://localhost:3003/admin/stock")
        .then(response => {
            setStock(response.data)
            console.log("stock: ", response.data)
        })
        .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        getItems()
        stockInfo()
    }, [])
    if(!items) return <SpinnerLoader/>
  return (
    <div className='mb-32'>
        <div className='border-b border-gray-400 flex justify-between items-center py-5'>
            <div className='text-3xl text-gray-700 font-semibold'>
                <p>All Items</p>
            </div>
            <div className='flex text-white gap-4'>
                <div className='bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                    <Link to="/admin/items/add-item">Add Item</Link>
                </div>
                <div className='bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                    <Link to="/admin/items/add-category">Add Category</Link>
                </div>
            </div>
        </div>
        <div className='flex gap-10 mt-5'>
            <Link to="/admin/items/out-of-stock" className='bg-white text-lg w-1/2 flex gap-5 items-center h-24 rounded-lg px-5 '>
                <div className='bg-blue-50 w-14 h-14 rounded-full flex justify-center items-center'>
                    <PackageX size={28} className='text-blue-600'/>
                </div>
                <div>
                    <p>Out of stock</p>
                    <p className='font-semibold'>{stock ? (<span>{stock.totalOutOfStock}</span>): (<span>N/A</span>)}</p>
                </div>
            </Link>
            <Link to="/admin/items/low-in-stock" className='bg-white text-lg w-1/2 flex gap-5 items-center h-24 rounded-lg px-5'>
                <div className='bg-orange-50 w-14 h-14 rounded-full flex justify-center items-center '>
                    <TrendingDown size={28} className='text-orange-600'/>
                </div>
                <div>
                    <p>Low in stock</p>
                    <p className='font-semibold'>{stock.totalLowInStock}</p>
                </div>
            </Link>
            <Link to="/admin/items/expired-items" className='bg-white text-lg w-1/2 flex gap-5 items-center h-24 rounded-lg px-5'>
                <div className='bg-red-50 w-14 h-14 rounded-full flex justify-center items-center '>
                    <TriangleAlert color='rgb(254, 242, 242)'  fill="rgb(222, 13, 7)" size={30} />
                </div>
                <div>
                    <p>Expired Items</p>
                    <p className='font-semibold'>{stock.totalExpiredProducts}</p>
                </div>
            </Link>
        </div>
        <div class=" bg-white border border-gray-300 mt-8  overflow-x-auto shadow-md sm:rounded-lg">
            <div className='mx-6 mt-3 mb-7 border-b border-gray-300'>
                <div className='border-b-2 text-sm w-20 pb-1 border-blue-600 flex items-center justify-center gap-3'>
                    <p className='font-semibold text-blue-600'>All</p>
                    <div className='px-2 py-0.5 flex justify-center items-center rounded-2xl bg-blue-100 text-blue-600'>{items.length}</div>
                </div>
            </div>
            <table class=" w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class=" text-gray-700  bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Qty available
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Items sold
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Unit price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Expiry Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    items
                    ?(
                        items.map((item, index) => (
                            <tr key={index} class=" bg-white border-b border-gray-200">
                                <td scope="row" class="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className='w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                        <img className='w-full h-full' src={`http://localhost:3003${item.productPhoto}`}/>
                                    </div>
                                    <div>
                                        <p className='text-base'>{item.productName}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    {item.qty}
                                </td>
                                <td class="px-6 py-4 text-2xl text-red-600">
                                    !!!
                                </td>
                                <td class="px-6 py-4">
                                    {item.price} <span className='text-black'>MAD</span>
                                </td>
                                <td class="px-6 py-4 text-base ">
                                    {
                                    item.expirationDate  
                                    ? (item.expirationDate.slice(0,10))
                                    : (<p>-</p>)
                                    }
                                </td>
                                <td class="px-6 py-4">
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                    <EllipsisVertical />
                                </td>
                            </tr>
                            // <div key={index}>
                            //     <p>{item.productName}</p>
                            // </div>
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

export default Items
