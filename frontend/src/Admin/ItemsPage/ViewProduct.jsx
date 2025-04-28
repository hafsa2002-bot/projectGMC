import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Check, Image } from 'lucide-react'
import SpinnerBlue from '../SpinnerBlue'
import UpdateQuantity from './UpdateQuantity'
import { jwtDecode } from 'jwt-decode'

function ViewProduct() {
    const {product_id} = useParams()
    const [product, setProduct] = useState([])
    const [updateQty, setUpdateQty] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState(false)
    const token = localStorage.getItem("token");
    let userRole = null;
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }
    useEffect(() => {
        axios.get(`http://localhost:3003/admin/items/view/${product_id}`)
            .then(response => {
                setProduct(response.data)
                console.log("Product By ID: ", response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log("error: ", error)
                setLoading(false)
            })
    }, [])
  return (
    <div className='my-3'>
        {
            loading 
            ?(
                <SpinnerBlue/>
            ):(
                <>
                    <div className='flex justify-between items-center'>
                        <div onClick={() => navigate(-1)}  className='flex gap-2 items-center cursor-pointer'>
                            <div><ArrowLeft/></div>
                            <div className='text-xl'><p>{product.productName}</p></div>
                        </div>
                        {userRole == "admin" && (
                            <div className='flex gap-3'>
                                <Link to={`/admin/items/update-item/${product_id}`} className='border border-blue-600 text-blue-600 bg-white px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                    <p>Edit Item</p>
                                </Link>
                                <div
                                    onClick={() => setUpdateQty(true)} 
                                    className='bg-blue-500 cursor-pointer text-white  px-4 py-1.5 font-semibold text-lg rounded-lg'>
                                    <p>Update quantity</p>
                                </div>
                                {updateQty && <UpdateQuantity setUpdateQty={setUpdateQty} item={product} setMessage={setMessage} />}
                            </div>
                        )}
                    </div>
                    <div className='bg-white px-8 mt-8 pb-20 pt-5  rounded-lg mb-24 flex flex-col gap-7'>
                        <div>
                            <p className='text-xl font-medium'>Item details</p>
                            <p className='text-gray-500'>View all details of your products & services</p>
                        </div>
                        <div className='flex gap-20 items-start mt-5'>
                            <div className=''>
                                {
                                    product.productPhoto 
                                    ?   <img src={`http://localhost:3003${product.productPhoto}`} className='w-60 h-60 border-gray-300 border rounded-lg my-5'/>
                                    :   <div className='relative w-60 h-60 bg-gray-300 rounded-lg text-gray-600'>
                                            <Image className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' size={60} />
                                        </div>
                                }
                            </div>
                            <div className='flex flex-col gap-3 '>
                                <div className='flex items-center gap-4'>
                                    <p className=' text-lg font-semibold'>{product.productName}</p>
                                    <div className={`rounded-3xl px-4 py-1 font-semibold ${product.qty === 0 ? 'text-red-600 bg-red-100' : 'text-blue-600 bg-blue-100 '}`}><div>Quantity: {product.qty} </div></div>
                                </div>
                                <div className='flex w-96'>
                                    <p className='w-1/3 text-gray-500'>Item ID</p>
                                    <p className='w-2/3'>{product._id}</p>
                                </div>
                                <div className='flex w-96'>
                                    <p className='w-1/3 text-gray-500'>Barcode</p>
                                    <p className='w-2/3'>{product.barcode}</p>
                                </div>
                                <div className='flex w-96'>
                                    <p className='w-1/3 text-gray-500'>Price</p>
                                    <p className='w-2/3'>{product.price} <span className='font-semibold'>MAD</span></p>
                                </div>
                                <div className='flex w-96'>
                                    <p className='w-1/3 text-gray-500'>Items Sold</p>
                                    <p className='w-2/3'>{product.itemsSold} items</p>
                                </div>
                                <div className='flex w-96'>
                                    <p className='w-1/3 text-gray-500'>Minimum qty</p>
                                    <p className='w-2/3'>{product.minLevel ? product.minLevel : '_'} items</p>
                                </div>
                                <div className='flex w-96'>
                                    <p className='w-1/3 text-gray-500'>Category</p>
                                    <p className='w-2/3 '>{product.categoryId ? product.categoryId.categoryName : '_'}</p>
                                </div>
                                <div className='flex w-96'>
                                    <p className='w-1/3 text-gray-500'>Expire date</p>
                                    <p className='w-2/3 '>{product.expirationDate ? product.expirationDate.slice(0, 10) : '_'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        {message && (
            <div className='w-1/4 flex gap-2 justify-center items-center py-2 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-white border border-gray-300  '>
                <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center' ><Check size={14} /></div>
                <p>Quantity updated successfully</p> 
            </div>
        )}
    </div>
  )
}

export default ViewProduct
