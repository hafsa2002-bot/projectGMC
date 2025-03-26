import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import { ArrowLeft, Download } from 'lucide-react'

function ViewOrder() {
    const {id} = useParams()
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true)
    const [productName, setProductName] = useState("")
    const navigate = useNavigate()

    let getProductName = async (productId) => {
        try{
            const response = await axios.get(`http://localhost:3003/admin/items/view/${productId}`)
            return response.data.productName
        }catch(error){
            console.log("Error: ", error)
            return "Unknown Product"
        }
    }
    

    useEffect(() => {
        axios.get(`http://localhost:3003/orders/${id}`)
            .then(async(response) => {
                const orderData = response.data;
                // for each product, fetch the product name
                const productWithNames = await Promise.all(
                    orderData.products.map(async(product) => {
                        const productName = await getProductName(product.productId)
                        return {...product, productName}
                    })
                )
                setOrder ({...orderData, products: productWithNames})
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
            })
    }, [id])
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
                        <div className='flex gap-5'>
                            <Link className='border border-blue-600 text-blue-600 bg-white px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                <p>Edit order</p>
                            </Link>
                            <Link className='border flex gap-2 justify-center items-center border-blue-600 text-white bg-blue-600 px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                <div><Download /></div>
                                <p>Download PDF</p>
                            </Link>
                        </div>
                    </div>
                    <div className='bg-white w-10/12 m-auto mt-10 mb-10 pb-20  font-poppins'>
                        <div className='border-b border-gray-300 px-8 pb-5 pt-6 flex justify-between items-end'>
                            <div className='text-stone-500'>
                                <p className='text-blue-600 text-xl font-semibold font-poppins mb-1'>Novexa</p>
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
                            <div className=''>Vendor:</div>
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
                        <div>
                            <table className="w-full mt-10 text-left">
                                <thead className='bg-blue-600 text-white'>
                                    <tr >
                                        <th scope="col" className="px-4 py-3">
                                            Item
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products && (
                                        order.products.map((product, index) => (
                                        <tr key={index}>
                                            <td  className="px-4 py-4">
                                                {/* {getProductName(product.productId)} */}
                                                {product.productName}
                                            </td>
                                            <td className="px-4 py-4">
                                                {product.quantity}
                                            </td>
                                            <td className="px-4 py-4">
                                                {product.price} MAD
                                            </td>
                                            <td className="px-4 py-4">
                                                {product.quantity * product.price} MAD
                                            </td>
                                        </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                            <div className='flex justify-between border-b border-t border-gray-400 px-12 mt-6 py-5'>
                                <div className='w-1/2'></div>
                                <div className='w-1/2 flex flex-col gap-3'>
                                    <div className='flex justify-between'>
                                        <div>
                                            <p>Total (MAD)</p>
                                            <p className='text-xs text-gray-500'>Excl. Shipping</p>
                                        </div>
                                        <div>{order.totalAmount} MAD</div>
                                    </div>
                                    <div className='flex justify-between text-gray-700 text-sm'>
                                        <div><p>Shipping Fee</p></div>
                                        <div><p>{order.shipping.shippingPrice} MAD</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between px-12 py-5'>
                                <div className='w-1/2'></div>
                                <div className='w-1/2 flex flex-col gap-3 '>
                                    <div className='flex justify-between'>
                                        <div>
                                            <p>Total Due (MAD)</p>
                                        </div>
                                        <div>{order.totalAmount + order.shipping.shippingPrice} MAD</div>
                                    </div>
                                    <div className='flex justify-between text-gray-800 text-sm'>
                                        <div><p>Paid (MAD)</p></div>
                                        <div><p>{order.amountPaid} MAD</p></div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div><p>Balance (MAD)</p></div>
                                        <div><p>{order.rest} MAD</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-10/12 m-auto border-t-2 border-blue-600 pt-5 pb-14 flex justify-center items-center gap-4">
                        <p className='font-medium w-1/2 text-end'>Powered by </p>
                        <div className=" w-1/2 flex gap-2 justify-start items-center">
                            <div className='w-11 h-11'><img src="/images/logoOrder.png" alt='logo'/></div>
                            <div className='font-poppins text-lg'><span className='text-blue-600'>Nov</span>exa</div>
                        </div>
                    </div>
                    
                    
                </div>
            )
        }
    </div>
  )
}

export default ViewOrder
