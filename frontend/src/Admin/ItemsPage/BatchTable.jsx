import React from 'react'

function BatchTable({batches}) {
  return (
    <div className="overflow-x-auto   border border-gray-300 rounded-xl shadow overflow-hidden">
      <table className="min-w-full bg-white ">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-left">#</th>
            <th className="py-2 px-4 border-b  border-r border-gray-300 text-left">Quantity</th>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-left">Expiration date</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {batches.map((batch, index) => (
            <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b  border-r border-gray-300">{index+1}</td>
                <td className="py-2 px-4 border-b  border-r border-gray-300"><span className='font-semibold pr-1'>{batch.qty}</span> items</td>
                <td className="py-2 px-4 border-b border-r border-gray-300">
                    {batch.expirationDate ? batch.expirationDate.slice(0, 10) : '_'}    
                </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BatchTable
