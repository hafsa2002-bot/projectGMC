import React, {useState, useEffect} from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import axios from 'axios'
import { ArrowBigUp, ChevronDown, ChevronUp, EllipsisVertical, Eye, Image, PackageX, PenLine, Search, SlidersHorizontal, Trash2, TrendingDown, TriangleAlert } from 'lucide-react'
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
import FilterButton from './FilterButton'
import SortButton from './SortButton'

function Items() {
    const [items, setItems] = useState([])
    const [stock, setStock] = useState({})
    const [loading, setLoading] = useState(true)
    const [productName, setProductName] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedOption, setSelectedOption] = useState("all-items")
    const apiUrl = import.meta.env.VITE_API_URL;
    
    
    const getItems = () => {
        axios.get(`${apiUrl}/admin/items/list`)
        .then(response => setItems(response.data))
        .catch(error => console.log("Error: ", error))
    }
    
    const stockInfo = () => {
        axios.get(`${apiUrl}/admin/stock`)
        .then(response => {
            setStock(response.data)
            setLoading(false)
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
    /*
    useEffect(() => {
        getItems()
        stockInfo()
    }, [stock, items])
    */
    useEffect(() => {
        getItems()
        stockInfo()
    }, [stock])
    
    useEffect(() => {
        if (productName !== "") {
            filterProducts(productName)
        } else {
            setFilteredProducts(items)
        }
    // }, [productName, items])
    }, [])

  return (
    <div className='mb-32'>
        {
            loading 
            ?(
                <SpinnerBlue/>
            ):(
            <>
                <div className='lg:flex gap-10 mt-5'>
                    <Link to="/admin/items/out-of-stock" className='bg-white text-lg lg:w-1/2 w-11/12 lg:m-0 m-auto flex gap-5 items-center lg:h-24 h-18 rounded-lg px-5 '>
                        <div className='bg-blue-50 w-14 h-14 rounded-full flex justify-center items-center'>
                            <PackageX size={28} className='text-blue-600'/>
                        </div>
                        <div className=''>
                            <p className='text-gray-600'>Out of stock</p>
                            <p className='font-semibold'>{stock ? (<span>{stock.totalOutOfStock}</span>): (<span>N/A</span>)}</p>
                        </div>
                    </Link>
                    <Link to="/admin/items/low-in-stock" className='bg-white text-lg lg:w-1/2 w-11/12 lg:m-0 m-auto mt-3 flex gap-5 items-center lg:h-24 h-18 rounded-lg px-5'>
                        <div className='bg-orange-50 w-14 h-14 rounded-full flex justify-center items-center '>
                            <TrendingDown size={28} className='text-orange-600'/>
                        </div>
                        <div>
                            <p className='text-gray-600'>Low in stock</p>
                            <p className='font-semibold'>{stock.totalLowInStock}</p>
                        </div>
                    </Link>
                    <Link to="/admin/items/expired-items" className='bg-white text-lg lg:w-1/2 w-11/12 lg:m-0 m-auto mt-3 flex gap-5 items-center lg:h-24 h-18 rounded-lg px-5'>
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
                                {
                                    selectedOption ===  "all-items" ? "All" 
                                    : (selectedOption === "out-of-stock") ? "Out of stock" 
                                    : (selectedOption === "low-in-stock") ? "Low in stock" 
                                    : (selectedOption === "expired") ? "expired" 
                                    : selectedOption ? "All" 
                                    : "All"
                                }
                            </p>
                            <NavLink to="/admin/items" className={({isActive}) => isActive && window.location.pathname === "/admin/items" ? 'bg-blue-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' : 'bg-gray-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' }>
                                {selectedOption ===  "all-items" 
                                ? items.length : (selectedOption === "out-of-stock")
                                ? stock.totalOutOfStock : (selectedOption === "low-in-stock")
                                ? stock.totalLowInStock : (selectedOption === "expired")
                                ? stock.totalExpiredProducts : productName
                                ? filteredProducts.length : items.length }
                            </NavLink>
                        </NavLink>
                    </div>
                    <div className='lg:flex gap-3 justify-between px-5'>
                        {/* search products */}
                        <div className='border border-gray-400 bg-gray-100 flex items-center px-3 gap-3  lg:w-8/12 text-gray-400 outline-blue-500  rounded-lg'>
                            <Search size={20} />
                            <input
                                onChange={(e) => {
                                    setProductName(e.target.value)
                                    if(e.target.value !== "") filterProducts(e.target.value)
                                    else setFilteredProducts(items)
                                }}
                                value={productName} 
                                autoComplete='off'
                                type="search" name="producName" id="productName"
                                placeholder='Search to find items'
                                className="outline-none text-black placeholder:text-gray-400 w-11/12  py-2.5" 
                            />
                        </div>
                        <div className='flex lg:w-4/12  justify-end gap-4 lg:mt-0 mt-5'>
                            {/* filter products : by out of stock, low in stock, expired, all of them */}
                            <div className='hidden lg:flex'><FilterButton setSelectedOption={setSelectedOption}/></div>
                            {/* sort items */}
                            <div className='hidden lg:flex'><SortButton setSelectedOption={setSelectedOption} /></div>
                            <div className='lg:hidden w-9/12'><SortButton setSelectedOption={setSelectedOption} /></div>
                            <div className='lg:hidden w-3/12'><FilterButton setSelectedOption={setSelectedOption}/></div>
                        </div>
                    </div>
                    { (productName !== "" ) 
                        ? <ProductsFiltered items={filteredProducts} setItems={setFilteredProducts} /> 
                        : (selectedOption === "all-items") ? <AllItems/> 
                        : (selectedOption === "out-of-stock") ? <OutOfStockProducts/> 
                        : (selectedOption === "low-in-stock") ? <LowInStockProducts/> 
                        : (selectedOption === "expired") ? <ExpiredProducts/> 
                        : (selectedOption === "low-to-high") ? <LowToHighProducts/> 
                        : (selectedOption === "high-to-low") ? <HightToLowProducts/> 
                        : (selectedOption === "best-selling") ? <BestSellingProducts/>  
                        : (selectedOption === "top-earning") ? <TopEarning/> 
                        : <AllItems/>
                    }
                </div> 
                <div
                    onClick={() => window.scrollTo(0,0)} 
                    className='fixed bottom-5 right-5 border  border-gray-500 cursor-pointer bg-white text-2xl font-semibold rounded-full w-12 h-12 shadow-xl text-gray-700 flex justify-center items-center'>
                    <ChevronUp  size={28}/>
                </div>
            </>
            )
        }
        
    </div>
  )
}

export default Items
