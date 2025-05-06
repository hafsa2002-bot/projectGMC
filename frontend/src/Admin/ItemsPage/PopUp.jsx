import axios from 'axios'
import { Info } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function PopUp({setPopUp, name, id, setShowOptions, products, setProducts}) {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const deleteItem = () => {
        axios.delete(`${apiUrl}/admin/item/${id}`,
            {headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            }}
        )
            .then( (response) => {
                console.log(`the product: ${response.data} deleted`)
                setPopUp(false);
                // window.location.reload()
                // navigate("/admin/items")
                setProducts(products.filter(produit => produit._id !== id))

            }
            )
            .catch(error => console.log(error))
    }
  return (
    <div className='w-screen h-screen  top-0 right-0 fixed flex justify-center items-center  modal-overlay'>
        <div className=' bg-white opacity-100 px-16 py-6 rounded-md shadow-md flex flex-col items-center gap-5'>
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
                {/* confirm the delete */}
                <button 
                    onClick={() => {
                        deleteItem()
                        setShowOptions(false)}}
                    className=' cursor-pointer px-5 py-3 text-red-600 text-base'>Delete</button>
                {/* cancel the delete */}
                <button
                    onClick={() => {
                        setPopUp(false)
                        setShowOptions(false)}}
                    className='cursor-pointer bg-blue-600 text-white  px-5 py-3 text-base rounded-lg'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default PopUp
