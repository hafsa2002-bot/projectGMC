import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { ChevronDown, EllipsisVertical, Eye, PenLine, Search, Trash2 } from 'lucide-react'
import SpinnerBlue from '../SpinnerBlue'
import {Link} from 'react-router-dom'
import SpinnerLoader from '../../SpinnerLoader'
import OrdersFiltered from './OrdersFiltered'
import OrderStatus from './OrderStatus'
import PaymentStatus from './PaymentStatus'
import DeleteOrder from './DeleteOrder'
import { jwtDecode } from 'jwt-decode'
import { useCart } from '../../CartContext'

function AllOrders({setNumberOfOrders}) {
    const [orders,setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [showOptions, setShowOptions] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [orderKey, setOrderKey] = useState("")
    const [filteredOrders, setFilteredOrders] = useState([])
    const token = localStorage.getItem("token");
    let userRole = null;
    const {currency} = useCart()
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }

    const fetchOrders = () => {
        axios.get("http://localhost:3003/orders/getOnlineOrders")
            .then(response => {
                setOrders(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log("error: ", error)
                setLoading(false)
            })
    }
    const filterOrders = (key) => {
        const result = orders?.filter(order => {
            const lastName = order.shipping?.lastName?.toLowerCase();
            const firstName = order.shipping?.firstName?.toLowerCase();
            const fullName = firstName + " " + lastName;
            const fullName2 = lastName + " " + firstName;

            const orderId = order._id;
            const totalAmount = order.totalAmount.toString()
            return (
                fullName.includes(key.toLowerCase()) || 
                fullName2.includes(key.toLowerCase()) || 
                orderId.includes(key) || 
                totalAmount.includes(key)
            )
        })
        setFilteredOrders(result)
        console.log("result : ", result)
    }

    
    useEffect(() => {
        fetchOrders()
        setNumberOfOrders(orders.length)
    }, [orders])

  return (
    <div>
        {loading
            ?(
                <SpinnerLoader/>
            ):(
                orders && orders.length > 0 
                ?(
                    <div>
                        {/* serach */}
                        <div className='border border-gray-400 ml-7 mb-5 bg-gray-50 flex m-auto items-center px-3 gap-3  w-11/12 text-gray-400 outline-blue-500  rounded-xl'>
                            <Search size={20} />
                            <input
                                onChange={(e) => {
                                    setOrderKey(e.target.value)
                                    if(e.target.value !== "") filterOrders(e.target.value)
                                    else setFilteredOrders(orders)
                                }}
                                value={orderKey} 
                                type="search" name="orderKey" id="orderKey"
                                placeholder='Search to find an order ID, Customer or Amount'
                                className="outline-none text-black placeholder:text-gray-400 w-11/12  py-2.5" 
                            />
                        </div>
                        {
                            orderKey !== "" 
                            ? <OrdersFiltered orders={filteredOrders}/>
                            : (
                                <table className=" w-full text-sm text-left rtl:text-right text-gray-500 mb-20">
                                    <thead className=" text-gray-700  bg-gray-50 ">
                                        <tr>
                                            <th scope="col" className="pl-4 py-3">
                                                ID Order
                                            </th>
                                            <th scope="col" className="pr-4 py-3">
                                                Date
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Customer
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Total
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Payment Status
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Items
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Order Status
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                    
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        orders
                                        ?(
                                            [...orders].reverse().map((order, index) => (
                                                <tr key={index} className=" bg-white border-b border-gray-200 ">
                                                    <td scope="row" className=" pl-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <Link to={`/admin/view_order/${order._id}`} className=' h-full py-7'>
                                                            #{order._id}
                                                        </Link>
                                                    </td>
                                                    <td className="pr-4 py-7">
                                                        {order.createdAt.slice(0, 10)}
                                                    </td>
                                                    <td className="px-4 py-4 ">
                                                        {order.shipping ? (
                                                            <div> {order.shipping.firstName && order.shipping.firstName} {order.shipping.lastName && order.shipping.lastName}</div>
                                                        ):(
                                                            <p>-</p>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-7 font-mono">
                                                        {order.totalAmount.toFixed(2)} <span className='text-black '> {currency} </span>
                                                    </td>
                                                    <td className="px-4 py-7 text-base ">
                                                        <PaymentStatus paymentStatus={order.paymentStatus} orderId={order._id} />
                                                    </td>
                                                    <td className="px-4 py-7 text-base ">
                                                        {order.products.reduce((totalQty, currentValue) => totalQty + currentValue.quantity, 0)} items
                                                    </td>
                                                    {/* Order status */}
                                                    <td className="px-4 py-7 text-base ">
                                                        <OrderStatus status={order.status} orderId={order._id} />
                                                    </td>
                                                    <td className="relative px-4 py-7">
                                                        {
                                                            userRole == "admin" 
                                                            ?(
                                                                <>
                                                                    <EllipsisVertical onClick={() => setShowOptions(index === showOptions ? null : index)} className='cursor-pointer' />
                                                                    {
                                                                        showOptions === index && (
                                                                            <div className=' z-30 absolute right-12 top-12 bg-white shadow-md border border-gray-200 rounded-lg text-black w-32'>
                                                                                {/* view order details  */}
                                                                                <Link to={`/admin/view_order/${order._id}`}  className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base flex items-center border-b border-gray-200'>
                                                                                    <div><Eye size={18} /></div>
                                                                                    <p>View</p>
                                                                                </Link>
                                                                                {/* update an order */}
                                                                                {/* <Link className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base flex items-center border-b border-gray-200'>
                                                                                    <div><PenLine  size={18} /></div>
                                                                                    <p>Update</p>
                                                                                </Link> */}
                                                                                {/* delete  an order */}
                                                                                <div onClick={() => setPopUp(true)} className='hover:bg-gray-100 cursor-pointer px-4 py-2.5 gap-3 text-base flex items-center text-red-600'>
                                                                                    <div><Trash2  size={18} /></div>
                                                                                    <p>Delete</p>
                                                                                </div>
                                                                                {/* a Component <PopUp/> to confirm the delete or cancel */}
                                                                                {popUp && <DeleteOrder setShowOptions ={setShowOptions} setPopUp={setPopUp} orderId={order._id} />}
                                                                            </div>
                                                                        )
                                                                    }
                                                                </>
                                                            ):(
                                                                <Link to={`/admin/view_order/${order._id}`} className='hover:text-black underline text-blue-500 '>
                                                                    View
                                                                </Link>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        ):(
                                            <SpinnerLoader/>
                                        )
                                    }
                                            
                                    </tbody>
                                </table>
                            )  
                        }
                    </div>
                ):(
                    <div className='flex flex-col gap-3  justify-center items-center py-14'>
                        <img src="/images/sticker.svg" className='w-32 ' alt="" />
                        <div className='flex flex-col items-center'>
                            <p className='text-xl font-semibold'>Your orders show up here</p>
                            <p className='text-gray-600'>Click the <span className='font-semibold'>Add Order</span> button below to add orders </p>
                        </div>
                        <Link to="/admin/add-order" className='text-white bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                            <p>Add Order</p>
                        </Link>
                    </div>
                )
            )
        }
    </div>
  )
}

export default AllOrders
