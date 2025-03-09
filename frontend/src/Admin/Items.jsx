import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Items() {
    const [items, setItems] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3003/admin/items/list")
        .then(response => setItems(response.data))
        .catch(error => console.log("Error: ", error))
    }, [])
  return (
    <div>
        <div className='border-b border-gray-400 flex justify-between items-center pb-3'>
            <div className='text-3xl text-gray-700 font-semibold'>
                <p>All Items</p>
            </div>
            <div className='flex text-white gap-4'>
                <div className='bg-blue-600 px-3 py-2 rounded-full font-semibold'>
                    <Link to="/admin/items/add-item">Add Item</Link>
                </div>
                <div className='bg-blue-600 px-3 py-2 rounded-full font-semibold'>
                    <Link>Add Category</Link>
                </div>
            </div>
        </div>
        <div>
            {
                items
                ?(
                    items.map((item, index) => (
                        <div key={index}>
                            <p>{item.productName}</p>
                        </div>
                    ))
                )
                : (
                    <p>nothing</p>
                )
            }
        </div>
    </div>
  )
}

export default Items
