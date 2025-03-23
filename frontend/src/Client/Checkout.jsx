import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCart} from '../CartContext'
import { CircleHelp, ShoppingCart } from 'lucide-react'
import CheckOutNav from './CheckOutNav'
import ChecOutCart from './ChecOutCart'

function Checkout() {
    const {cart, setCart} = useCart()
    const [total, setTotal] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const [shipping, setShipping] = useState(40)
    const [showPhoneInfo, setShowPhoneInfo] = useState(false)

    const calculateTotal = () => {
        const res = cart.reduce((total, currentValue) => total +(currentValue.price * currentValue.quantity), 0)
        setTotal(res)
    }

    const CalculateTotalQuantity = () => {
        const Qty = cart.reduce((totalQty, currentValue) => totalQty + (currentValue.quantity), 0)
        setTotalQty(Qty)
    }
    useEffect(() => {
        calculateTotal()
        CalculateTotalQuantity()
    }, [cart])

  return (
    <div className=''>
        {/* NavBar */}
        <CheckOutNav/>
        <div className='flex '>
            {/* Client Info */}
            <div className='w-7/12 border-r border-gray-300 pb-20'>
                <form className='w-9/12 m-auto mt-10 flex flex-col gap-4'>
                    {/* Contact */}
                    <div>
                        <h2 className='mb-2 text-2xl font-medium text-gray-900'>Contact</h2>
                        <input
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-700 focus:border-gray-700 `   }
                            type="email" 
                            name="CustomerMail" 
                            id="CustomerMail"
                            placeholder='name@example.com'
                            required
                        />
                    </div>
                    {/* Shipping */}
                    <div>
                        <div className='pb-4 pt-6'>
                            <h2 className='mb-2 text-2xl font-medium text-gray-900'>Shipping</h2>
                            <p>This address will be used as the payment address for this order.</p>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <div className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-700 focus:border-gray-700 `   } >
                                <select
                                    className='w-full outline-none'
                                    name="" id="">
                                    <option>Maroc</option>
                                </select>
                            </div>
                            <div className='flex gap-6'>
                                {/* Prenom */}
                                <div className='w-1/2'>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   }
                                        type="text" 
                                        name="firstName" 
                                        id="firstName"
                                        placeholder='First name'
                                        required 
                                    />
                                </div>
                                {/* Nom */}
                                <div className='w-1/2'>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   }
                                        type="text" 
                                        name="lastName" 
                                        id="lastName"
                                        placeholder='Last name'
                                        required 
                                    />
                                </div>
                            </div>
                            {/* Address */}
                            <div>
                                <input
                                    className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   }
                                    type="text" 
                                    name="customerAddress" 
                                    id="customerAddress"
                                    placeholder='Address'
                                    required 
                                />
                            </div>
                            <div className='flex gap-6'>
                                {/* postal code */}
                                <div className='w-1/2'>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   } 
                                        type="text" 
                                        name="postalCode" 
                                        id="postalCode"
                                        placeholder='Postal code (optional)' 
                                    />
                                </div>
                                {/* city */}
                                <div  className='w-1/2'>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   } 
                                        type="text" 
                                        name="city" 
                                        id="city"
                                        placeholder='City'
                                        required 
                                    />
                                </div>
                            </div>
                            {/* phone number */}
                            <div className={`flex justify-between items-center pr-3 bg-gray-50 border  text-gray-900 text-sm rounded-lg  w-full  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   }>
                                <input
                                    className='h-full w-full px-2.5 py-3 outline-none'
                                    type="tel" 
                                    name="PhoneNumber" 
                                    id="PhoneNumber"
                                    pattern="^0[67][0-9]{8}$"
                                    placeholder='Phone number'
                                    required 
                                />
                                <div
                                    className='relative'
                                    onMouseEnter={() => setShowPhoneInfo(true)}
                                    onMouseLeave={() => setShowPhoneInfo(false)}
                                >
                                    <CircleHelp className='text-gray-600' />
                                    {
                                        showPhoneInfo && (
                                            <div className='absolute bg-gray-800 text-white w-32 bottom-7  p-2 rounded-lg'>In case we need to contact you about your order</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className='mb-2 text-lg font-medium text-gray-900'>Shipping method</h2>
                        <p>Our delivery person will contact you within the next 48 hours to schedule the delivery at a time that suits you.</p>
                        <div className='bg-red-50 border-black px-2.5 py-3 flex justify-between items-center  border mt-3  text-gray-900 text-sm rounded-lg  w-full '>
                            <div>Packaging + shipping fees</div>
                            <div className='font-semibold'>{shipping} MAD</div>
                        </div>
                    </div>
                    <div>
                        <h2 className='mb-2 text-2xl font-medium text-gray-900'>Payment</h2>
                        <p>The billing address of your payment method must match the shipping address. All transactions are secure and encrypted.</p>
                        <div className='bg-red-50 border-black px-2.5 py-3 flex justify-between items-center  border mt-3  text-gray-900 text-sm rounded-lg  w-full '>Cash on delivery</div>
                    </div>
                    <button  className='bg-black font-semibold px-2.5 py-3 flex justify-between items-center  border mt-3  text-white text-lg rounded-lg  w-full text-center'>
                        <p className=' w-full'>Confirm the order</p> 
                    </button>
                </form>
            </div>
            {/* Cart Info */}
            <ChecOutCart cart={cart} total={total} totalQty={totalQty}  />
        </div>
    </div>
  )
}

export default Checkout
