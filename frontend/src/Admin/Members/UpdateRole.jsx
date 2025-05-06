import { ChevronDown } from 'lucide-react'
import React,{useState, useEffect} from 'react'
import axios from 'axios'

function UpdateRole({user, members, setMembers}) {
    const [showRoleOptions, setShowRoleOptions] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    const updateRole = (newRole) => {
        axios.patch(`${apiUrl}/update-role/${user._id}`,
            {role: newRole},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }
            }
        )
            .then(response => {
                console.log("role updated", response.data)
                const updatedMembers = members.map((m) =>
                    m._id === user._id ? { ...m, role: newRole } : m
                );

                setMembers(updatedMembers);
            })
            .catch(error => console.log("Error: ", error))
    }
  return (
    <div>
        <button 
            className="relative z-10 cursor-pointer text-white m-auto lg:m-0 bg-blue-500 hover:bg-blue-700 lg:px-4 px-2 text-base py-2 rounded-xl flex items-center gap-1 transition-all duration-200"
            onClick={() => setShowRoleOptions(!showRoleOptions)}
        >
            Update <div className='lg:flex hidden'>Role </div><ChevronDown className="w-5 h-5" />
            {showRoleOptions && (
                <div className='absolute top-10 w-full right-0 overflow-hidden rounded-lg text-gray-600 bg-white  border border-gray-300'>
                    <div
                        onClick={() => updateRole("member")} 
                        className=' py-1.5 hover:bg-gray-100 cursor-pointer  border-b border-gray-300'
                    >
                        Member 
                    </div>
                    <div
                        onClick={() => updateRole("admin")} 
                        className='py-1.5 hover:bg-gray-100 cursor-pointer'
                    >
                        Admin
                    </div>
                </div>
            )}
        </button>
    </div>
  )
}

export default UpdateRole
