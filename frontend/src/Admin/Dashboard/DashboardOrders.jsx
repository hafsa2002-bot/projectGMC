import { ArrowRight, Boxes, Calendar, Clock, Hourglass, Package2, PackageCheck, PackageX, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function DashboardOrders() {
    const [orders, setOrders] = useState([])
    const [number, setNumber] = useState(0)
    
    const fetchData = async() => {
        axios.get("http://localhost:3003/orders/getOnlineOrders")
            .then(response => setOrders(response.data))
            .catch(error => console.log("Error fetching orders: ", error))
    }
    useEffect(() => {
            fetchData()
    }, [orders])
  return (
    <div className='bg-white border border-gray-300 rounded-lg pb-3'>
        <div className='flex justify-between items-center  px-2 py-2 '>
            <p className='text-xl font-semibold text-gray-700 px-2'>Recent Orders</p>
            <Link to="/admin/orders" className='text-blue-600 font-semibold flex  items-center gap-3 py-2'>
                <p>View All</p>
                <ArrowRight size={20} />
            </Link>
        </div>
    </div>
  )
}

export default DashboardOrders
