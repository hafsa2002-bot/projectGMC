import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { EllipsisVertical, Eye, PenLine, Trash2 } from 'lucide-react'
import SpinnerBlue from '../SpinnerBlue'
import {Link} from 'react-router-dom'
import SpinnerLoader from '../../SpinnerLoader'

function AllOrders({setNumberOfOrders}) {
    const [orders,setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [showOptions, setShowOptions] = useState(false)

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
    // const CalculateProductsQuantityInOrder = () => {
    //     orders
    // }
    useEffect(() => {
        fetchOrders()
        setNumberOfOrders(orders.length)
    }, [orders])

  return (
    <>
    {
        loading ? (
            <SpinnerLoader/>
        ):(
            (orders && orders.length > 0) ? (
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
                            orders.map((order, index) => (
                                <tr key={index} className=" bg-white border-b border-gray-200 hover:bg-gray-300">
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
                                            <div>{order.shipping?.lastName} {order.shipping?.firstName}</div>
                                        ):(
                                            <p>-</p>
                                        )}
                                    </td>
                                    <td className="px-4 py-7 font-mono">
                                        {order.totalAmount} <span className='text-black '>MAD</span>
                                    </td>
                                    <td className="px-4 py-7 text-base ">
                                        {order.paymentStatus && (
                                            order.paymentStatus === 'pending' ? (
                                                <div className='bg-yellow-400 text-white py-[2px] font-semibold text-[13px] w-20 text-center  rounded-full'>Pending</div>
                                            ) : order.paymentStatus === 'paid' ? (
                                                <div className='bg-green-800 text-white py-[2px] font-semibold text-[13px] w-20  text-center rounded-full'>Paid</div>
                                            ): null
                                        )}
                                    </td>
                                    <td className="px-4 py-7 text-base ">
                                        {order.products.reduce((totalQty, currentValue) => totalQty + currentValue.quantity, 0)} items
                                    </td>
                                    <td className="px-4 py-7 text-base ">
                                        {/* 'pending', 'packed', 'done', 'canceled' */}
                                        {order.status && (
                                            order.status === 'pending' ? (
                                                <div className='bg-blue-50 bg- text-blue-500 py-[2px] font-semibold text-[13px]  text-center  rounded-full'>Order processing</div>
                                            ) : order.status === 'packed' ? (
                                                <div className='bg-purple-50 text-prurple-500 text-[13px] py-[2px] font-semibold w-20 text-center rounded-full'>Packed</div>
                                            ) : order.status === 'done' ? (
                                                <div className="bg-green-50 text-green-500 text-[13px] py-[2px] font-semibold w-20 text-center rounded-full">Done</div>
                                            ) : order.status === 'canceled' ? (
                                                <div className="bg-red-50 text-red-500 text-[13px] py-[2px] font-semibold w-20 text-center rounded-full">Canceled</div>
                                            ) : null
                                        )}
                                    </td>
                                    <td className="relative px-4 py-7">
                                        <EllipsisVertical onClick={() => setShowOptions(index === showOptions ? null : index)} className='cursor-pointer' />
                                        {
                                            showOptions === index && (
                                                <div className=' z-30 absolute right-12 top-12 bg-white shadow-md border border-gray-200 rounded-lg text-black w-32'>
                                                    {/* view product details  */}
                                                    <Link to={`/admin/view_order/${order._id}`}  className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base flex items-center border-b border-gray-200'>
                                                        <div><Eye size={18} /></div>
                                                        <p>View</p>
                                                    </Link>
                                                    {/* update a product */}
                                                    <Link className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base flex items-center border-b border-gray-200'>
                                                        <div><PenLine  size={18} /></div>
                                                        <p>Update</p>
                                                    </Link>
                                                    {/* delete  a product */}
                                                    <Link onClick={() => setPopUp(true)} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base flex items-center text-red-600'>
                                                        <div><Trash2  size={18} /></div>
                                                        <p>Delete</p>
                                                    </Link>
                                                    {/* a Component <PopUp/> to confirm the delete or cancel */}
                                                </div>
                                            )
                                        }
                                    </td>
                                </tr>
                                // <div key={index}>
                                //     <p>{item.productName}</p>
                                // </div>
                            ))
                        )
                        : (
                            <SpinnerLoader/>
                        )
                    }
                            
                    </tbody>
                </table>
            ):(
                <p>Nothing</p>
            )
        )
    }
    </>
  )
}

export default AllOrders
