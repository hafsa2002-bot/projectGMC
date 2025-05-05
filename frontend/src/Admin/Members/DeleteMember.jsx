import { Info, Trash2 } from 'lucide-react'
import React from 'react'
import axios from 'axios'

function DeleteMember({user, setDeletePopUp, members, setMembers}) {
    const  deleteUser = () => {
        axios.delete(`http://localhost:3003/delete-user/${user._id}`,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            }}
        )
            .then(response => {
                console.log("user deleted: ", response.data)
                setMembers(members.filter(mbr => mbr._id != user._id))
            })
            .catch(error => console.log("Error: ", error))
    }
  return (
    <div className='w-screen h-screen z-50 top-0 right-0 fixed flex justify-center items-center  bg-black/30 ' >
            <div className='bg-white px-16 py-6 lg:w-1/3 w-10/12 shadow-md  rounded-md flex flex-col justify-center items-center gap-5'>
                <div className='flex justify-center items-center  rounded-full w-12 h-12 bg-red-100 '>
                    <div className='flex justify-center items-center rounded-full bg-red-200 w-9 h-9 '>
                        <Info className="relative text-red-600 bg-transparent w-7 h-7 " />
                    </div>
                </div>
                <div className='text-center flex flex-col justify-center items-center '>
                    <p className='text-2xl font-semibold mb-1 '>Confirm delete</p>
                    <p className='text-gray-500 lg:max-w-9/12  break-words'>Are you sure you want to delete <span className='text-gray-600'>{user.name}</span>?</p>
                </div>
                <div className='flex gap-4 '>
                    {/* confirm the delete */}
                    <div 
                        onClick={() => {
                            deleteUser()
                            setDeletePopUp(false)}}
                        className=' cursor-pointer px-5 py-3 text-red-600 text-base'>Delete</div>
                    {/* cancel the delete */}
                    <div
                        onClick={() => setDeletePopUp(false)}
                        className='cursor-pointer bg-blue-600 text-white  px-5 py-3 text-base rounded-lg'>Cancel</div>
                </div>
            </div>
        </div>
  )
}

export default DeleteMember
