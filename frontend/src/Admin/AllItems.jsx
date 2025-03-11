import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { EllipsisVertical, Eye, Image, Info, PenLine, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SpinnerLoader from '../SpinnerLoader'
import PopUp from './PopUp'


function AllItems() {
    const [items, setItems] = useState([])
    const [showOptions, setShowOptions] = useState(false);
    const [popUp, setPopUp] = useState(false)

    const getItems = () => {
        axios.get("http://localhost:3003/admin/items/list")
        .then(response => setItems(response.data))
        .catch(error => console.log("Error: ", error))
    }

    useEffect(() => {
        getItems()
    }, [items])

    if(!items) return <SpinnerLoader/>

  return (
    <div>
        <div class=" bg-white border border-gray-300 mt-8 overflow-hidden   shadow-md sm:rounded-lg">
            {/* <div className='flex gap-5 mx-6 mt-3 mb-7 border-b border-gray-300'>
                <div className='border-b-2 text-sm w-20 pb-1 border-blue-600 flex items-center justify-center gap-3'>
                    <p className='font-semibold text-blue-600'>All</p>
                    <div className='px-2 py-0.5 flex justify-center items-center rounded-2xl bg-blue-100 text-blue-600'>{items.length}</div>
                </div>
                <div className=' text-sm  pb-1 border-blue-600 flex items-center justify-center gap-3'>
                    <p className='font-semibold text-red-600 '>CategoryName</p>
                    <div className='px-2 py-0.5 flex justify-center items-center rounded-2xl bg-red-100 text-red-600'>0</div>
                </div>
            </div> */}
            <table class=" w-full text-sm text-left rtl:text-right text-gray-500 mb-32">
                <thead class=" text-gray-700  bg-gray-50 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Qty available
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Items sold
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Unit price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Expiry Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    items
                    ?(
                        items.map((item, index) => (
                            <tr key={index} class=" bg-white border-b border-gray-200">
                                <td scope="row" class="px-6 py-4 flex items-center gap-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className=' flex justify-center items-center realtive w-14 h-14 rounded-full border border-gray-300 overflow-hidden'>
                                        {
                                            item.productPhoto 
                                            ?   <img className='w-full h-full' src={`http://localhost:3003${item.productPhoto}`}/>
                                            :   <div className= 'relative w-full  h-full flex justify-center items-center bg-gray-200 '><Image className='absolute text-gray-600 w-6 h-6 ' strokeWidth='1'  /></div>
                                        }
                                    </div>
                                    <div>
                                        <p className='text-base'>{item.productName}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    {item.qty}
                                </td>
                                <td class="px-6 py-4 text-2xl text-red-600">
                                    !!!
                                </td>
                                <td class="px-6 py-4">
                                    {item.price} <span className='text-black'>MAD</span>
                                </td>
                                <td class="px-6 py-4 text-base ">
                                    {
                                    item.expirationDate  
                                    ? (item.expirationDate.slice(0,10))
                                    : (<p>-</p>)
                                    }
                                </td>
                                <td class="relative px-6 py-4">
                                    {/* <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                                    <EllipsisVertical onClick={() => setShowOptions(index === showOptions ? null : index)} className='cursor-pointer' />
                                    {
                                        showOptions === index && (
                                            <div className=' z-30 absolute right-12 top-16 bg-white shadow-md border border-gray-200 rounded-lg text-black w-32'>
                                                <Link to={`/admin/items/view/${item._id}`} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                    <div><Eye /></div>
                                                    <p>View</p>
                                                </Link>
                                                <Link className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center border-b border-gray-200'>
                                                    <div><PenLine /></div>
                                                    <p>Update</p>
                                                </Link>
                                                <Link onClick={() => setPopUp(true)} className='hover:bg-gray-100 px-4 py-2.5 gap-3 text-base font-semibold flex items-center text-red-600'>
                                                    <div><Trash2 /></div>
                                                    <p>Delete</p>
                                                </Link>
                                                {popUp && <PopUp setPopUp={setPopUp} name={item.productName} id={item._id} />
                                            }
                                            </div>
                                        )
                                    }
                                </td>
                            </tr>
                            // <div key={index}>
                            //     <p>{item.productName}</p>
                            // </div>
                        ))
                    )
                    : (
                        <SpinnerLoader/>
                    )
                }
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AllItems
