import { CheckCircle } from 'lucide-react'
import React from 'react'

function SucessMessage({message}) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 text-black lg:px-6 px-2 py-3 rounded-xl shadow-md flex items-center gap-3 z-50">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span>{message}</span>
    </div>
  )
}

export default SucessMessage
