import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Check } from 'lucide-react'
import SpinnerLoader from '../../SpinnerLoader'
import { jwtDecode } from 'jwt-decode'
import { useCart } from '../../CartContext'

function BusinessInfo() {
    const [store, setStore] = useState({})
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    // const [currency, setCurrency] = useState("")
    const { currency, setCurrency } = useCart()
    const [message, setMessage] = useState(false)
    const [loading, setLaoding] = useState(true)
    const [showSubmitInfo, setShowSubmitInfo] = useState(false)
    const token = localStorage.getItem("token");
    let userRole = null;
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }

    const fetchData = () => {
        axios.get("http://localhost:3003/store-infos")
            .then(response => {
                const d = response.data
                setStore(d)
                setAddress(d.address)
                setCity(d.city)
                setCountry(d.country)
                setCurrency(d.currency)
                setLaoding(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLaoding(false)
            })
    }

    const submitStoreInfo = (e) => {
        e.preventDefault()

        const data = { address, city, country, currency }
        axios.patch('http://localhost:3003/add-store-infos',
            data,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            }
        )
            .then(response => {
                console.log("business info updated: ", response.data)
                setMessage(true)
                setTimeout(() => setMessage(false), 2500)
                // fetchData()
                setTimeout(() =>window.location.reload(), 2700)
                
            })
            .catch(error => console.log("error: ", error))
    }

    useEffect(() => {
        fetchData()
    }, [])
  return (
    <>
        {
            loading
            ?(
                <SpinnerLoader/>
            ):(
                <form onSubmit={submitStoreInfo} className='w-10/12 ml-10 mt-18'>
                    {/* address */}
                    <div className='mb-4'>
                        <label className='text-gray-600 font-semibold' htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            name="address" 
                            id="address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Address'
                            className=" w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                        />
                    </div>
                    {/* city */}
                    <div className='mb-4'>
                        <label className='text-gray-600 font-semibold' htmlFor="address">City</label>
                        <input 
                            type="text" 
                            name="city" 
                            id="city" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='City'
                            className=" w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                        />
                    </div>
                    {/* country */}
                    <div className='mb-4'>
                        <label className='text-gray-600 font-semibold' htmlFor="country">Country</label>
                        <select
                            name="country"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="">Select a country</option>
                            <option value="Morocco">Morocco</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </select>
                    </div>
                    {/* currency */}
                    <div>
                        <label className='text-gray-600 font-semibold' htmlFor="currency">Currency</label>
                        <select 
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                                <option value="MAD">MAD - Moroccan Dirham</option>
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - British Pound</option>
                                <option value="CAD">CAD - Canadian Dollar</option>
                                <option value="AUD">AUD - Australian Dollar</option>
                                <option value="JPY">JPY - Japanese Yen</option>
                                <option value="CNY">CNY - Chinese Yuan</option>
                                <option value="INR">INR - Indian Rupee</option>
                        </select>
                    </div>
                    <div className='w-full flex justify-end mt-8'>
                        {
                            userRole === "admin" 
                            ?(
                                <button className='text-white font-semibold bg-blue-500 px-4 py-2 rounded-lg'>
                                    Save changes
                                </button>
                            ):(
                                <div 
                                    className='text-white font-semibold bg-gray-400 px-4 py-2 rounded-lg'
                                    onClick={() => {
                                        setShowSubmitInfo(true)
                                        setTimeout(() => setShowSubmitInfo(false), 2500)
                                    }}
                                >
                                    Save changes
                                </div>
                            )
                        }
                    </div>
                    {message && 
                        <div className='w-1/4 flex gap-2 justify-center items-center py-2 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-white border border-gray-300  '>
                            <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center' ><Check size={14} /></div>
                            <p>profile updated successfully</p> 
                        </div>
                    }
                    {showSubmitInfo && 
                        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-red-300 text-white text-center py-2 z-50">
                            <p className="font-semibold">Only administrators can update this information.</p>
                        </div>
                    }
                </form>
            )
        }
    </>
  )
}

export default BusinessInfo
