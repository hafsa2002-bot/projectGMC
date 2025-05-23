import { CirclePlus, Trash2 } from 'lucide-react'
import React, {useState} from 'react'

function BatchForm({rows, setRows}) {
    // const [rows, setRows] = useState([{id:1, qty: 0, expirationDate: ""}])
    const [emptyRow, setEmptyRow] = useState(false)
    const addNewRow = () => {
        setRows(prevRows => [
            ...prevRows, 
            { id: prevRows.length + 1, qty: 0, expirationDate: "" }
        ]);        
        console.log("rows = ", rows)
    }
    
    const removeRow = (id) => {
        setRows(rows.filter(row => row.id !== id))
    }
  return (
    <div className='lg:w-11/12 w-full '>
        <h2 className='font-semibold text-base'>Add Batches (Quantity & Expiration Date)</h2>
        {/* batch array */}
        <div className='w-full  overflow-x-scroll border border-gray-300 rounded-lg  mt-4 '>
            <table className='w-full '>
                <thead className='py-2 bg-gray-50 text-sm  text-left border-b border-gray-300'>
                    <tr>
                        <th scope="col" className="lg:pl-6 px-3  py-3 border-r border-gray-300">#</th>
                        <th scope="col" className="lg:px-6 px-3 font-normal py-3 border-r border-gray-300">Quantity</th>
                        <th scope="col" className="lg:px-6 px-3 font-normal py-3 border-r border-gray-300">Expiration date</th>
                        <th scope="col" className="lg:px-2 px-4 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows?.map((row, index) => (
                        <tr key={row.id} className='border-b border-gray-300'>
                            <td className="lg:pl-6 px-3 py-3 border-r border-gray-300">{index+1}</td>
                            {/* quantity */}
                            <td className="lg:px-6 px-3 py-3 border-r border-gray-300">
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
                            <td className="lg:px-6 px-3 py-3 border-r border-gray-300">
                                <div className='w-full'>
                                    <input 
                                        className={` border  text-gray-900 rounded-lg w-full p-2.5 outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 `   } 
                                        type="date"
                                        autoComplete='off' 
                                        name="expirationDate" 
                                        id="expirationDate"
                                        value={row.expirationDate}
                                        onChange={(e) => {
                                            const newRows = [...rows];
                                            newRows[index].expirationDate = e.target.value;
                                            setRows(newRows);
                                        }}
                                    />
                                </div>
                            </td>
                            
                            {/* delete row */}
                            <td className="lg:px-2 py-3">
                                <Trash2
                                    size={23}
                                    className='text-red-500 cursor-pointer text-center w-full '
                                    onClick={() => removeRow(row.id)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* add new line */}
        <div 
            className='text-blue-600 cursor-pointer lg:w-2/12 w-1/2 flex items-center gap-2 font-medium mt-4'
            onClick={addNewRow}
        >
            <CirclePlus size={20} /><p>Add new line</p> 
        </div>
    </div>
  )
}

export default BatchForm
