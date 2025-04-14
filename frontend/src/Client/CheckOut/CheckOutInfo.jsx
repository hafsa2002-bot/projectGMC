import React from 'react'

function CheckOutInfo({shippingPrice}) {
  return (
    <div>
       <div>
            <h2 className='mb-2 text-lg font-medium text-gray-900'>Shipping method</h2>
            <p>Our delivery person will contact you within the next 48 hours to schedule the delivery at a time that suits you.</p>
            <div className='bg-red-50 border-black px-2.5 py-3 flex justify-between items-center  border mt-3  text-gray-900 text-sm rounded-lg  w-full '>
                <div>Packaging + shipping fees</div>
                <div className='font-semibold'>{shippingPrice} MAD</div>
            </div>
        </div>
        <div>
            <h2 className='mb-2 text-2xl font-medium text-gray-900'>Payment</h2>
            <p>The billing address of your payment method must match the shipping address. All transactions are secure and encrypted.</p>
            <div className='bg-red-50 border-black px-2.5 py-3 flex justify-between items-center  border mt-3  text-gray-900 text-sm rounded-lg  w-full '>Cash on delivery</div>
        </div>
    </div>
  )
}

export default CheckOutInfo
