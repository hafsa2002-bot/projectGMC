import { CircleDollarSign, ClipboardList, Layers, Newspaper, PackageCheck, ReceiptText } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom';
import AllOrders from './AllOrders';
import axios from 'axios';

function Order() {
    const [totalOrders, setTotalOrders] = useState(0)
    const [numberOfOrders, setNumberOfOrders] = useState(0)
    const [stockInfo, setStockInfo] = useState({})

    const getStockInfo = () => {
        axios.get("http://localhost:3003/admin/stock")
            .then(response => setStockInfo(response.data))
            .catch(error => console.log("Error: ", error))
    }
    const calculateAllOrders = () => {
        axios.get("http://localhost:3003/orders/getOnlineOrders")
            .then(response => setTotalOrders(response.data.length))
            .catch(error => console.log("error: ", error))
    }

    useEffect(() => {
        getStockInfo()
    }, [stockInfo])
  return (
    <div>
        <div className=' bg-gray-100 border-b border-gray-400 flex justify-between items-center my-5 '>
            <div className='flex  gap-5 text-2xl '>
                <Link
                className= 'text-blue-600 border-b-3 border-blue-700 pb-5 font-semibold px-3 ' 
                to="/admin/orders">
                <p>Orders</p>
                </Link>
            </div>
            <div className='flex  gap-4 pb-3'>
                <Link to="/admin/add-order" className='text-white bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                    <p>Add Order</p>
                </Link>
            </div>
        </div>
        <div className='flex justify-between '>
            {/* Total order */}
            <div className="lg:w-1/5 w-5/12 py-5 bg-white border border-gray-300 flex gap-3 justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600 rounded-lg flex justify-center items-center w-12 h-12'>
                    <ClipboardList className='text-white' size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600'>Total order</p>
                    <p className='font-semibold text-2xl'>{numberOfOrders}</p>
                </div>
            </div>
            {/* Order on process */}
            <div  className="lg:w-1/5 w-5/12 py-5 bg-white border border-gray-300 flex gap-3  justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600 rounded-lg flex justify-center items-center  w-12 h-12'>
                    <Layers  className='text-white'  size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600'>Order on process</p>
                    <p className='font-semibold  text-2xl'>120</p>
                </div>
            </div>
            {/* Order done */}
            <div className="lg:w-1/5 w-5/12 py-5 bg-white border border-gray-300 flex gap-3 justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600  rounded-lg flex justify-center items-center w-12 h-12'>
                    <PackageCheck  className='text-white'  size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600'>Order done</p>
                    <p className='font-semibold  text-2xl'>120</p>
                </div>
            </div>
            {/* Total Income */}
            <div className="lg:w-1/5 w-5/12 py-5 bg-white border border-gray-300 flex gap-3  justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600 rounded-lg flex justify-center items-center  w-12 h-12'>
                    <CircleDollarSign  className='text-white'  size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600'>Total Income</p>
                    <div className="font-semibold text-2xl flex gap-1">
                        {stockInfo.totalIncome ? stockInfo.totalIncome : 'N/A'} MAD
                    </div>                
                </div>
            </div>
        </div>
        <div className=" bg-white pt-3 border border-gray-300 mt-8   shadow-md sm:rounded-lg mb-20">
            <div className='flex gap-3 mx-6 mt-3 mb-7 border-b border-gray-300'>
                <NavLink 
                    to="/admin/orders"
                    className={({isActive}) => isActive && window.location.pathname === "/admin/orders"  ?  'text-blue-600 border-b-2 text-sm  pb-1 border-blue-600 flex items-center justify-center gap-3 px-3': ' text-sm px-3 pb-1 text-gray-600  flex items-center justify-center gap-3'} >
                    <p className='font-semibold '>All</p>
                    <NavLink to="/admin/orders" className={({isActive}) => isActive && window.location.pathname === "/admin/orders" ? 'bg-blue-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' : 'bg-gray-100 px-2 py-0.5 flex justify-center items-center rounded-2xl font-semibold' }>
                        {numberOfOrders}
                    </NavLink>
                </NavLink>
            </div>
            <AllOrders setNumberOfOrders = {setNumberOfOrders}/>
            {/* <Outlet/> */}
        </div> 
    </div>
  )
}

export default Order
