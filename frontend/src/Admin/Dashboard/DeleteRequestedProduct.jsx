import React from 'react'
import axios from 'axios'
import { Info } from 'lucide-react'

function DeleteRequestedProduct({setShowDelete, name, id}) {
    const deleteRequestedProduct = (productID) => {
            axios.delete(`http://localhost:3003/admin/dashboard/delete-requested-product/${productID}`,
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` 
                }}
            )
                .then((response) => console.log("requested product deleted:", response.data))
                .catch(error => console.log("error: ", error))
        }
  return (
    <div className='w-screen h-screen z-50 top-0 right-0 fixed flex justify-center items-center ' style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        {/* <div className=' bg-white w-1/3 opacity-100 px-16 py-6 rounded-md shadow-md flex flex-col items-center gap-5'>
            <div className='flex justify-center items-center  rounded-full w-12 h-12 bg-red-100'>
                <div className='flex justify-center items-center rounded-full bg-red-200 w-9 h-9 '>
                    <Info className="relative text-red-600 bg-transparent w-7 h-7 " />
                </div>
            </div>
            <div className='text-center'>
                <p className='text-2xl font-semibold mb-1'>Confirm delete</p>
                <p className='text-gray-400'>Are you sure you want to delete <span className='text-gray-600'>{name}</span>?</p>
            </div>
            <div className='flex gap-4'>
                confirm the delete 
                <button 
                    onClick={() => {
                        deleteRequestedProduct(id)
                        setShowDelete(false)}}
                    className=' cursor-pointer px-5 py-3 text-red-600 text-base'>Delete</button>
                cancel the delete
                <button
                    onClick={() => {
                    
                        setShowDelete(false)}}
                    className='cursor-pointer bg-blue-600 text-white  px-5 py-3 text-base rounded-lg'>Cancel</button>
            </div>
        </div> */}
        <div className='bg-white px-16 py-6  max-w-5/12 rounded-md shadow-md flex flex-col justify-center items-center gap-5 '>
            <div className='flex justify-center items-center  rounded-full w-12 h-12 bg-red-100 '>
                <div className='flex justify-center items-center rounded-full bg-red-200 w-9 h-9 '>
                    <Info className="relative text-red-600 bg-transparent w-7 h-7 " />
                </div>
            </div>
            <div className='text-center flex flex-col justify-center items-center '>
                <p className='text-2xl font-semibold mb-1 '>Confirm delete</p>
                <p className='text-gray-500 max-w-9/12  break-words'>Are you sure you want to delete <span className='text-gray-600'>{name}</span>?</p>
            </div>
            <div className='flex gap-4 '>
                {/* confirm the delete */}
                <button 
                    onClick={() => {
                        deleteRequestedProduct(id)
                        setShowDelete(false)}}
                    className=' cursor-pointer px-5 py-3 text-red-600 text-base'>Delete</button>
                {/* cancel the delete */}
                <button
                    onClick={() => {
                        // setPopUp(false)
                        setShowDelete(false)}}
                    className='cursor-pointer bg-blue-600 text-white  px-5 py-3 text-base rounded-lg'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteRequestedProduct
