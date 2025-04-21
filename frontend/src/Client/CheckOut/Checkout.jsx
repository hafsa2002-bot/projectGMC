import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCart} from '../../CartContext'
import { CircleHelp, ShoppingCart } from 'lucide-react'
import CheckOutNav from './CheckOutNav'
import ChecOutCart from './ChecOutCart'
import axios from 'axios'
import CheckOutInfo from './CheckOutInfo'
import SucessMessage from '../../Admin/SucessMessage'
import PhoneCheckOut from './PhoneCheckOut'

function Checkout() {
    const {cart, setCart} = useCart()
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(40)
    const [showPhoneInfo, setShowPhoneInfo] = useState(false)
    const [contact, setContact] = useState({customerMail: ""})
    const [customerMail, setCustomerMail] = useState("")
    const [shipping, setShipping] = useState({firstName: "", lastName: "", address: "", postalCode: "", city: "", phoneNumber: ""})
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [amountPaid, setAmountPaid] = useState(0)
    const [showMessage, setShowMessage] = useState(false)
    const [outOfStockMessage, setOutOfStockMessage] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async(event) => {
        event.preventDefault();

        const outOfStockItems = cart.filter(item => item.qty == 0)
        if(outOfStockItems.length > 0){
            setOutOfStockMessage(true)
            return
        }
        const products = cart.map(item => ({
            productId: item._id,
            name: item.productName,
            quantity: item.quantity,
            price: item.price
        }))
        // let rest = totalAmount - amountPaid
        const orderData={
            contact,
            shipping,
            products,
            totalAmount,
            amountPaid,
            status: "pending"
        }
        try{
            console.log("Submitting order data:", orderData)  
            console.log("Before making the request") 
            const response = await fetch("http://localhost:3003/orders/addOnlineOrder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(orderData),
            })
            if(response.status === 200){
                console.log("order added: ", response.data)
                setShowMessage(true)
                setTimeout(() => setShowMessage(false), 2000) 
                localStorage.removeItem("cart")
                setCart([])
                setTimeout(() => navigate("/products"), 2400)
            }else{
                console.log("failed")
            }
        
            const data = await response.json()
            console.log("Response received: ", data)
        }catch(error){
            console.log("Error: ", error)
        }
        
        
    }

    useEffect(() => {
        setContact({customerMail: customerMail})
        setShipping({firstName: firstName, lastName: lastName, address: address, postalCode: postalCode, city: city, phoneNumber: phoneNumber, shippingPrice: shippingPrice})
        calculateTotal()
        CalculateTotalQuantity()
    }, [cart, customerMail, firstName, lastName, address, postalCode, city, phoneNumber, shippingPrice])

    const calculateTotal = () => {
        const res = cart.reduce((totalAmount, currentValue) => totalAmount +(currentValue.price * currentValue.quantity), 0)
        setTotalAmount(res)
    }

    const CalculateTotalQuantity = () => {
        const Qty = cart.reduce((totalQty, currentValue) => totalQty + (currentValue.quantity), 0)
        setTotalQty(Qty)
    }

  return (
    <div className=''>
        {/* NavBar */}
        <CheckOutNav/>
        <div className='lg:flex '>
            {/* Client Info */}
            <div className='lg:w-7/12 w-11/12 mx-auto lg:mx-0 lg:border-r border-gray-300 lg:pb-20 pb-6'>
                <form onSubmit={handleSubmit}  className='lg:w-9/12 w-11/12 m-auto mt-10 flex flex-col gap-4'>
                    {/* Contact */}
                    <div>
                        <h2 className='mb-2 text-2xl font-medium text-gray-900'>Contact</h2>
                        <input
                            className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-700 focus:border-gray-700 `   }
                            type="email" name="customerMail" id="customerMail"
                            placeholder='name@example.com'
                            value={customerMail}
                            onChange={(e) => setCustomerMail(e.target.value)}
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
                            {/* Country */}
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
                                        type="text" name="firstName" id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder='First name' required 
                                    />
                                </div>
                                {/* Nom */}
                                <div className='w-1/2'>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   }
                                        type="text" name="lastName" id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder='Last name' required 
                                    />
                                </div>
                            </div>
                            {/* Address */}
                            <div>
                                <input
                                    className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   }
                                    type="text" name="address" id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder='Address' required 
                                />
                            </div>
                            <div className='flex gap-6'>
                                {/* postal code */}
                                <div className='w-1/2'>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   } 
                                        type="text" name="postalCode" id="postalCode"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        placeholder='Postal code (optional)' 
                                    />
                                </div>
                                {/* city */}
                                <div  className='w-1/2'>
                                    <input
                                        className={` bg-gray-50 border  text-gray-900 text-sm rounded-lg  block w-full px-2.5 py-3 outline-none  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   } 
                                        type="text" name="city" id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder='City' required 
                                    />
                                </div>
                            </div>
                            {/* phone number */}
                            <div className={`flex justify-between items-center pr-3 bg-gray-50 border  text-gray-900 text-sm rounded-lg  w-full  border-gray-300 focus:ring-gray-500 focus:border-gray-500 `   }>
                                <input
                                    className='h-full w-full px-2.5 py-3 outline-none'
                                    type="tel" name="PhoneNumber" id="PhoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    pattern="^0[67][0-9]{8}$"
                                    placeholder='Phone number: +212xxxxxxxxx' required 
                                />
                                <div className='relative lg:flex hidden' onMouseEnter={() => setShowPhoneInfo(true)} onMouseLeave={() => setShowPhoneInfo(false)}>
                                    <CircleHelp className='text-gray-600' />
                                    {showPhoneInfo && (
                                            <div className='absolute bg-gray-800 text-white w-32 bottom-7  p-2 rounded-lg'>In case we need to contact you about your order</div>
                                        )}
                                </div>
                                <div className='relative lg:hidden' onClick={() => setShowPhoneInfo(!showPhoneInfo)}>
                                    <CircleHelp className='text-gray-600' />
                                    {showPhoneInfo && (
                                            <div className='absolute bg-gray-800 text-white w-32 bottom-7 right-0  p-2 rounded-lg'>In case we need to contact you about your order</div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <CheckOutInfo shippingPrice={shippingPrice}/>
                    <button  className='bg-black font-semibold px-2.5 py-3 lg:flex hidden justify-between items-center  border mt-3  text-white text-lg rounded-lg  w-full text-center'>
                        <p className=' w-full'>Confirm the order</p> 
                    </button>
                    <PhoneCheckOut cart={cart} totalAmount={totalAmount} totalQty={totalQty} />
                </form>
                {outOfStockMessage && (
                    <div className='text-red-500 bg-white shadow absolute top-0 p-2'>One or more items in your cart are out of stock!</div>
                )}
                {showMessage && <SucessMessage message="Your order has been successfully passed!" />}
            </div>
            {/* Cart Info */}
            <ChecOutCart cart={cart} totalAmount={totalAmount} totalQty={totalQty}  />
        </div>
    </div>
  )
}

export default Checkout
