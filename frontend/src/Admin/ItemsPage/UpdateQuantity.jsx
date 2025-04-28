import { Info, X } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UpdateQuantity({setUpdateQty, item, setMessage}) {
  const navigate = useNavigate()
  const [updatedQty, setUpdatedQty] = useState("")
  const [selectedButton, setSelectedButton] = useState('increase')
  const [errorMessage, setErrorMessage] = useState(false)
  const newQty = selectedButton === "increase"
    ? item.qty + updatedQty
    : item.qty - updatedQty

  const handleUpdateQty = async () => {
    // event.preventDefault();
    if(newQty < 0 || !updatedQty) {
      setErrorMessage(true)
      setTimeout(() => setErrorMessage(false), 3000)
      return 
    }
    if (updatedQty > item.qty && selectedButton === 'reduce') {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 3000)
      return;
    }
    
    try{
      const response = await axios.patch(`http://localhost:3003/admin/items/update/${item._id}`, 
        {newQty: newQty},
        {headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
      })
      setMessage(true)
      setTimeout(() => setMessage(false), 3000)
      setUpdateQty(false)
      window.location.reload();
      console.log('stock updated: ', response.data)
    }catch(error){
      console.log('Error updating quantity: ', error)
    } 
  }
  return (
    <div className="bg-black w-screen h-screen fixed z-50 top-0 left-0 flex justify-center items-center"  style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
        <div className='bg-white flex flex-col rounded-xl py-8 p-14 gap-4 w-6/12  '>
            <div >
                    <p className='text-2xl font-semibold text-black'>Update Quantity</p>
                    <p className='text-gray-600 text-base'>Increase or reduce stock of your product</p>
                </div>
            <div className='flex justify-center gap-7 my-5'>
              {/* increase quantity */}
              <div className='flex gap-2'>
                <input
                  checked={selectedButton === 'increase'}
                  onChange={(event) => setSelectedButton(event.target.value)}  
                  type="radio" name="update_qty" id="" className='w-5'  value="increase"  />
                <label htmlFor='increase' className='text-black text-lg font-semibold'>Increase stock</label>
              </div>
              {/* reduce quantity */}
              <div className='flex gap-2'>
                <input
                  checked={selectedButton === 'reduce'}
                  onChange={(event) => setSelectedButton(event.target.value)} 
                  type="radio" name="update_qty" id="" className='w-5' value="reduce" />
                <label for="reduce" className='text-black text-lg font-semibold'>Reduce stock</label>
              </div>
            </div>

            <div className='flex gap-5'>
              {/* updated quantity */}
                <div  className='flex flex-col gap-2 w-1/3'>
                    <label htmlFor="" className='text-gray-700 font-medium text-lg'>Quantity</label>
                    <input
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setUpdatedQty("");
                          } else {
                            setUpdatedQty(Number(value));
                          }
                        }}
                        value={updatedQty === "" ? "" : updatedQty}
                        type="number" 
                        name="" 
                        id=""
                        min="0"
                        className='bg-white border shadow  text-gray-900 text-sm rounded-lg  block w-full p-2.5 outline-none  border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    />
                </div>
                {/* unit price */}
                <div  className='flex flex-col gap-2 w-1/3'>
                    <label htmlFor="" className='text-gray-700 font-medium text-lg'>Price </label>
                    <div className='bg-gray-50 w-full border flex justify-between shadow  text-gray-900 text-sm rounded-lg  p-2.5 outline-none  border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
                      <p> {item.price} </p>
                      <p className='font-semibold'>MAD</p>
                    </div>
                </div>
                {/* total */}
                <div  className='flex flex-col gap-2 w-1/3'>
                    <label htmlFor="" className='text-gray-700  font-medium text-lg'>total</label>
                    <div className='bg-gray-50 w-full border flex justify-between shadow  text-gray-900 text-sm rounded-lg  p-2.5 outline-none  border-gray-300 focus:ring-blue-500 focus:border-blue-500'>
                      <p> {item.price * updatedQty} </p>
                      <p className='font-semibold'>MAD</p>
                    </div>
                </div>

          </div>
          <div className='flex text-lg gap-2'>
            <p className='text-black font-semibold'>Total Quantity:</p>
            {/* <p> {item.qty + updatedQty}</p> */}
            <p className='text-black'> {newQty} </p>
          </div>
          {errorMessage && (
            <div className='  text-red-700 bg-red-50 rounded-lg px-3 py-1 flex items-center gap-2 w-full border'>
                <div className='w-6 h-6 rounded-full border flex justify-center items-center bg-red-700 text-white '><X size={18} /></div>
                <p className=''>Please, enter a valid number!</p>
            </div>
          )}
          <div className='flex items-center gap-3'>
            <button
              onClick={() => handleUpdateQty()} 
                className='cursor-pointer text-white text-base font-semibold text-center bg-blue-600 bordertext-white rounded-lg  block  py-2.5 px-7 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500' 
            >
                Save
            </button>
            <div
              onClick={() => setUpdateQty(false)}  
              className='text-red-600 cursor-pointer font-semibold text-base'>
              Cancel
            </div>
          </div>
        </div>
    </div>
  )
}

export default UpdateQuantity
