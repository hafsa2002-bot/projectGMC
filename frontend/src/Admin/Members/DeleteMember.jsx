import { Trash2 } from 'lucide-react'
import React from 'react'

function DeleteMember() {
  return (
    <div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200">
            <Trash2/>
        </button>
    </div>
  )
}

export default DeleteMember
