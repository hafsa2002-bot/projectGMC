import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ArrowRight, PackageX } from 'lucide-react'

function RecentItems() {
    const [recentItems, setRecentItems] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/list")
            .then(response => setRecentItems(response.data))
            .catch(error => console.log("Error: ", error))
    }, [])
  return (
    <div className=''>
        <div className='flex justify-between items-center mt-9 mb-4 lg:px0 px-3'>
            <p className='text-2xl  font-semibold text-gray-900  '>Recent Items</p>
            {/* <Link to="/admin/items" className=' bg-blue-600  py-2 rounded-xl font-semibold text-white '>All Items</Link> */}
            <Link to="/admin/items" className=' text-blue-600   py-2 font-semibold flex justify-center items-center gap-3'>
                <p>View All</p>
                <div><ArrowRight size={20} /></div>
            </Link>
        </div>
        {/* laptop version */}
        <div className='lg:flex hidden  lg:gap-3 gap-6 lg:m-0 justify-center lg:px-0 px-3  py-3 lg:flex-nowrap flex-wrap '>
            {recentItems
                ?(
                    [...recentItems].reverse().slice(0, 6).map((item, index) => (
                        <div key={index} className=' lg:w-1/6 w-5/12 shadow-xl  bg-white rounded-lg lg:px-2 py-2 '>
                            <div className='lg:w-40 w-28 lg:h-40 h-28  rounded-lg overflow-hidden m-auto justify-baseline items-baseline'>
                                {item.productPhoto 
                                    ? (
                                        <img 
                                            className='w-full h-full'
                                            src={`http://localhost:3003${item.productPhoto}`}
                                        />
                                    ):(
                                        <div></div>
                                    )
                                }
                            </div>
                            <div className='px-3 flex flex-col mt-2'>
                                <p className='font-semibold text-gray-800 '>{item.productName}</p>
                                <p className='text-gray-500 font-bold '>{item.qty} Qty</p>
                            </div>
                        </div>
                    ))
                )
                : (
                    <div className='text-gray-500 flex flex-col gap-2 justify-center items-center border border-gray-400 rounded-lg  bg-white w-full py-7'>
                        <PackageX size={35} />
                        <p class="text-gray-500 text-xl font-semibold">No items available.</p>
                    </div>
                )
            }
        </div>
        {/* phone version */}
        <div className='flex lg:hidden gap-5  overflow-x-scroll w-full px-3  py-3  '>
            {recentItems
                ?(
                    [...recentItems].reverse().slice(0, 6).map((item, index) => (
                        <div key={index} className='w-72 shadow-xl  bg-white rounded-lg lg:px-2 py-2 '>
                            <div className=' w-40 h-40  rounded-lg overflow-hidden m-auto justify-baseline items-baseline'>
                                {item.productPhoto 
                                    ? (
                                        <img 
                                            className='w-full h-full'
                                            src={`http://localhost:3003${item.productPhoto}`}
                                        />
                                    ):(
                                        <div></div>
                                    )
                                }
                            </div>
                            <div className='px-3 flex flex-col mt-2'>
                                <p className='font-semibold'>{item.productName}</p>
                                <p className='text-gray-500 font-bold'>{item.qty} Qty</p>
                            </div>
                        </div>
                    ))
                )
                : (
                    <div className='text-gray-500 flex flex-col gap-2 justify-center items-center border border-gray-400 rounded-lg  bg-white w-full py-7'>
                        <PackageX size={35} />
                        <p class="text-gray-500 text-xl font-semibold">No items available.</p>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default RecentItems
