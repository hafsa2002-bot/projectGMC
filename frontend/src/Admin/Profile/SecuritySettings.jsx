import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Check, X } from 'lucide-react'

function SecuritySettings() {
    const [user, setUser] = useState({})
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [errorMessage, setErrorMessage] = useState({isSomethingWrong: false, message: ""})
    const [successMessage, setSuccessMessage] = useState("") 

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

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        setErrorMessage({ isSomethingWrong: false, message: "" });
        setSuccessMessage("");

        if (!oldPassword) {
            setErrorMessage({ isSomethingWrong: true, message: "Enter the current password" });
            setTimeout(() => {
                setErrorMessage({ isSomethingWrong: false, message: "" });
            }, 2000)
            return;
        }

        if (newPassword !== passwordConfirmation) {
            setErrorMessage({ isSomethingWrong: true, message: "Passwords do not match." });
            setTimeout(() => {
                setErrorMessage({ isSomethingWrong: false, message: "" });
            }, 2000)
            return;
        }

        try {
            const response = await axios.patch(
                'http://localhost:3003/change-password',
                { currentPassword: oldPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // If successful, show success message
            setSuccessMessage(response.data.message);
            setErrorMessage({ isSomethingWrong: false, message: "" });
            setTimeout(() => {
                setSuccessMessage("");
            }, 2000);
            window.location.reload()

        } catch (error) {
            console.error('Error during password change: ', error);
            if (error.response) {
                console.error('Backend error details:', error.response.data);
                // Check if the error is from the backend
                if (error.response.status === 400) {
                    setErrorMessage({ isSomethingWrong: true, message: error.response.data.message });
                } else if (error.response.status === 500) {
                    setErrorMessage({ isSomethingWrong: true, message: 'Server error. Please try again later.' });
                } else {
                    setErrorMessage({ isSomethingWrong: true, message: 'Unexpected error. Please try again.' });
                }
            }
            setTimeout(() => {
                setErrorMessage({ isSomethingWrong: false, message: "" });
            }, 2000)
        }
    };
   
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
                    // disabled={!oldPassword || !newPassword || !passwordConfirmation}
                    className='cursor-pointer text-white font-semibold bg-blue-500 px-4 py-2 rounded-lg'>
                    Save Changes
                </button>
            </div>
        </form>
        {/* Show error message if something went wrong */}
        {errorMessage.isSomethingWrong && (
            <div className="flex justify-center items-center gap-2 border-gray-300  text-black mt-2 fixed top-0 left-1/2 transform -translate-x-1/2 w-11/12 lg:w-1/4 bg-red-50 px-4 py-2 rounded-md shadow-md z-50 text-center">
                <div className='w-6 h-6 rounded-full bg-red-600 text-white flex  justify-center items-center'><X size={17} /></div>
                {errorMessage.message}
            </div>
        )}

        {/* Show success message if password changed successfully */}
        {successMessage && (
            <div className="flex justify-center items-center gap-2 border-gray-300  text-black mt-2 fixed top-0 left-1/2 transform -translate-x-1/2 w-11/12 lg:w-1/4 bg-green-100 px-4 py-2 rounded-md shadow-md z-50 text-center">
                <div  className='w-6 h-6 rounded-full bg-green-800 text-white flex  justify-center items-center'><Check  size={17}/></div>{successMessage}
            </div>
        )}
    </>
  )
}

export default SecuritySettings
