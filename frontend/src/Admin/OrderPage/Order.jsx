import { CircleDollarSign, ClipboardList, Layers, Newspaper, PackageCheck, ReceiptText, Search } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom';
import AllOrders from './AllOrders';
import axios from 'axios';
import OrdersOnProcess from './OrdersOnProcess';
import OrdersDone from './OrdersDone';
import OrdersUnpaid from './OrdersUnpaid';

function Order() {
    const [totalOrders, setTotalOrders] = useState(0)
    const [numberOfOrders, setNumberOfOrders] = useState(0)
    const [numberOfOrdersDone, setNumberOfOrdersDone] = useState(0)
    const [stockInfo, setStockInfo] = useState({})
    const [ordersOnProcessLength, setOrdersOnProcessLength] = useState(0)
    const [ordersUnpaidLength, setOrdersUnpaidLength] = useState(0)
    const [orderType,setOrderType] = useState("all")

    const getStockInfo = () => {
        axios.get("http://localhost:3003/admin/stock")
            .then(response => setStockInfo(response.data))
            .catch(error => console.log("Error: ", error))
    }

    useEffect(() => {
        getStockInfo()
    }, [stockInfo])
  return (
    <div className=''>
        <div className=' bg-gray-100 border-b border-gray-400 flex justify-between items-center my-5 '>
            <div className='flex  gap-5 text-3xl '>
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
        <div className='flex justify-between gap-10'>
            {/* Total order */}
            <div className="lg:w-1/4 w-5/12 py-5 bg-white border border-gray-300 flex gap-3 justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600 rounded-lg flex justify-center items-center w-12 h-12'>
                    <ClipboardList className='text-white' size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600 text-lg'>Total order</p>
                    <p className='font-semibold text-xl'>{numberOfOrders}</p>
                </div>
            </div>
            {/* Order on process */}
            <div  className="lg:w-1/4 w-5/12 py-5 bg-white border border-gray-300 flex gap-3  justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600 rounded-lg flex justify-center items-center  w-12 h-12'>
                    <Layers  className='text-white'  size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600 text-lg'>Order on process</p>
                    <p className='font-semibold  text-xl'>{ordersOnProcessLength}</p>
                </div>
            </div>
            {/* Order done */}
            <div className="lg:w-1/4 w-5/12 py-5 bg-white border border-gray-300 flex gap-3 justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600  rounded-lg flex justify-center items-center w-12 h-12'>
                    <PackageCheck  className='text-white'  size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600 text-lg'>Order done</p>
                    <p className='font-semibold  text-xl'>{numberOfOrdersDone}</p>
                </div>
            </div>
            {/* Total Income */}
            <div className="lg:w-1/4 w-5/12 py-5 bg-white border border-gray-300 flex gap-3  justify-between items-center rounded-lg px-4">
                <div className='bg-blue-600 rounded-lg flex justify-center items-center  w-12 h-12'>
                    <CircleDollarSign  className='text-white'  size={27} />
                </div>
                <div className='text-end'>
                    <p className='text-gray-600 text-lg'>Total Income</p>
                    <div className="font-semibold text-xl flex gap-1">
                        {stockInfo.totalIncome ? stockInfo.totalIncome : 'N/A'} DH
                    </div>                
                </div>
            </div>
        </div>
        <div className=" bg-white pt-3 border border-gray-300 mt-8   shadow-md sm:rounded-lg mb-20">
            <div className='flex gap-3 mx-6 mt-3 mb-7 border-b border-gray-300'>
                {/* all orders button */}
                <div onClick={() => setOrderType("all")} className={`flex cursor-pointer  justify-center gap-3 pb-1 text-sm items-center ${orderType === "all" ? 'text-blue-600 border-b-2 border-blue-600 px-3' : 'px-3 text-gray-600'}`} >
                    <p className='font-semibold '>All</p>
                    <div className={`flex justify-center items-center px-2 py-0.5  rounded-2xl font-semibold ${orderType == "all" ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {numberOfOrders}
                    </div>
                </div>
                {/* orders on Process button */}
                <div onClick={() => setOrderType("on-process")} className={`flex cursor-pointer  justify-center gap-3 pb-1 text-sm items-center ${orderType === "on-process" ? 'text-blue-600 border-b-2 border-blue-600 px-3' : 'px-3 text-gray-600'}`} >
                    <p className='font-semibold '>Orders On Process</p>
                    <div className={`flex justify-center items-center px-2 py-0.5  rounded-2xl font-semibold ${orderType == "on-process" ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {ordersOnProcessLength}
                    </div>
                </div>
                {/* orders Done button */}
                <div onClick={() => setOrderType("done")} className={`flex cursor-pointer  justify-center gap-3 pb-1 text-sm items-center ${orderType === "done" ? 'text-blue-600 border-b-2 border-blue-600 px-3' : 'px-3 text-gray-600'}`} >
                    <p className='font-semibold '>Orders Done</p>
                    <div className={`flex justify-center items-center px-2 py-0.5  rounded-2xl font-semibold ${orderType == "done" ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {numberOfOrdersDone}
                    </div>
                </div>
                {/* orders Unpaid button */}
                <div onClick={() => setOrderType("unpaid")} className={`flex cursor-pointer  justify-center gap-3 pb-1 text-sm items-center ${orderType === "unpaid" ? 'text-blue-600 border-b-2 border-blue-600 px-3' : 'px-3 text-gray-600'}`} >
                    <p className='font-semibold '>Orders Unpaid</p>
                    <div className={`flex justify-center items-center px-2 py-0.5  rounded-2xl font-semibold ${orderType == "unpaid" ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {ordersUnpaidLength}
                    </div>
                </div>
            </div>
            

            {/* {
                orderType === "all" ? <AllOrders setNumberOfOrders = {setNumberOfOrders}/> 
                : orderType === "on-process" ? <OrdersOnProcess setOrdersOnProcessLength={setOrdersOnProcessLength} />
                : orderType === "done" ? <OrdersDone setNumberOfOrdersDone={setNumberOfOrdersDone} />
                : orderType === "unpaid" ? <OrdersUnpaid setOrdersUnpaidLength={setOrdersUnpaidLength} />
                : <AllOrders setNumberOfOrders = {setNumberOfOrders}/> 
            } */}

            {/* Render all order components at once to allow them to fetch data  */}
            <div className="">
                <div className={`${orderType === "all" ? 'block' : 'hidden'}`}>
                    <AllOrders setNumberOfOrders={setNumberOfOrders} />
                </div>
                <div className={`${orderType === "on-process" ? 'block' : 'hidden'}`}>
                    <OrdersOnProcess setOrdersOnProcessLength={setOrdersOnProcessLength} />
                </div>
                <div className={`${orderType === "done" ? 'block' : 'hidden'}`}>
                    <OrdersDone setNumberOfOrdersDone={setNumberOfOrdersDone} />
                </div>
                <div className={`${orderType === "unpaid" ? 'block' : 'hidden'}`}>
                    <OrdersUnpaid setOrdersUnpaidLength={setOrdersUnpaidLength} />
                </div>
            </div>
            
            {/* <Outlet/> */}
        </div> 
    </div>
  )
}

export default Order
