import { ArrowRight, Boxes } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function DashboardStockLevels() {
    const [dashboardProducts, setDashboardProducts] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/admin/dashboard/stockLevels")
            .then(response => setDashboardProducts(response.data))
            .catch(error => console.log("Error: ", error))
    }, [])
  return (
    <div>
        <div className='bg-gray-50 px-4 pb-2'>
            <div className='pt-2 flex justify-between items-center'>
                <div className='flex  justify-center items-center gap-3'>
                    <p className='text-xl font-semibold text-gray-700'>Stock Levels</p>
                    <div className='bg-red-400 rounded-full px-3 text-white font-semibold'>
                        <p>{dashboardProducts.length}</p>
                    </div>
                </div>
                <Link className=' text-blue-600  font-semibold flex justify-center items-center gap-3'>
                    <p>View All</p>
                    <div><ArrowRight size={20} /></div>
                </Link>
            </div>
        </div>
        <div>
            {
                dashboardProducts 
                ?(
                    dashboardProducts.map((product, index)=> (
                        <div>
                            <div>
                                <p>{product.productName} </p>
                                <p>#{index+1}</p>
                            </div>
                            <div>
                                <div>
                                    {
                                        product.outOfStock && (
                                            <div className='bg-red-400 text-white rounded-lg'><p>Out of Stock</p></div>
                                        )
                                    }
                                    {       
                                        product.lowInStock && (
                                            <div><p>Low in Stock</p></div>
                                        )
                                    }
                                </div>
                                <div>
                                    <div><Boxes /></div>
                                    <div><p>{product.qty}</p></div>
                                    <div><p>Available</p></div>
                                </div>
                            </div>
                        </div>
                    ))
                ):(
                    <p>No items Found.</p>
                )
            }
        </div>

    </div>
  )
}

export default DashboardStockLevels
