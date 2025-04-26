import { ArrowRight, Boxes, Calendar, Clock, Hourglass, Package2, PackageCheck, PackageX, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function RecentOrders() {
    const [orders, setOrders] = useState([])
    const [number, setNumber] = useState(0)
    
    const fetchData = async() => {
        axios.get("http://localhost:3003/orders/getOnlineOrders")
            .then(response => setOrders(response.data))
            .catch(error => console.log("Error fetching orders: ", error))
    }
    // in case the length is less then four
    const calculateNumber = () => {
        if(orders.length >= 1) setNumber(1)
        if(orders.length >= 2) setNumber(2)
        if(orders.length >= 3) setNumber(3)
        if(orders.length >= 4) setNumber(4)
    }

    const updateOrderStatus = async(newStatus, orderId) => {
        try{
            const response = await axios.patch(`http://localhost:3003/orders/update-status/${orderId}`, 
                {OrderStatus: newStatus},
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }}
            )
            console.log("Order status updated: ", response.data)
        }catch(error){
            console.log("Error: ", error)
        }
    }
    
    useEffect(() => {
        fetchData()
        calculateNumber()
        // console.log("orders: ", orders)
    }, [])
    
    
  return (
    <div className='bg-white border border-gray-300  rounded-lg pb-3'>
        <div className='flex justify-between items-center  px-2 py-2 '>
            <p className='text-2xl font-semibold text-gray-900 px-4'>Recent Orders</p>
            <Link to="/admin/orders" className='text-blue-600 font-semibold flex  items-center gap-3 py-2'>
                <p>View All</p>
                <ArrowRight size={20} />
            </Link>
        </div>
        <div className='lg:px-6 px-3'>
            {
                (orders && orders.length > 0)
                ?(
                    // [...orders].reverse()
                    [...orders].reverse().slice(0, number ).map((order, index) => (
                        <div className='border border-gray-300 rounded-lg p-2 mt-2' key={index}>
                            <div className='lg:flex justify-between  items-center'>
                                <div className='flex lg:hidden justify-end mb-1'>
                                    <Link to={`/admin/view_order/${order._id}`} className='bg-blue-500 lg:hidden px-4 text-sm py-1 font-semibold rounded-full text-white flex items-center gap-1'>
                                        View<ArrowRight size={16} />
                                    </Link>
                                </div>
                                <div className='lg:flex items-center gap-2 '>
                                    <p className='font-semibold text-gray-700'> Order #{order._id} </p>
                                    <div className="flex items-center gap-3 text-gray-500 lg:ml-2">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} className="text-gray-500" />
                                            <span>{order.createdAt.slice(0, 10)}</span> {/* Extracting Date */}
                                        </div>
                                        <div className="w-[1px] h-4 bg-gray-400"></div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} className="text-gray-500" />
                                            <span>{order.createdAt.slice(11, 16)}</span> {/* Extracting Time */}
                                        </div>
                                    </div>
                                    {/* <p className='text-gray-600 font-poppins mt-1.5'> {order.createdAt.slice(0, 10)} </p> */}
                                </div>
                                <div className='flex gap-3 lg:m-0 my-1.5'>
                                    <div> 
                                        {order.status && (
                                            order.status === 'pending' ? (
                                                <div className='bg-blue-50 text-blue-500 flex items-center gap-1 py-1 font-semibold text-sm  text-center  rounded-full px-2'>
                                                    <Hourglass  size={17} />
                                                    Pending
                                                </div>
                                            ) : order.status === 'packed' ? (
                                                <div className='bg-purple-50 text-purple-500 flex items-center gap-1 text-sm py-1 font-semibold w-20 text-center rounded-full px-2'>
                                                    <Package2  size={17} />
                                                    Packed
                                                </div>
                                            ) : order.status === 'done' ? (
                                                <div className="bg-green-50 text-green-500  flex items-center gap-1 text-sm py-1 font-semibold w-20 text-center rounded-full px-2">
                                                    <PackageCheck  size={19} />
                                                    Done
                                                </div>
                                            ) : order.status === 'canceled' ? (
                                                <div className="bg-red-50 text-red-500 flex items-center gap-1 text-sm py-1 font-semibold  text-center rounded-full px-2">
                                                    <PackageX  size={17} />
                                                    Canceled
                                                </div>
                                            ) : null
                                        )} 
                                    </div>
                                    <Link to={`/admin/view_order/${order._id}`} className='bg-blue-500 hidden px-4 text-sm py-1 font-semibold rounded-full text-white lg:flex items-center gap-1'>View<ArrowRight size={16} /></Link>
                                </div>
                            </div>
                            <div className='flex justify-between items-center mt-4'>
                                <div className='flex gap-3'>
                                    {/* get the first product in the order if exists */}
                                    {order.products && order.products.length > 0 && (
                                        <div className='border border-gray-300 rounded-lg flex items-center gap-1 max-w-44 px-3'>
                                            <div className='font-semibold'> {order.products[0].quantity}</div>
                                            <div className='text-gray-600 truncate  whitespace-nowrap  overflow-hidden'> {order.products[0].name ? order.products[0].name : "Unknown Product" }</div>
                                        </div>
                                    )}
                                    {/* get the second product in the order if exists */}
                                    {order.products && order.products.length > 1 && (
                                        <>
                                            <div className='border border-gray-300 rounded-lg  lg:flex hidden items-center gap-1 max-w-44 px-3 '>
                                                <div className='font-semibold'> {order.products[1].quantity}</div>
                                                <div className='text-gray-600 truncate whitespace-nowrap overflow-hidden'> {order.products[1].name ? order.products[1].name : "Unknown Product" }</div>
                                            </div>
                                            <div className='border border-gray-300 rounded-lg  flex lg:hidden items-center gap-1 max-w-44 px-3 '>
                                                <div className='font-semibold'> ...</div>
                                            </div>
                                        </>
                                    )}
                                    {/* get the third product in the order if exists */}
                                    {order.products && order.products.length > 2 && (
                                        <div className='border border-gray-300 rounded-lg lg:flex hidden items-center gap-1 max-w-44 px-3 '>
                                            <div className='font-semibold'> {order.products[2].quantity}</div>
                                            <div className='text-gray-600 truncate  whitespace-nowrap  overflow-hidden'> {order.products[2].name ? order.products[2].name : "Unknown Product" }</div>
                                        </div>
                                    )}
                                    {order.products && order.products.length > 3 && (
                                        <div className='border border-gray-300 rounded-lg  lg:flex hidden items-center gap-1 max-w-44 px-3 '>
                                            <div className='font-semibold'> {order.products[3].quantity}</div>
                                            <div className='text-gray-600 truncate  whitespace-nowrap  overflow-hidden'> {order.products[3].name ? order.products[3].name : "Unknown Product" }</div>
                                        </div>
                                    )}
                                    {order.products && order.products.length > 4 && (
                                        <div className='border border-gray-300 rounded-lg  lg:flex hidden items-center gap-1 max-w-44 px-3 '>
                                            <div className='font-semibold'> {order.products[4].quantity}</div>
                                            <div className='text-gray-600 truncate  whitespace-nowrap  overflow-hidden'> {order.products[4].name ? order.products[4].name : "Unknown Product" }</div>
                                        </div>
                                    )}
                                    {order.products && order.products.length > 4 && (
                                        <div className='border border-gray-300 rounded-lg  lg:flex hidden items-center gap-1 max-w-44 px-3 '>
                                            <div className='font-semibold'> ...</div>
                                        </div>
                                    )}
                                </div>
                                <div 
                                    className='text-red-500 underline font-semibold cursor-pointer pr-2'
                                    onClick={() => updateOrderStatus("canceled", order._id)}
                                >
                                    Cancel
                                </div>
                            </div>
                        </div>
                    ))
                ):(
                    <div className='text-gray-500 flex flex-col gap-2 justify-center items-center py-7'>
                        <ShoppingCart size={35} />
                        <p className="text-gray-500 text-xl font-semibold">No Orders available.</p>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default RecentOrders
