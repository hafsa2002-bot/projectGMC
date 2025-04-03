import React, {useState, useEffect} from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import axios from 'axios'
import { ChevronDown, EllipsisVertical, Eye, Image, PackageX, PenLine, Search, SlidersHorizontal, Trash2, TrendingDown, TriangleAlert } from 'lucide-react'
import SpinnerLoader from '../../SpinnerLoader'
import SpinnerBlue from '../SpinnerBlue'
import AllItems from './AllItems'
import OutOfStock from './OutOfStock'
import OutOfStockProducts from './OutOfStockProducts'
import LowInStockProducts from './LowInStockProducts'
import ExpiredProducts from './ExpiredProducts'
import ProductsFiltered from './ProductsFiltered'

function Items() {
    const [items, setItems] = useState([])
    const [stock, setStock] = useState({})
    const [loading, setLoading] = useState(true)
    const [showFilter, setShowFilter] = useState(false)
    const [showAllItems, setShowAllItems] = useState(false)
    const [showOutOfStockItems, setShowOutOfStockItems] = useState(false)
    const [showLowInStockItems, setShowLowInStockItems] = useState(false)
    const [showExpiredItems, setShowExpiredItems] = useState(false)
    const [productName, setProductName] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    
    const getItems = () => {
        axios.get("http://localhost:3003/admin/items/list")
        .then(response => setItems(response.data))
        .catch(error => console.log("Error: ", error))
    }
    
    const stockInfo = () => {
        axios.get("http://localhost:3003/admin/stock")
        .then(response => {
            setStock(response.data)
            setLoading(false)
            //console.log("stock: ", response.data)
        })
        .catch(error => {
            console.log("Error: ", error)
            setLoading(false)
        })
    }

    const filterProducts = (name) => {
        const result = items?.filter(product => product.productName.toLowerCase().includes(name.toLowerCase()))
        setFilteredProducts(result)
    }
    
    useEffect(() => {
        getItems()
        stockInfo()
    }, [items])
    // if(!items) return <SpinnerLoader/>
  return (
    <div className='mb-32'>
        {
            loading 
            ?(
                <SpinnerBlue/>
            ):(
            <>
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
                <div className=" bg-white pt-3 border border-gray-300 mt-8   shadow-md sm:rounded-lg">
                    <div className='flex gap-3 mx-6 mt-3 mb-7 border-b border-gray-300'>
                        <NavLink 
                            to="/admin/items"
                            className={({isActive}) => isActive && window.location.pathname === "/admin/items"  ?  'text-blue-600 border-b-2 text-sm  pb-1 border-blue-600 flex items-center justify-center gap-3 px-3': ' text-sm px-3 pb-1 text-gray-600  flex items-center justify-center gap-3'} >
                            <p className='font-semibold '>All</p>
                            <NavLink to="/admin/items" className={({isActive}) => isActive && window.location.pathname === "/admin/items" ? 'bg-blue-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' : 'bg-gray-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' }>
                                {showAllItems 
                                ? items.length : showOutOfStockItems 
                                ? stock.totalOutOfStock : showLowInStockItems
                                ? stock.totalLowInStock : showExpiredItems
                                ? stock.totalExpiredProducts : productName
                                ? filteredProducts.length : items.length}
                            </NavLink>
                        </NavLink>
                    </div>
                    <div className='flex gap-10 px-5'>
                        {/* search products */}
                        <div className='bg-gray-100 flex items-center px-3 gap-3  w-10/12 text-gray-400 outline-blue-500  rounded-lg'>
                            <Search size={20} />
                            <input
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                    if(e.target.value != "") filterProducts(e.target.value)
                                    else setFilteredProducts(items)
                                }}
                                value={productName} 
                                type="search" name="producName" id="productName"
                                placeholder='Search to find items'
                                className="outline-none text-black placeholder:text-gray-400 w-11/12  py-2.5" 
                            />
                        </div>
                        {/* filter products : by out of stock, low in stock, expired, all of them */}
                        <div
                            onClick={() => setShowFilter(!showFilter)} 
                            className='relative cursor-pointer hover:bg-gray-500 hover:text-white bg-gray-100 flex items-center justify-center gap-2 w-2/12 rounded-lg px-3 py-2.5 text-gray-700'
                        >
                            <SlidersHorizontal size={20} />
                            <p>
                                {showAllItems 
                                ? "All items" : showOutOfStockItems 
                                ? "Out Of Stock" : showLowInStockItems
                                ? "Low in stock" : showExpiredItems
                                ? "Expired items" : "Filter"}
                            </p>
                            {showFilter && (
                                <div className='w-40 h-42 bg-white text-gray-800 absolute top-12 z-50 border border-gray-200 rounded-lg'>
                                    <div 
                                        onClick={() => {
                                            setShowAllItems(true)
                                            setShowOutOfStockItems(false)
                                            setShowLowInStockItems(false)
                                            setShowExpiredItems(false)
                                        }}  
                                        className='border-b border-gray-300  px-2.5 py-2 cursor-pointer'
                                    >All Items</div>
                                    <div 
                                        onClick={() => {
                                            setShowOutOfStockItems(true)
                                            setShowAllItems(false)
                                            setShowLowInStockItems(false)
                                            setShowExpiredItems(false)
                                        }} 
                                        className='border-b border-gray-300 px-2.5 py-2 cursor-pointer'
                                    >Out of stock items</div>
                                    <div
                                        onClick={() => {
                                            setShowLowInStockItems(true)
                                            setShowOutOfStockItems(false)
                                            setShowAllItems(false)
                                            setShowExpiredItems(false)
                                        }} 
                                        className='border-b border-gray-300  px-2.5 py-2 cursor-pointer'
                                    >Low in stock items</div>
                                    <div
                                        onClick={() => {
                                            setShowExpiredItems(true)
                                            setShowLowInStockItems(false)
                                            setShowOutOfStockItems(false)
                                            setShowAllItems(false)
                                        }}  
                                        className=' px-2.5 py-2 cursor-pointer'
                                    >Expired items</div>
                                </div>
                            )}
                        </div>
                    </div>
                    {   showAllItems
                        ? <AllItems/> : showOutOfStockItems 
                        ? <OutOfStockProducts/> : showLowInStockItems
                        ? <LowInStockProducts/> : showExpiredItems
                        ? <ExpiredProducts/> : (productName != "" )
                        ? <ProductsFiltered items={filteredProducts} /> : <AllItems/>
                    }
                </div> 
            </>
            )
        }
        
    </div>
  )
}

export default Items
