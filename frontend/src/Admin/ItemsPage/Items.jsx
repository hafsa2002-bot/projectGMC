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
import SortedProducts from './SortedProducts'

function Items() {
    const [items, setItems] = useState([])
    const [stock, setStock] = useState({})
    const [loading, setLoading] = useState(true)
    const [showFilter, setShowFilter] = useState(false)
    const [showSortOptions, setShowSortOptions] = useState(false)
    const [typeOfItems, setTypeOfItems] = useState("all-items")
    const [productName, setProductName] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [lowToHigh, setLowToHigh] = useState([])
    const [highToLow, setHighToLow] = useState([])
    const [bestSelling, setBestSelling] = useState([])
    const [topEarning, setTopEarning] = useState([])
    
    const getItems = () => {
        axios.get("http://localhost:3003/admin/items/list")
        .then(response => setItems(response.data))
        .catch(error => console.log("Error: ", error))
    }

    const getItemsFromLowToHigh = () => {
        axios.get("http://localhost:3003/admin/items/sort-from-low-to-high")
        .then(response => {
            setLowToHigh(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log("Error: ", error)
            setLoading(false)
        })
    }

    const getItemsFromHighToLow = () => {
        axios.get("http://localhost:3003/admin/items/sort-from-high-to-low")
        .then(response => {
            setHighToLow(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log("Error: ", error)
            setLoading(false)
        })
    }

    const getBestSellingItems = () => {
        axios.get("http://localhost:3003/admin/items/sort-best-selling")
        .then(response => {
            setBestSelling(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log("Error: ", error)
            setLoading(false)
        })
    }

    const getTopEarningProducts = () => {
        axios.get("http://localhost:3003/admin/items/sort-top-earning-products")
        .then(response => {
            setTopEarning(response.data)
            console.log("top earnings products: ", response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log("Error: ", error)
            setLoading(false)
        })
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
        getItemsFromLowToHigh()
        getItemsFromHighToLow()
        getBestSellingItems()
        getTopEarningProducts()
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
                                {typeOfItems ===  "all-items" 
                                ? items.length : (typeOfItems === "out-of-stock")
                                ? stock.totalOutOfStock : (typeOfItems === "low-in-stock")
                                ? stock.totalLowInStock : (typeOfItems === "expired")
                                ? stock.totalExpiredProducts : productName
                                ? filteredProducts.length : items.length}
                            </NavLink>
                        </NavLink>
                    </div>
                    <div className='flex gap-10 px-5'>
                        {/* search products */}
                        <div className='bg-gray-100 flex items-center px-3 gap-3  w-7/12 text-gray-400 outline-blue-500  rounded-lg'>
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
                            onClick={() => {
                                setShowFilter(!showFilter)
                                if(showSortOptions) setShowSortOptions(false)
                            }} 
                            className='relative cursor-pointer hover:bg-gray-500 hover:text-white bg-gray-100 flex items-center justify-center gap-2 w-2/12 rounded-lg px-3 py-2.5 text-gray-700'
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
                                <div className='w-40 h-42 font-semibold bg-white text-gray-800 absolute top-12 z-50 border border-gray-200 rounded-lg'>
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
                        <div 
                            onClick={() => {
                                setShowSortOptions(!showSortOptions)
                                if (showFilter) setShowFilter(false)
                            }} 
                            className='relative w-3/12 bg-gray-100 flex justify-center items-center gap-3 text-gray-400 rounded-lg cursor-pointer'
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
                                <div className='w-10/12 font-semibold bg-white text-gray-800 absolute top-12 z-50 border border-gray-200 rounded-lg'>
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
                        ? <AllItems/> : (typeOfItems === "out-of-stock")
                        ? <OutOfStockProducts/> : (typeOfItems === "low-in-stock")
                        ? <LowInStockProducts/> : (typeOfItems === "expired")
                        ? <ExpiredProducts/> : (productName != "" )
                        ? <ProductsFiltered items={filteredProducts} /> : (typeOfItems === "low-to-high")
                        ? <SortedProducts items={lowToHigh} loading={loading} /> : (typeOfItems === "high-to-low")
                        ? <SortedProducts items={highToLow} loading={loading} /> : (typeOfItems === "best-selling")
                        ? <SortedProducts items={bestSelling} loading={loading} />  : (typeOfItems === "top-earning")
                        ? <SortedProducts items={topEarning} loading={loading} /> : <AllItems/>
                    }
                </div> 
            </>
            )
        }
        
    </div>
  )
}

export default Items
