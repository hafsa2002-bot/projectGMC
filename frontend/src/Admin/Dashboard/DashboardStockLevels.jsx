import { ArrowRight, Boxes, EllipsisVertical, PackageX, PenLine, Trash2 } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PopUp from '../ItemsPage/PopUp'

function DashboardStockLevels() {
    const [dashboardProducts, setDashboardProducts] = useState([])
    const [showOptions, setShowOptions] = useState(false)
    const [popUp, setPopUp] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:3003/stockLevel")
            .then(response => setDashboardProducts(response.data))
            .catch(error => console.log("Error: ", error))
    }, [dashboardProducts])
  return (
    <div className=''>
        <div className='sticky top-0 z-10 bg-gray-50 px-4 pb-2'>
            <div className=' pt-2 flex justify-between items-center'>
                <div className='flex  justify-center items-center gap-3'>
                    <p className='text-xl font-semibold text-gray-900'>Stock Levels</p>
                    <div className='bg-red-400 rounded-full px-3 text-white font-semibold'>
                        <p>{dashboardProducts.length}</p>
                    </div>
                </div>
                <Link to="/admin/items/low-in-stock" className=' text-blue-600  font-semibold flex justify-center items-center gap-3'>
                    <p>View All</p>
                    <div><ArrowRight size={20} /></div>
                </Link>
            </div>
        </div>
        <div className=' overflow-y-scroll h-64'>
            {
                (dashboardProducts.length >= 1) 
                ?(
                    dashboardProducts.map((product, index)=> (
                        <Link to={`/admin/items/view/${product._id}`} key={product._id} className="flex justify-between items-center border-b border-gray-300 lg:px-4 px-2 py-2.5 h-14 ">
                            <div className='lg:w-3/5 w-2/5 flex items-baseline gap-2 '>
                                <p className=' font-semibold text-gray-700 truncate whitespace overflow-hidden'>{product.productName} </p>
                                <p className='text-gray-400 text-sm'>#{index+1}</p>
                            </div>
                            <div className='flex flex-col lg:w-1/4 w-1/2 gap-1 '>
                                <div>
                                    {
                                        product.outOfStock && (
                                            <div className='bg-red-400 lg:w-11/12 w-8/12  m-auto text-white rounded-md text-center font-semibold text-sm'><p>Out of Stock</p></div>
                                        )
                                    }
                                    {       
                                        product.lowInStock && !product.outOfStock && (
                                            <div className='bg-orange-400 lg:w-11/12 w-8/12  m-auto text-white rounded-md text-center font-semibold text-sm'><p>Low in Stock</p></div>
                                        )
                                    }
                                </div>
                                <div className='flex gap-1 text-sm text-gray-500 items-center justify-center'>
                                    <div><Boxes size={18} /></div>
                                    <div className=''><p>{product.qty} Available</p></div>
                                </div>
                            </div>
                        </Link>
                    ))
                ):(
                    <div className='text-gray-500 text-xl  font-bold h-full w-full flex flex-col justify-center items-center '>
                        <PackageX size={40} className="text-gray-500" />
                        <p>No items Found.</p>
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default DashboardStockLevels
