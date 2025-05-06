import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import React, {useState} from 'react'

function OrderStatus({status, orderId} ) {
    const [statusOptions, setStatusOptions] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    const updateOrderStatus = async(newStatus) => {
        try{
            const response = await axios.patch(`${apiUrl}/orders/update-status/${orderId}`, 
                {OrderStatus: newStatus},
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }}
            )
            console.log("Order status updated: ", response.data)
        }catch(error){
            console.log("Error: ", error)
        }
    }
  return (
    <div>
        {status && (
            <div className={`relative flex gap-1 cursor-pointer rounded-full justify-center items-center m-auto py-[2px] font-semibold text-[13px]
                ${status === 'pending' && 'bg-blue-50 text-blue-500' } 
                ${status === 'packed' && 'bg-purple-50 text-purple-500' } 
                ${status === 'done' && 'bg-green-50 text-green-500 ' } 
                ${status === 'canceled' && 'bg-red-50 text-red-500' } 
                `}
                onClick={() => setStatusOptions(!statusOptions)}
            >
                {status === 'pending' ? <div>On process</div> 
                : status === 'packed' ? <div>Packed</div> 
                : status === 'done' ? <div>Done</div>
                : status === 'canceled' ? <div>Canceled</div>
                : null
                }
                {status != "canceled" && <ChevronDown size={20} />} 
                {statusOptions && status != "canceled" && (
                    <div className='absolute top-6 z-40 bg-white border border-gray-200 rounded-lg'>
                        <div 
                            className='border-b border-gray-200 cursor-pointer px-4 py-2 text-gray-500'
                            onClick={() => updateOrderStatus("pending")}
                        >
                            On process
                        </div>
                        <div 
                            className='border-b border-gray-200 cursor-pointer px-4 py-2 text-gray-500'
                            onClick={() => updateOrderStatus("packed")}
                        >
                            Packed
                        </div>
                        <div 
                            className='border-b border-gray-200 cursor-pointer px-4 py-2 text-gray-500'
                            onClick={() => updateOrderStatus("done")}
                        >
                            Done
                        </div>
                        <div 
                            className='border-b border-gray-200 cursor-pointer px-4 py-2 text-gray-500'
                            onClick={() => updateOrderStatus("canceled")}
                        >
                            Canceled
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default OrderStatus
