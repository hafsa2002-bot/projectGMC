import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ProfilePage() {
    const [user, setUser] = useState({})
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
    
  return (
    <div className='font-poppins mb-20'>
        <p className='text-3xl font-medium mb-7 ml-7 mt-5 text-blue-500 font-poppins '>Profile</p>
        <div className='bg-white w-8/12 ml-7 px-8 py-7 border border-gray-300 rounded-lg'>
            <form className='w-10/12'>
                <div>
                    <p className='text-lg text-gray-600 font-semibold'>Profile picture</p>
                    <div className='flex items-center gap-3 mb-5'>
                        <div className='w-20 h-20 rounded-full border border-gray-300'>
                            <img  />
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='text-white bg-blue-500 px-2.5 py-2 rounded-lg '>Change picture</div>
                            <div className='text-red-600 bg-gray-100 rounded-lg px-2.5 py-2 border border-gray-300'>Delete picture</div>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="userName">Profile name</label>
                    <input 
                        type="text" 
                        name="userName" 
                        id="userName" 
                        value={user.name}
                        disabled
                        className="bg-gray-100 w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                    />
                </div>

            </form>
            
        </div>
    </div>
  )
}

export default ProfilePage
