import { ArrowRight, Box, Boxes, Calendar, Clock, FileClock, FolderPlus, PenLine, Trash2, UserRoundPlus } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import SpinnerBlue from '../SpinnerBlue'
import SpinnerLoader from '../../SpinnerLoader'

function RecentActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const currentDate = new Date().toLocaleDateString('en-CA');
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = () => {
    axios.get(`${apiUrl}/activities`,
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }}
    )
      .then(response => {
        setActivities(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log("Error: ", error)
        setLoading(false)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='' >
        <div className='bg-gray-50 flex justify-between items-center px-2 '>
            <p className='text-xl font-semibold text-gray-900 px-2'>Recent Activities</p>
            <Link to="/admin/activities" className=' text-blue-600   py-2 font-semibold flex justify-center items-center gap-3'>
                <p>View All</p>
                <div><ArrowRight size={20} /></div>
            </Link>
        </div>
        {
          activities && activities.length > 0 
            ?(
              <div className='overflow-y-scroll h-64 px-3 flex flex-col gap-4 py-3'>
                {activities.length > 0 && activities.slice(0, 10).map((log, index) => (
                  <div className='flex gap-2 items-start' key={log._id}>
                    {/* absolute z-10 -left-12 top-5 */}
                    <div className="w-8 h-8 flex justify-center items-center rounded-full border border-gray-300 bg-white shadow mt-2">
                      {log.action.toLowerCase().includes("added") && (
                        <>
                          {log.action.toLowerCase().includes("category") &&  <FolderPlus size={18} className="text-gray-600" /> }  
                          {log.action.toLowerCase().includes("product") &&  <Box size={18} className="text-gray-600" /> }  
                          {log.action.toLowerCase().includes("order") &&  <Boxes size={18} className="text-gray-600" /> }  
                          {(log.action.toLowerCase().includes("member") || log.action.toLowerCase().includes("admin")) &&  <UserRoundPlus size={18} className="text-gray-600" /> }  
                          
                        </>
                      )}
                      {log.action.toLowerCase().includes("deleted") && <Trash2 size={18} className="text-red-400" />}
                      {log.action.toLowerCase().includes("updated") && <PenLine size={18} className="text-gray-600" />}
                    </div>

                    {/* Log Details */}
                    <div className="relative w-10/12 rounded-lg p-4  shadow-md bg-gray-100 ml-3">
                      {/* Action & Details & user name */}
                      <div className="text-sm text-gray-800 truncate">
                        <span className="font-semibold text-gray-900">{log.action}</span>
                        <span className="text-gray-600 ">{log.details && <span>  — {log.details} </span>} </span>
                      </div>

                      {/* Date-Time Info */}
                      <div className="lg:flex justify-between items-center lg:mt-3 mt-1.5 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} className="text-gray-500" />
                            <span>{log.createdAt.slice(0, 10) === currentDate.slice(0, 10) ? <p>Today</p> : log.createdAt.slice(0, 10)}</span> {/* Extracting Date */}
                          </div>
                          <div className="w-[1px] h-4 bg-gray-400"></div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-gray-500" />
                            <span>{log.createdAt.slice(11, 16)}</span> {/* Extracting Time */}
                          </div>
                        </div>
                        <div className='flex items-center gap-1 lg:mt-0 mt-1.5'>
                          {/* <span className='font-semibold ml-3 font-poppins'>By: </span> */}
                          <div className='w-5 h-5 rounded-md text-white font-semibold bg-gray-600 flex justify-center items-center '>{log.userName ? log.userName[0].toUpperCase() : log.user[0].toUpperCase()}</div>
                          {log.user}{log.userName}
                        </div>
                      </div>
                      <div className='absolute w-4 h-4 bg-gray-100 -left-2 top-4 rotate-45'></div>
                    </div>
                    
                  </div>
                ))}
              </div>
            ):(
              <div className='flex flex-col justify-center items-center text-center m-auto text-gray-400 h-64 '>
                <FileClock size={40} />
                <p className='text-xl'>No activities have been logged yet.<br/> Start performing actions to see your activity history!</p>
              </div>
            )
        }
    </div>
  )
}

export default RecentActivities
