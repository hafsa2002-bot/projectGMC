import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SecuritySettings() {
    const [user, setUser] = useState({})
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errorMessage, setErrorMessage] = useState({isSomethingWrong: false, message: ""})

    const token = localStorage.getItem("token");
    let userRole = null;

    const fetchData = () => {
        axios.get("http://localhost:3003/users/data", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setUser(response.data))
            .catch(error => {
                console.log("Error: ", error)
                if (error.response && error.response.status === 401) {
                    // Unauthorized, likely token expired or invalid
                    handleLogout()
                }
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handlePasswordChange = (e) => {
        e.preventDefault()
        if(!oldPassword){
            setErrorMessage({isSomethingWrong: true, message: "Enter the current password"})
            return
        }
        if(newPassword !== passwordConfirmation){
            setErrorMessage({isSomethingWrong: true, message:"Passwords do not match."})
            return
        } 
    }
  return (
    <>
        <p  className='w-10/12 text-xl font-medium mb-5 pb-2.5 px-1 ml-10 mt-7 text-gray-400 font-poppins border-b-2  '>Change you password</p>
        <form onSubmit={handlePasswordChange} className='w-10/12 ml-10 mt-6'>
            <div className='mb-4'>
                <label className='text-gray-600 font-semibold' htmlFor="oldPassword">Current Password</label>
                <input 
                    type="password" 
                    name="oldPassword" 
                    id="oldPassword" 
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className=" w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                />
            </div>
            <div className='mb-4'>
                <label className='text-gray-600 font-semibold' htmlFor="newPassword">New Password</label>
                <input 
                    type="password" 
                    name="newPassword" 
                    id="newPassword" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className=" w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                />
            </div>
            <div className='mb-4'>
                <label className='text-gray-600 font-semibold' htmlFor="passwordConfirmation">Confirm New Password</label>
                <input 
                    type="password" 
                    name="passwordConfirmation" 
                    id="passwordConfirmation" 
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className=" w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                />
            </div>
            <div className='w-full flex justify-end mt-8'>
                <button
                    type="submit"
                    disabled={!oldPassword || !newPassword || !passwordConfirmation}
                    className='cursor-pointer text-white font-semibold bg-blue-500 px-4 py-2 rounded-lg'>
                    Save Changes
                </button>
            </div>
        </form>
    </>
  )
}

export default SecuritySettings
