import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { EllipsisVertical, Eye, Image, Info, PenLine, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SpinnerLoader from '../../SpinnerLoader'
import PopUp from './PopUp'

function BestSellingProducts() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showOptions, setShowOptions] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const getBestSellingItems = () => {
        axios.get("http://localhost:3003/admin/items/sort-best-selling")
        .then(response => {
            setItems(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log("Error: ", error)
            setLoading(false)
        })
    }

    useEffect(() => {
        getBestSellingItems()
    }, [])
  return (
    <div className=" bg-white border border-gray-300 mt-8    shadow-md sm:rounded-lg">
        {
            loading 
            ?(
                <SpinnerLoader/>
            ):(
                <>
                { items.length > 0 
                    ?(
                        <table className=" w-full text-sm text-left rtl:text-right text-gray-500 mb-20">
                            <thead className=" text-gray-700  bg-gray-50 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Qty available
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Items sold
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Unit price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Expiry Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                            
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                items
                                ?(
                                    items.map((item, index) => (
                                        <tr key={index} className=" bg-white border-b border-gray-200">
                                            <td scope="row" className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <Link to={`/admin/items/view/${item._id}`} className='flex items-center gap-4 '>
                                                    <div className=' flex justify-center items-center realtive w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                                        {
                                                            item.productPhoto 
                                                            ?   <img className='w-full h-full' src={`http://localhost:3003${item.productPhoto}`}/>
                                                            :   <div className= '  w-full  h-full flex justify-center items-center bg-gray-200 '><Image className=' text-gray-600 w-6 h-6 ' strokeWidth='1'  /></div>
                                                        }
                                                    </div>
                                                    <div>
                                                        <p className='text-base max-w-60 truncate'>{item.productName}</p>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.qty} items
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.itemsSold && (<p>{item.itemsSold} items</p>)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.price} <span className='text-black'>MAD</span>
                                            </td>
                                            <td className="px-6 py-4 text-base ">
                                                {
                                                item.expirationDate  
                                                ? (item.expirationDate.slice(0,10))
                                                : (<p>-</p>)
                                                }
                                            </td>
                                            <td className="relative px-6 py-4">
                                                <EllipsisVertical onClick={() => setShowOptions(index === showOptions ? null : index)} className='cursor-pointer' />
                                                {
                                                    showOptions === index && (
                                                        <div className=' z-30 absolute right-12 top-16 bg-white shadow-md border border-gray-200 rounded-lg text-black w-32'>
                                                            {/* view product details  */}
                                                            <Link to={`/admin/items/view/${item._id}`} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                                <div><Eye /></div>
                                                                <p>View</p>
                                                            </Link>
                                                            {/* update a product */}
                                                            <Link className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                                <div><PenLine /></div>
                                                                <p>Update</p>
                                                            </Link>
                                                            {/* delete  a product */}
                                                            <Link onClick={() => setPopUp(true)} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center text-red-600'>
                                                                <div><Trash2 /></div>
                                                                <p>Delete</p>
                                                            </Link>
                                                            {/* a Component <PopUp/> to confirm the delete or cancel */}
                                                            {popUp && <PopUp setPopUp={setPopUp} name={item.productName} id={item._id} setShowOptions={setShowOptions} />}
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

export default BestSellingProducts
