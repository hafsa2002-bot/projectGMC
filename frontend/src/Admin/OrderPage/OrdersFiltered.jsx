import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { EllipsisVertical, Eye, PenLine, Trash2 } from 'lucide-react'
import PaymentStatus from './PaymentStatus'
import DeleteOrder from './DeleteOrder'
import { jwtDecode } from 'jwt-decode'
import { useCart } from '../../CartContext'

function OrdersFiltered({orders}) {
    const [showOptions, setShowOptions] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const token = localStorage.getItem("token");
    let userRole = null;
    const {currency} = useCart()
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }
    return (
        <div className='w-full'>
        {
            orders && orders.length > 0
            ?(
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
                    <tbody className='w-full'>
                        { orders.map((order, index) => (
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
                                        <div>{order.shipping.firstName && order.shipping.firstName} {order.shipping.lastName && order.shipping.lastName}</div>
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
                                <td className="px-4 py-7 text-base ">
                                    {order.status && (
                                        order.status === 'pending' ? (
                                            <div className='bg-blue-50 bg- text-blue-500 py-[2px] font-semibold text-[13px]  text-center  rounded-full'>Order processing</div>
                                        ) : order.status === 'packed' ? (
                                            <div className='bg-purple-50 text-purple-500 text-[13px] py-[2px] font-semibold w-20 text-center rounded-full'>Packed</div>
                                        ) : order.status === 'done' ? (
                                            <div className="bg-green-50 text-green-500 text-[13px] py-[2px] font-semibold w-20 text-center rounded-full">Done</div>
                                        ) : order.status === 'canceled' ? (
                                            <div className="bg-red-50 text-red-500 text-[13px] py-[2px] font-semibold w-20 text-center rounded-full">Canceled</div>
                                        ) : null
                                    )}
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
                        ))}
                        
                    </tbody>
                </table>
            )
            : (
                <div className='flex flex-col gap-3 m-auto w-full justify-center items-center py-14'>
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
        }
    </div>
  )
}

export default OrdersFiltered
