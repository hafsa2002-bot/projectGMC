import { ArrowLeft, ChevronLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddMember() {
    const navigate = useNavigate()
  return (
      <div className=''>
        {/* Title */}
        <h2 onClick={() => navigate(-1)} className="text-2xl cursor-pointer font-semibold text-gray-800 flex items-center ml-7 gap-1 mt-5 mb-10"> <ArrowLeft/>Add New Member</h2>
        <form className="bg-white w-10/12 ml-7 p-6 rounded-xl shadow-md border border-gray-200 font-poppins">

            {/* Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block  font-medium text-gray-700">Name</label>
                <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Enter member's full name" 
                required 
                />
            </div>

            {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block  font-medium text-gray-700">Email</label>
                <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                placeholder="Enter member's email" 
                required 
                />
            </div>

            {/* Role */}
            <div className="mb-4">
                <label htmlFor="role" className="block  font-medium text-gray-700">Role</label>
                <select 
                id="role" 
                name="role" 
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500" 
                required
                >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                Add Member
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddMember
