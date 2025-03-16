import React, {useState, useEffect} from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import axios from 'axios'
import { EllipsisVertical, Eye, Image, PackageX, PenLine, Trash2, TrendingDown, TriangleAlert } from 'lucide-react'
import SpinnerLoader from '../SpinnerLoader'

function Items() {
    const [items, setItems] = useState([])
    const [stock, setStock] = useState({})
    const [bgColor, setBgColor] = useState('bg-gray-100')
    // const [showOptions, setShowOptions] = useState(false);
    
    const getItems = () => {
        axios.get("http://localhost:3003/admin/items/list")
        .then(response => setItems(response.data))
        .catch(error => console.log("Error: ", error))
    }
    
    const stockInfo = () => {
        axios.get("http://localhost:3003/admin/stock")
        .then(response => {
            setStock(response.data)
            //console.log("stock: ", response.data)
        })
        .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        getItems()
        stockInfo()
    }, [items])
    // if(!items) return <SpinnerLoader/>
  return (
    <div className='mb-32'>
        {/* <div className=' bg-gray-100 border-b border-gray-400 flex justify-between items-center py-5'>
            <div className='text-3xl text-gray-700 font-semibold'>
                <p>All Items</p>
            </div>
            <div className='flex text-white gap-4'>
                <Link to="/admin/items/add-item" className='bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                    <p>Add Item</p>
                </Link>
                <Link to="/admin/items/add-category" className='bg-blue-600 px-3 py-2 rounded-xl font-semibold '>
                    <p>Add Category</p>
                </Link>
            </div>
        </div> */}
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
        <div class=" bg-white pt-3 border border-gray-300 mt-8   shadow-md sm:rounded-lg">
            <div className='flex gap-3 mx-6 mt-3 mb-7 border-b border-gray-300'>
                <NavLink 
                    to="/admin/items"
                    className={({isActive}) => isActive && window.location.pathname === "/admin/items"  ?  'text-blue-600 border-b-2 text-sm  pb-1 border-blue-600 flex items-center justify-center gap-3 px-3': ' text-sm px-3 pb-1 text-gray-600  flex items-center justify-center gap-3'} >
                    <p className='font-semibold '>All</p>
                    <NavLink to="/admin/items" className={({isActive}) => isActive && window.location.pathname === "/admin/items" ? 'bg-blue-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' : 'bg-gray-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' }>
                        {items.length}
                    </NavLink>
                </NavLink>
                {/* category.map(v => (<NavLink to="/admin/items/category/${v.categoryName}"> {v.categoryName} </NavLink>) ) */}
                <NavLink
                    to="/admin/items/category/:categoryName" 
                    className={({isActive}) => isActive  ? 'text-blue-600 border-b-2 text-sm  pb-1 border-blue-600 flex items-center justify-center px-3 gap-3': ' text-sm  pb-1 text-gray-600 px-3 flex items-center justify-center gap-3'} >
                    <p className='font-semibold '>CategoryName</p>
                    <NavLink to="/admin/items/category/:categoryName"  className={({isActive}) => isActive ? 'bg-blue-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' : 'bg-gray-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' }>0</NavLink>
                </NavLink>
            </div>
            <Outlet/>
        </div> 
        
    </div>
  )
}

export default Items
