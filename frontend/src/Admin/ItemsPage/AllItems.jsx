import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { EllipsisVertical, Eye, Image, PenLine, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SpinnerLoader from '../../SpinnerLoader'
import PopUp from './PopUp'
import { jwtDecode } from 'jwt-decode'
import { useCart } from '../../CartContext'

function AllItems() {
    const [items, setItems] = useState([])
    const [showOptions, setShowOptions] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem("token");
    const {currency} = useCart()
    let userRole = null;
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }

    const getItems = () => {
        axios.get(`${apiUrl}/admin/items/list`)
        .then(response => {
            setItems(response.data);
            setLoading(false)
        })
        .catch(error => {
            console.log("Error: ", error)
            setLoading(false)
        })
    }

    useEffect(() => {
        getItems()
    }, [])

  return (
    <div className=" bg-white border overflow-x-scroll border-gray-300 mt-8    shadow-md sm:rounded-lg">
        {
            loading 
            ?(
                <SpinnerLoader/>
            ):(
                <>
                { items.length > 0 
                    ?(
                        <table className=" lg:w-full  overflow-x-scroll text-sm text-left rtl:text-right text-gray-500 mb-20">
                            <thead className=" text-gray-700  bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="lg:px-6 px-3 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="lg:px-6 px-3 py-3">
                                        Qty available
                                    </th>
                                    <th scope="col" className="lg:px-6 px-3 py-3">
                                        Items sold
                                    </th>
                                    <th scope="col" className="lg:px-6 px-3 py-3">
                                        Unit price
                                    </th>
                                    <th scope="col" className="lg:px-6 px-3 py-3">
                                        Expiry Date
                                    </th>
                                    <th scope="col" className="lg:px-6 px-3 py-3">
                                            
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                items
                                ?(
                                    [...items].reverse().map((item, index) => (
                                        <tr key={index} className=" bg-white border-b border-gray-200 w-full">
                                            <td scope="row" className=" lg:px-6 px-3 py-4 font-medium text-gray-900  dark:text-white">
                                                <Link to={`/admin/items/view/${item._id}`} className='flex items-center gap-4 '>
                                                    <div className=' flex justify-center items-center realtive w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                                        {
                                                            item.productPhoto 
                                                            ?   <img className='w-full h-full' src={`${apiUrl}${item.productPhoto}`}/>
                                                            :   <div className= '  w-full  h-full flex justify-center items-center bg-gray-200 '><Image className=' text-gray-600 w-6 h-6 ' strokeWidth='1'  /></div>
                                                            // <div className= 'relative w-full  h-full flex justify-center items-center bg-gray-200 '><Image className='absolute text-gray-600 w-6 h-6 ' strokeWidth='1'  /></div>
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className='text-base lg:max-w-60 max-w-32 truncate'>{item.productName}</p>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="lg:px-6 px-3 py-4">
                                                {item.qty} items
                                            </td>
                                            <td className="lg:px-6 px-3 py-4">
                                                {item.itemsSold && (<p>{item.itemsSold} items</p>)}
                                            </td>
                                            <td className="lg:px-6 px-3 py-4">
                                                {item.price} <span className='text-black'>{currency}</span>
                                            </td>
                                            <td className="lg:px-6 px-3 py-4 text-base ">
                                                {
                                                item.expirationDate ? (item.expirationDate.slice(0,10))
                                                : item.earliestExpiration ? (item.earliestExpiration.slice(0,10))
                                                :(<p>-</p>)
                                                }
                                            </td>
                                            <td className="relative lg:px-6 px-3 py-4">
                                                {userRole == "admin" 
                                                    ?(
                                                        <>
                                                        <EllipsisVertical onClick={() => setShowOptions(index === showOptions ? null : index)} className='cursor-pointer' />
                                                        {
                                                            showOptions === index && (
                                                                <div className=' z-30 absolute lg:right-12 right-6 top-16 bg-white shadow-md border border-gray-200 rounded-lg text-black w-32'>
                                                                    {/* view product details  */}
                                                                    <Link to={`/admin/items/view/${item._id}`} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                                        <div><Eye /></div>
                                                                        <p>View</p>
                                                                    </Link>
                                                                    {/* update a product */}
                                                                    <Link to={`/admin/items/update-item/${item._id}`} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                                        <div><PenLine /></div>
                                                                        <p>Update</p>
                                                                    </Link>
                                                                    {/* delete  a product */}
                                                                    <Link onClick={() => setPopUp(true)} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center text-red-600'>
                                                                        <div><Trash2 /></div>
                                                                        <p>Delete</p>
                                                                    </Link>
                                                                    {/* a Component <PopUp/> to confirm the delete or cancel */}
                                                                    {popUp && <PopUp setPopUp={setPopUp} name={item.productName} id={item._id} setShowOptions={setShowOptions} products={items} setProducts={setItems} />}
                                                                </div>
                                                            )
                                                        }
                                                        </>
                                                    ):(
                                                        <Link to={`/admin/items/view/${item._id}`} className='hover:text-black underline text-blue-500 '>
                                                            View
                                                        </Link>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))
                                )
                                : (
                                    <SpinnerLoader/>
                                )
                            }
                                    
                            </tbody>
                        </table>
        
                    )
                    :(
                        <div className='flex flex-col gap-3  justify-center items-center py-14'>
                            <img src="/images/sticker.svg" className='w-32 ' alt="" />
                            <div className='flex flex-col items-center'>
                                <p className='text-xl font-semibold'>Your products show up here</p>
                                <p className='text-gray-600'>Click the <span className='font-semibold'>Add Item</span> button below to add products </p>
                            </div>
                            <Link to="/admin/items/add-item" className='text-white bg-blue-600 px-3 py-2 rounded-xl font-semibold'>
                                <p>Add Item</p>
                            </Link>
                        </div>
                    )
                }
                </>

            )
        }
    </div>
  )
}

export default AllItems
