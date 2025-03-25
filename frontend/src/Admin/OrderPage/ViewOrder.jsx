import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import { ArrowLeft } from 'lucide-react'

function ViewOrder() {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    

    useEffect(() => {
        axios.get(`http://localhost:3003/orders/${id}`)
            .then(response => {
                // console.log("order: ", order)
                setOrder(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [order])
  return (
    <div>
        {
            loading ? (
                <SpinnerBlue/>
            ):(
                <div> 
                    <div className='flex justify-between items-center p-4'>
                        <div onClick={() => navigate(-1)}  className='flex gap-2 items-center cursor-pointer'>
                            <div><ArrowLeft/></div>
                            <div className='text-xl font-bold'><p>Order #{order._id}</p></div>
                        </div>
                        <Link className='border border-blue-600 text-blue-600 bg-white px-4 py-1.5 font-semibold text-lg rounded-lg'>
                            <p>Edit order</p>
                        </Link>
                    </div>
                    <div className='bg-white w-10/12 m-auto mt-10  font-poppins font-medium'>
                        <div className='border-b border-gray-300 px-8 pb-5 pt-6 flex justify-between items-end'>
                            <div className='text-stone-500'>
                                <p className='text-blue-600 text-xl font-semibold'>Novexa</p>
                                <p>Admin Name</p>
                                <p>Address, num x<span>,</span></p>
                                <p>Country</p>
                                <p>admin@gmail.com</p>
                                <p>0000000000</p>
                            </div>
                            <div>
                                <div className='flex justify-end gap-2'><span className='font-semibold'>Order number: </span><p className='text-gray-600'> {order._id}</p></div>
                                <div className='flex justify-end gap-2'><span className='font-semibold'>Date issued: </span><p className='text-gray-600'> {order.createdAt.slice(0, 10)}</p></div>
                            </div>
                        </div>
                        <div className='px-8 flex gap-5 pt-5'>
                            <div className='font-medium'>Vendor:</div>
                            <div>
                                {
                                    order.shipping && (
                                        <div className='text-gray-600'>
                                            <div className='flex gap-1'>{order.shipping.firstName && (<p>{order.shipping.firstName}</p>)} {order.shipping.lastName && (<p> {order.shipping.lastName} </p>)}</div>
                                            <div>
                                                {order.shipping.address},<br/>
                                                <div className='flex gap-1'> {order.shipping.city}, {order.shipping.postalCode && (<p>{order.shipping.postalCode} </p>)}</div> 
                                            </div>
                                            <p>{order.contact.customerMail}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/* {
                        order.products?.map((product, index) => (
                            <div className='border-b'>
                                <p>{product.productId}</p>
                                <p>{product.quantity}</p>
                            </div>
                        ))
                    } */}
                    
                </div>
            )
        }
    </div>
  )
}

export default ViewOrder
