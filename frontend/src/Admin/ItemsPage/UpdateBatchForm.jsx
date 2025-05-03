import { CirclePlus, Trash2 } from 'lucide-react'
import React from 'react'
// import mongoose from 'mongoose';

function UpdateBatchForm({rows, setRows}) {
    const generateObjectId = () => {
        return Math.floor(Math.random() * 1e16).toString(16).padStart(24, '0');
    };
    const addNewRow = () => {
        const newRow = {
            // _id: Date.now().toString(),
            // _id: new mongoose.Types.ObjectId(),
            _id: generateObjectId(),
            qty: '',
            expirationDate: ''
        };
        setRows([...rows, newRow]);
    }
    const removeRow = (id) => {
        const updatedRows = rows.filter(row => row._id !== id);
        setRows(updatedRows);
    }
  return (
    <div className='w-11/12'>
            <h2 className='font-semibold text-base'>Add Batches (Quantity & Expiration Date)</h2>
            {/* batch array */}
            <div className='w-full border border-gray-300 rounded-lg overflow-hidden mt-4 '>
                <table className='w-full'>
                    <thead className='py-2 bg-gray-50 text-sm  text-left border-b border-gray-300'>
                        <tr>
                            <th scope="col" className="pl-6  py-3 border-r border-gray-300">#</th>
                            <th scope="col" className="px-6 font-normal py-3 border-r border-gray-300">Quantity</th>
                            <th scope="col" className="px-6 font-normal py-3 border-r border-gray-300">Expiration date</th>
                            <th scope="col" className="px-2 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map((row, index) => (
                            <tr key={row._id} className='border-b border-gray-300'>
                                <td className="pl-6 py-3 border-r border-gray-300">{index+1}</td>
                                {/* quantity */}
                                <td className="px-6 py-3 border-r border-gray-300">
                                    <div 
                                        className={` flex justify-between  border  text-gray-900 text-sm rounded-lg w-full  outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   }
                                    >
                                        <input
                                            className='outline-none w-full p-2.5'                            
                                            type="number" 
                                            min="1" 
                                            autoComplete='off'
                                            name="qty" 
                                            id="qty" 
                                            placeholder="1" 
                                            value={row.qty}
                                            required
                                            onChange={(e) => {
                                                const newRows = [...rows]
                                                newRows[index].qty = e.target.value
                                                setRows(newRows)
                                            }}
                                        />
                                    </div>
                                </td>
                                {/* expiration date */}
                                <td className="px-6 py-3 border-r border-gray-300">
                                    <div className='w-full'>
                                        <input 
                                            className={` border  text-gray-900 rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                            type="date"
                                            autoComplete='off' 
                                            name="expirationDate" 
                                            id="expirationDate"
                                            // disabled
                                            disabled={row.expirationDate && row.expirationDate !== ''}
                                            value={row.expirationDate?.slice(0, 10) || ""}
                                            onChange={(e) => {
                                                const newRows = [...rows];
                                                newRows[index].expirationDate = e.target.value;
                                                setRows(newRows);
                                            }}
                                        />
                                    </div>
                                </td>
                                
                                {/* delete row */}
                                <td className="px-2 py-3">
                                    <Trash2
                                        size={23}
                                        className='text-red-500 cursor-pointer text-center w-full'
                                        onClick={() => removeRow(row._id)} 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* add new line */}
            <div 
                className='text-blue-600 cursor-pointer w-2/12 flex items-center gap-2 font-medium mt-4'
                onClick={addNewRow}
            >
                <CirclePlus size={20} /><p>Add new line</p> 
            </div>
        </div>
  )
}

export default UpdateBatchForm
