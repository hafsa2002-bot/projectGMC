import { ArrowRight } from 'lucide-react'
import React from 'react'
import {Link} from 'react-router-dom'

function RecentActivities() {
  return (
    <div>
        <div className='bg-gray-50 flex justify-between items-center px-2 '>
            <p className='text-xl font-semibold text-gray-700 px-2'>Recent Activities</p>
            <Link className=' text-blue-600   py-2 font-semibold flex justify-center items-center gap-3'>
                <p>View All</p>
                <div><ArrowRight size={20} /></div>
            </Link>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default RecentActivities
