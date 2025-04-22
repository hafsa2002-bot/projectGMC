import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BusinessInfo() {
    const [store, setStore] = useState({})
    const token = localStorage.getItem("token");
    let userRole = null;

    const fetchData = () => {
        axios.get("http://localhost:3003/store-infos")
            .then(response => setStore(response.data))
            .catch(error => console.log("Error: ", error))
    }

    const submitStoreInfo = () => {

    }

    useEffect(() => {
        fetchData()
    }, [])
  return (
    <form onSubmit={submitStoreInfo} className='w-10/12 ml-10 mt-18'>
        {/* address */}
        <div className='mb-4'>
            <label className='text-gray-600 font-semibold' htmlFor="address">Address</label>
            <input 
                type="text" 
                name="adrress" 
                id="address" 
                value={store.address}
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
                value={store.city}
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
                value={store.country}
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
                value={store.currency}
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
            <button className='text-white font-semibold bg-blue-500 px-4 py-2 rounded-lg'>
                Save changes
            </button>
        </div>
    </form>
  )
}

export default BusinessInfo
