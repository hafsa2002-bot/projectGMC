import axios from 'axios'
import { ChevronDown } from 'lucide-react'
import React, {useState} from 'react'

function PaymentStatus({paymentStatus, orderId}) {
    const [paymentOptions, setPaymentOptions] = useState(false)
    const updatePaymentStatus = async(newStatus) => {
        try{
            const response = await axios.patch(`http://localhost:3003/orders/update-payment-status/${orderId}`, 
                {newStatus: newStatus}
            )
            console.log("Order status updated: ", response.data)
        }catch(error){
            console.log("Error: ", error)
        }
    }
  return (
    <div>
        {paymentStatus && (
            <div  className={`relative flex gap-1 cursor-pointer rounded-full justify-center items-center m-auto py-[2px] font-semibold text-[13px]
                ${ paymentStatus === 'pending' && 'bg-blue-400 text-white'}
                ${paymentStatus === 'paid' && 'bg-green-800 text-white '}
                ${paymentStatus === 'refunded' && 'bg-red-400 text-white'}
                `}
                onClick={() => setPaymentOptions(!paymentOptions)}
            >   
                {
                    paymentStatus === 'pending' ? <div>Pending</div>
                    : paymentStatus === 'paid' ? <div>Paid</div>
                    : paymentStatus === "refunded" ? <div>Refunded</div>
                    : null
                }
                {paymentStatus !== "refunded" && <ChevronDown size={20}  />} 
                {paymentOptions && paymentStatus !== "refunded" && (
                    <div className='absolute top-6 z-40 bg-white border border-gray-200 rounded-lg'>
                        <div 
                            className='border-b border-gray-200 cursor-pointer px-6 py-2 text-gray-500'
                            onClick={() => updatePaymentStatus("pending")}
                        >
                            Pending
                        </div>
                        <div 
                            className='border-b border-gray-200 cursor-pointer px-6 py-2 text-gray-500'
                            onClick={() => updatePaymentStatus("paid")}
                        >
                            Paid
                        </div>
                        <div 
                            className='border-b border-gray-200 cursor-pointer px-6 py-2 text-gray-500'
                            onClick={() => updatePaymentStatus("refunded")}
                        >
                            Refunded
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default PaymentStatus
