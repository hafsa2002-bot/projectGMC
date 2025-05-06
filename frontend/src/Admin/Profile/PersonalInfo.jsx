import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Check, UserRound } from 'lucide-react';
import SpinnerBlue from '../SpinnerBlue';
import SpinnerLoader from '../../SpinnerLoader';

function PersonalInfo() {
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [photo, setPhoto] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState(false)
    const token = localStorage.getItem("token");
    let userRole = null;
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchData = () => {
        axios.get(`${apiUrl}/users/data`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // console.log("User data from backend:", response.data)
                setUser(response.data)
                setName(response.data.name)
                setEmail(response.data.email)
                setPhoto(response.data.photo)
                setPhoneNumber(response.data.phoneNumber)
                setLoading(false)
            })
            .catch(error => {
                console.log("Error: ", error)
                setLoading(false)
                if (error.response && error.response.status === 401) {
                    // Unauthorized, likely token expired or invalid
                    handleLogout()
                }
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleProfileChange = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("phoneNumber", phoneNumber)
        /*
        if (photo instanceof File) {
            formData.append("photo", photo) 
        }
            */
        if (photo instanceof File) {
            formData.append("photo", photo);
        } else if (typeof photo === "string" && photo !== "") {
            formData.append("photo", photo); // send existing photo path to retain it
        }
        axios.patch(`${apiUrl}/update-user-info`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            }
        )
            .then(response => {
                console.log("profile updated: ", response.data)
                setMessage(true)
                setTimeout(() => setMessage(false), 2500)
                setTimeout(() =>window.location.reload(), 2700)
                
            })
            .catch(error => console.log("error: ", error))
    }

    const deletePicture = () => {
        const formData = new FormData();
        formData.append("photo", "");
        axios.patch(`${apiUrl}/update-user-info`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            }
        )
            .then(response =>{ 
                console.log("photo deleted : ", response.data)
                setPhoto("")
                fetchData()
            })
            .catch(error => console.log("Error: ", error))
    }
  return (
    <>
        {
            loading
            ?(
                <SpinnerLoader/>
            ):(
                <form onSubmit={handleProfileChange} className='w-10/12 ml-10 mt-18'>
                    <div>
                        {/* photo de profile */}
                        <div className='flex items-center gap-5 mt-2'>
                            <div className=''>
                                {
                                    user.photo  
                                    ?(
                                        <div className='w-20 h-20 overflow-hidden rounded-full border border-gray-300'>
                                            <img className='w-full h-full' src={`${apiUrl}${user.photo}`} alt="" />
                                        </div>
                                    ):(
                                        <div className='w-16 h-16 rounded-full border border-gray-300 text-gray-500 bg-gray-100 flex justify-center items-center'>
                                            <UserRound size={37} />
                                        </div>
                                    )
                                }
                            </div>
                            <div className='flex items-center gap-2'>
                                <label  htmlFor="photo" className='text-white bg-blue-500 text-sm px-2.5 py-1 rounded-lg '>update picture</label>
                                <input id='photo' name='photo' className='hidden' accept='image/*' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                                <div onClick={() => deletePicture()} className='text-red-600 cursor-default bg-gray-100 text-sm rounded-lg px-2.5 py-1 border border-gray-300'>Delete picture</div>
                            </div>
                        </div>
                        {photo && <p className=' ml-16 text-sm text-gray-500'>{photo.name}</p>}
                    </div>
                    {/* user name */}
                    <div className='mb-4 mt-5'>
                        <label className='text-gray-600 font-semibold' htmlFor="userName">User name</label>
                        <input 
                            type="text" 
                            name="userName" 
                            id="userName" 
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder='user name'
                            required
                            className=" w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                        />
                    </div>
                    {/* email */}
                    <div className='mb-4'>
                        <label className='text-gray-600 font-semibold' htmlFor="email">User email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="emailr" 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder='user email'
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                        />
                    </div>
                    {/* phone number */}
                    <div className='mb-4'>
                        <label className='text-gray-600 font-semibold' htmlFor="phoneNumber">Phone number</label>
                        <input 
                            type="tel" 
                            name="phoneNumber" 
                            id="phoneNumber"
                            pattern="^0[67][0-9]{8}$" 
                            value={phoneNumber}
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            placeholder='phone number: 0712345678'
                            className=" w-full p-3 mt-1 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"  
                        />
                    </div>
                    <div className='w-full flex justify-end mt-8'>
                        <button className='text-white font-semibold bg-blue-500 px-4 py-2 rounded-lg'>
                            Save changes
                        </button>
                    </div>
                    {message && 
                        <div className='w-1/4 flex gap-2 justify-center items-center py-2 fixed top-2 left-1/2 transform -translate-x-1/2 text-black text-center rounded-lg bg-white border border-gray-300  '>
                            <div className='w-5 h-5 bg-green-600 text-white rounded-full flex justify-center items-center' ><Check size={14} /></div>
                            <p>profile updated successfully</p> 
                        </div>
                    }
                </form>
            )
        }
    </>
  )
}

export default PersonalInfo
