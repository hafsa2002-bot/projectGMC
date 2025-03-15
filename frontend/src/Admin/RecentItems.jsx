import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

function RecentItems() {
    const [recentItems, setRecentItems] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/list")
            .then(response => setRecentItems(response.data))
            .catch(error => consoel.log("Error: ", error))
    }, [recentItems])
  return (
    <div className=''>
        <div className='flex justify-between items-center mt-9 mb-4'>
            <p className='text-2xl  font-semibold text-gray-700  '>Recent Items</p>
            {/* <Link to="/admin/items" className=' bg-blue-600  py-2 rounded-xl font-semibold text-white '>All Items</Link> */}
            <Link to="/admin/items" className=' text-blue-600   py-2 font-semibold flex justify-center items-center gap-3'>
                <p>View All</p>
                <div><ArrowRight size={20} /></div>
            </Link>
        </div>
        <div className='flex gap-3  py-3 '>
            {recentItems
                ?(
                    recentItems.slice(0, 6).map((item, index) => (
                        <div key={index} className=' w-1/6 shadow-xl  bg-white rounded-lg px-2 py-2'>
                            <div className='w-40 h-40  rounded-lg overflow-hidden m-auto justify-baseline items-baseline'>
                                {item.productPhoto 
                                    ? (
                                        <img 
                                            className='w-full h-full '
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
                    <div>
                        <p>No Items</p>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default RecentItems
