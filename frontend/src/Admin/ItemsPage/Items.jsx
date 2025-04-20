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
import HightToLowProducts from './HightToLowProducts'
import LowToHighProducts from './LowToHighProducts'
import BestSellingProducts from './BestSellingProducts'
import TopEarning from './TopEarning'

function Items() {
    const [items, setItems] = useState([])
    const [stock, setStock] = useState({})
    const [loading, setLoading] = useState(true)
    const [showFilter, setShowFilter] = useState(false)
    const [showSortOptions, setShowSortOptions] = useState(false)
    const [typeOfItems, setTypeOfItems] = useState("")
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
    }, [stock, items])
    
    useEffect(() => {
        if (productName !== "") {
            filterProducts(productName)
        } else {
            setFilteredProducts(items)
        }
    }, [productName, items])
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
                        <div className=''>
                            <p className='text-gray-600'>Out of stock</p>
                            <p className='font-semibold'>{stock ? (<span>{stock.totalOutOfStock}</span>): (<span>N/A</span>)}</p>
                        </div>
                    </Link>
                    <Link to="/admin/items/low-in-stock" className='bg-white text-lg w-1/2 flex gap-5 items-center h-24 rounded-lg px-5'>
                        <div className='bg-orange-50 w-14 h-14 rounded-full flex justify-center items-center '>
                            <TrendingDown size={28} className='text-orange-600'/>
                        </div>
                        <div>
                            <p className='text-gray-600'>Low in stock</p>
                            <p className='font-semibold'>{stock.totalLowInStock}</p>
                        </div>
                    </Link>
                    <Link to="/admin/items/expired-items" className='bg-white text-lg w-1/2 flex gap-5 items-center h-24 rounded-lg px-5'>
                        <div className='bg-red-50 w-14 h-14 rounded-full flex justify-center items-center '>
                            <TriangleAlert color='rgb(254, 242, 242)'  fill="rgb(222, 13, 7)" size={30} />
                        </div>
                        <div>
                            <p className='text-gray-600'>Expired Items</p>
                            <p className='font-semibold'>{stock.totalExpiredProducts}</p>
                        </div>
                    </Link>
                </div>
                <div className=" bg-white pt-3 border border-gray-300 mt-8   shadow-md sm:rounded-lg">
                    <div className='flex gap-3 mx-6 mt-3 mb-7 border-b border-gray-300'>
                        <NavLink 
                            to="/admin/items"
                            className={({isActive}) => isActive && window.location.pathname === "/admin/items"  ?  'text-blue-600 border-b-2 text-sm  pb-1 border-blue-600 flex items-center justify-center gap-3 px-3': ' text-sm px-3 pb-1 text-gray-600  flex items-center justify-center gap-3'} >
                            <p className='font-semibold '>
                                {/* All */}
                                {typeOfItems ===  "all-items" 
                                ? "All" : (typeOfItems === "out-of-stock")
                                ? "Out of stock" : (typeOfItems === "low-in-stock")
                                ? "Low in stock" : (typeOfItems === "expired")
                                ? "expired" : productName 
                                ? "all" : "all"}
                            </p>
                            <NavLink to="/admin/items" className={({isActive}) => isActive && window.location.pathname === "/admin/items" ? 'bg-blue-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' : 'bg-gray-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' }>
                                {typeOfItems ===  "all-items" 
                                ? items.length : (typeOfItems === "out-of-stock")
                                ? stock.totalOutOfStock : (typeOfItems === "low-in-stock")
                                ? stock.totalLowInStock : (typeOfItems === "expired")
                                ? stock.totalExpiredProducts : productName
                                ?filteredProducts.length : items.length }
                            </NavLink>
                        </NavLink>
                    </div>
                    <div className='flex gap-10 px-5'>
                        {/* search products */}
                        <div className='border border-gray-400 bg-gray-100 flex items-center px-3 gap-3  w-7/12 text-gray-400 outline-blue-500  rounded-lg'>
                            <Search size={20} />
                            <input
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                    if(e.target.value !== "") filterProducts(e.target.value)
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
                            onClick={() => {
                                setShowFilter(!showFilter)
                                if(showSortOptions) setShowSortOptions(false)
                            }} 
                            className='border border-gray-400 relative cursor-pointer bg-gray-100 flex items-center justify-center gap-2 w-2/12 rounded-lg px-3 py-2.5 text-gray-700'
                        >
                            <SlidersHorizontal size={20} />
                            <p>
                                {(typeOfItems === "all-items")
                                ? "All items" : (typeOfItems === "out-of-stock")
                                ? "Out Of Stock" : (typeOfItems === "low-in-stock")
                                ? "Low in stock" : (typeOfItems === "expired")
                                ? "Expired items" : "Filter"}
                            </p>
                            {showFilter && (
                                <div className='w-full font-semibold bg-white text-gray-800 absolute top-12 z-10 shadow-xl border border-gray-200 rounded-lg'>
                                    <div 
                                        onClick={() => setTypeOfItems("all-items")}
                                        className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                                    >All Items</div>
                                    <div 
                                        onClick={() => setTypeOfItems("out-of-stock")}
                                        className='border-b hover:bg-gray-100 border-gray-300 px-2.5 py-2 cursor-pointer'
                                    >Out of stock items</div>
                                    <div
                                        onClick={() => setTypeOfItems("low-in-stock")}
                                        className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                                    >Low in stock items</div>
                                    <div
                                        onClick={() => setTypeOfItems("expired")}
                                        className='hover:bg-gray-100 px-2.5 py-2 cursor-pointer'
                                    >Expired items</div>
                                </div>
                            )}
                        </div>
                        {/* sort items */}
                        <div 
                            onClick={() => {
                                setShowSortOptions(!showSortOptions)
                                if (showFilter) setShowFilter(false)
                            }} 
                            className='border border-gray-400 relative w-3/12 bg-gray-100 flex justify-center items-center gap-3 text-gray-500 rounded-lg cursor-pointer'
                        >
                            <div>Sort by 
                                <span className='font-semibold text-gray-700 pl-2'>
                                    {(typeOfItems === "all-items")
                                    ? "Most recent" : (typeOfItems === "low-to-high")
                                    ? "Price: Low to High" : (typeOfItems === "high-to-low")
                                    ? "Price: High to Low" : (typeOfItems === "best-selling")
                                    ? "Best Selling" : (typeOfItems === "top-earning")
                                    ? "Top Earning" : "Most recent"}
                                </span>
                            </div>
                            <ChevronDown className='text-gray-700'/>
                            {showSortOptions && (
                                <div className='w-full font-semibold bg-white text-gray-800 absolute top-12 z-10 border border-gray-200 rounded-lg shadow-xl'>
                                    <div 
                                        onClick={() => setTypeOfItems("all-items")}
                                        className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                                    >Most Recent</div>
                                    <div 
                                        onClick={() => setTypeOfItems("low-to-high")}
                                        className='border-b hover:bg-gray-100 border-gray-300 px-2.5 py-2 cursor-pointer'
                                    >Price: (Low to High)</div>
                                    <div
                                        onClick={() => setTypeOfItems("high-to-low")}
                                        className='border-b hover:bg-gray-100 border-gray-300  px-2.5 py-2 cursor-pointer'
                                    >Price: (High to Low)</div>
                                    <div
                                        onClick={() => setTypeOfItems("best-selling")}
                                        className='hover:bg-gray-100 border-b border-gray-300 px-2.5 py-2 cursor-pointer'
                                    >Best selling</div>
                                    <div
                                        onClick={() => setTypeOfItems("top-earning")}
                                        className='hover:bg-gray-100 px-2.5 py-2 cursor-pointer'
                                    >Top earning products</div>
                                </div>
                            )}
                        </div>
                    </div>
                    {   (typeOfItems === "all-items")
                        ? <AllItems/> : (productName !== "" )
                        ? <ProductsFiltered items={filteredProducts} /> : (typeOfItems === "out-of-stock")
                        ? <OutOfStockProducts/> : (typeOfItems === "low-in-stock")
                        ? <LowInStockProducts/> : (typeOfItems === "expired")
                        ? <ExpiredProducts/> : (typeOfItems === "low-to-high")
                        ? <LowToHighProducts/> : (typeOfItems === "high-to-low")
                        ? <HightToLowProducts/> : (typeOfItems === "best-selling")
                        ? <BestSellingProducts/>  : (typeOfItems === "top-earning")
                        ? <TopEarning/> : <AllItems/>
                    }
                </div> 
            </>
            )
        }
        
    </div>
  )
}

export default Items
