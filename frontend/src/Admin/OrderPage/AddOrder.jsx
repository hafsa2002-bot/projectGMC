import { ArrowLeft, ChevronDown, CirclePlus, Trash2} from 'lucide-react'
import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
function AddOrder() {
    // const [shipping, setShipping] = useState({})
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [shippingPrice, setShippingPrice] = useState("")

    const submitOrder = () => {}
  return (
    <div className='my-3'>
        <div className='flex mb-10'>
            <Link to="/admin/orders" className='flex gap-2 items-center'>
                <div><ArrowLeft className='text-gray-600 '/></div>
            </Link>
            <div className='text-2xl text-gray-600 pl-2 font-semibold font-poppins'><p>Add New Item</p></div>
        </div>
        <div className='bg-white p-5 mt-5 rounded-lg mb-24'>
            <div className='mb-3'>
                <p className='text-xl font-semibold'>Order Details</p>
                <p className='text-gray-600 text-sm mt-1'>Fill in your purchase order details </p>
            </div>
            <form onSubmit={submitOrder}>
                {/* customer info */}
                <div className='flex gap-10 mt-7'>
                    <div className='w-1/2 flex flex-col '>
                        <label htmlFor="firstName" className='font-medium text-gray-900 mb-2' >Customer name</label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text" 
                            name="firstName" 
                            id="firstName"
                        />
                    </div>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="address" className='font-medium text-gray-900 mb-2' >Delivery address</label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text" 
                            name="address" 
                            id="address"
                        />
                    </div>
                </div>
                <div className='flex gap-10 mt-5'>
                    <div className='w-1/2 flex flex-col'>
                        <label htmlFor="shippingPrice" className='font-medium text-gray-900 mb-2' >Shipping fees</label>
                        <input 
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                            value={shippingPrice}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text" 
                            name="shippingPrice" 
                            id="shippingPrice"
                        />
                    </div>
                    <div className='w-1/2'></div>
                </div>
                {/* order array */}
                <div className='w-full border border-gray-300 rounded-lg overflow-hidden mt-10 '>
                    <table className='w-full'>
                        <thead className='py-2 bg-gray-100 font-semibold text-left border-b border-gray-300'>
                            <tr>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">#</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Item Name</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Quantity</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Price</th>
                                <th scope="col" className="px-6 py-3 border-r border-gray-300">Subtotal</th>
                                <th scope="col" className="px-2 py-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border-b border-gray-300'>
                                <td className="px-6 py-3 border-r border-gray-300">1</td>
                                {/* select product name */}
                                <td  className="px-6 py-3 border-r border-gray-300">
                                    <div 
                                        className={` flex justify-between  border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                                    >
                                        <input
                                            className='outline-none'                             
                                            type="text" name="" id="" 
                                        />
                                        <ChevronDown />
                                    </div>
                                </td>
                                {/* quantity */}
                                <td className="px-6 py-3 border-r border-gray-300">
                                    <div>
                                        <input 
                                            className={` flex justify-between border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                            type="number" name="" id="" 
                                        />
                                    </div>
                                </td>
                                {/* price */}
                                <td className="px-6 py-3 border-r border-gray-300">
                                    <input 
                                        className={` flex justify-between bg-gray-50 border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                        type="number" name="" id=""  min="1"
                                    />
                                </td>
                                {/* subtotal */}
                                <td className="px-6 py-3 border-r border-gray-300">
                                    <input 
                                        className={` flex justify-between bg-gray-50 border  text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                        type="number" name="" id="" 
                                    />
                                </td>
                                {/* delete row */}
                                <td className="px-2 py-3">
                                    <Trash2 className='text-gray-500' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='text-blue-600 flex items-center gap-2 font-medium mt-4'>
                    <CirclePlus size={20} /><p>Add new line</p> 
                </div>
            </form>
            <div className='text-xl w-full mt-7'>
                <div className='w-full flex text-lg py-4 justify-between border-b border-gray-300'>
                    <p>Total Excl.Shipping (MAD)</p>
                    <p>0</p>
                </div>
                <div className='w-full flex py-4 text-base text-gray-600 justify-between border-b border-gray-300'>
                    <p>Shipping Fees (MAD)</p>
                    <p>0</p>
                </div>
                <div className='w-full flex py-4 justify-between border-b border-gray-300'>
                    <p>Total Due (MAD)</p>
                    <p>0</p>
                </div>
            </div>
            <div className='py-5 flex  gap-4 items-center'>
                <button className='bg-blue-600 text-white px-5 py-2 rounded-lg text-lg font-medium'>Save Order</button>
                <div onClick={() => navigate(-1)} className='text-red-600 font-medium'>Cancel</div>
            </div>
        </div>
    </div>
  )
}

export default AddOrder
