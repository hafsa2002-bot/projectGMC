import { ArrowRight, Boxes, Calendar, Clock, Hourglass, Package2, PackageCheck, PackageX, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../../CartContext'

function DashboardOrders() {
    const [orders, setOrders] = useState([])
    const [number, setNumber] = useState(0)
    const {currency} = useCart()
    
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

    useEffect(() => {
        fetchData()
        calculateNumber()
        // console.log("orders: ", orders)
    }, [orders])

    return (
    <div className='bg-white border border-gray-300 rounded-lg '>
            <div className='flex justify-between items-center  px-2 py-2 '>
                <p className='text-xl font-semibold text-gray-700 px-2'>Recent Orders</p>
                <Link to="/admin/orders" className='text-blue-600 font-semibold flex  items-center gap-3 py-2'>
                    <p>View All</p>
                    <ArrowRight size={20} />
                </Link>
            </div>
            <div className='pl-6 pr-2 mt-3'>
                <div className='flex text-gray-500 text-lg font-semibold border-b border-gray-400 pb-2'>
                    <p className='w-2/5'>Orders</p>
                    <p className='w-1/5'>Status</p>
                    <p className='w-1/5'>Date</p>
                    <p className='w-24'>Amount</p>
                </div>
                <div className='flex flex-col gap-4 mt-4'>
                {
                    (orders && orders.length > 0)
                    ?(
                        // [...orders].reverse()
                        [...orders].reverse().slice(0, number ).map((order, index) => (
                            <div className='flex border-b border-gray-300 pb-3 font-semibold '  key={index}>
                                <div className='w-2/5 '>#{order._id}</div>
                                <div className='w-1/5'> 
                                    {order.status && (
                                        order.status === 'pending' ? (
                                            <div className='bg-blue-50 text-blue-500 flex items-center gap-1 py-1 font-semibold text-sm w-20 text-center  rounded-full pl-2'>
                                                <div className='bg-blue-500 w-1.5 h-1.5 rounded-full'></div>
                                                Pending
                                            </div>
                                        ) : order.status === 'packed' ? (
                                            <div className='bg-purple-50 text-purple-500 flex items-center gap-1 text-sm py-1 font-semibold w-16 text-center rounded-full pl-2'>
                                                <div className='bg-purple-500 w-1.5 h-1.5 rounded-full'></div>
                                                Packed
                                            </div>
                                        ) : order.status === 'done' ? (
                                            <div className="bg-green-50 text-green-500  flex items-center gap-1 text-sm py-1 font-semibold w-16 text-center rounded-full pl-2">
                                                <div className='bg-green-500 w-1.5 h-1.5 rounded-full'></div>
                                                Done
                                            </div>
                                        ) : order.status === 'canceled' ? (
                                            <div className="bg-red-50 text-red-500 flex items-center gap-1 text-sm py-1 font-semibold w-16 text-center rounded-full pl-2">
                                                <div className='bg-red-500 w-1.5 h-1.5 rrounded-full'></div>
                                                Canceled
                                            </div>
                                        ) : null
                                    )} 
                                </div>
                                <div className='w-1/5'>{order.createdAt.slice(0, 10)}</div>
                                <div className='w-24 truncate '> {order.totalAmount} {currency} </div>
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
        </div>
  )
}

export default DashboardOrders
