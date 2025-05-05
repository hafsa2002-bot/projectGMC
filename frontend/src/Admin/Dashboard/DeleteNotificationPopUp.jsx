import { Info } from 'lucide-react'
import React from 'react'
import axios from 'axios'

function DeleteNotificationPopUp({notificationId, setShowDeleteNotificationPopUp, notifications, setNotifications}) {
    const deleteRequestedProduct = (id) => {
            axios.delete(`http://localhost:3003/delete-notification/${id}` )
                .then((response) => {
                    const deletedNotification = response.data
                    console.log("notification deleted:", deletedNotification)
                    setNotifications(notifications.filter(notif => notif._id !== notificationId))
                })
                .catch(error => console.log("error: ", error))
        }
  return (
    <div className='w-screen h-screen  z-50 top-0 right-0 fixed flex justify-center items-center  bg-black/50 '  >
        <div className='bg-white px-16 py-6 lg:w-1/3 w-10/12 shadow-md  rounded-md flex flex-col justify-center items-center gap-5'>
            <div className='flex justify-center items-center  rounded-full w-12 h-12 bg-red-100 '>
                <div className='flex justify-center items-center rounded-full bg-red-200 w-9 h-9 '>
                    <Info className="relative text-red-600 bg-transparent w-7 h-7 " />
                </div>
            </div>
            <div className='text-center flex flex-col justify-center items-center '>
                <p className='text-2xl font-semibold mb-1 '>Confirm delete</p>
                <p className='text-gray-500 lg:max-w-9/12  break-words'>Are you sure you want to delete this notification?</p>
            </div>
            <div className='flex gap-4 '>
                {/* confirm the delete */}
                <div 
                    
                    onClick={() => {
                        deleteRequestedProduct(notificationId)
                        setShowDeleteNotificationPopUp(false)}}
                        
                    className=' cursor-pointer px-5 py-3 text-red-600 text-base'>Delete</div>
                {/* cancel the delete */}
                <div
                    
                    onClick={() => {
                        setShowDeleteNotificationPopUp(false)}
                    }
                    
                    className='cursor-pointer bg-blue-600 text-white  px-5 py-3 text-base rounded-lg'>Cancel</div>
            </div>
        </div>
    </div>
  )
}

export default DeleteNotificationPopUp
