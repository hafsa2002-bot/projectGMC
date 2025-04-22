import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SpinnerBlue from './SpinnerBlue'
import { Box, Boxes, Calendar, Clock, FileClock, FolderPlus, PackagePlus, PenLine, Plus, Trash2, UserRound, UserRoundPlus } from 'lucide-react'

function ActivityLog() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  function getLogDate(createdAt) {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
  
    // Reset time part of both dates to make comparison easier
    currentDate.setHours(0, 0, 0, 0);
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
  
    // Compare the dates
    if (createdDate >= currentDate) {
      return 'Today';
    } else if (createdDate >= yesterday && createdDate < currentDate) {
      return 'Yesterday';
    } else {
      return 'Earlier';
    }
  }

  const getLogs = () => {
    axios.get("http://localhost:3003/activities",
      {headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }}
    )
      .then(response => {
        setLogs(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log("Error: ", error)
        setLoading(false)
      })
  }

    const [groupedLogs, setGroupedLogs] = useState({
      Today: [],
      Yesterday: [],
      Earlier: [],
    });
  
    useEffect(() => {
      const categorizedLogs = {
        Today: [],
        Yesterday: [],
        Earlier: [],
      };
  
      logs.forEach((log) => {
        const category = getLogDate(log.createdAt);
        categorizedLogs[category].push(log);
      });
  
      setGroupedLogs(categorizedLogs);
    }, [logs]);
  
  
  useEffect(() => {
    getLogs()
  }, [])
  return (
    <div>
      {
        loading 
        ?(
          <SpinnerBlue/>
        )
        :(
          logs && logs.length > 0 ? (
            <div>
              <p className='text-3xl font-medium mb-7 ml-12 mt-5 text-blue-500 font-poppins'>Activity History</p>
              <div className=' p-4 lg:pl-14 pl-8 rounded-lg lg:w-9/12 mb-20'>
                {Object.keys(groupedLogs).map((category) => (
                  groupedLogs[category].length > 0 && (
                    <div key={category}>
                      <div className='font-semibold text-2xl mb-5 ml-12 font-poppins'>{category}</div>

                      {/* Timeline Wrapper */}
                      {/* relative z-0 border-l-2   pl-8*/}
                      <div className="relative z-0 border-l-2   pl-7 border-gray-300">
                        {groupedLogs[category].map((log, index) => (
                          <div key={index} className=" relative bg-gray-100  flex items-start gap-5 pl-2 mb-9">
                            
                            {/* Timeline Icon - Centered on the Line */}
                            <div className=" absolute -left-12 top-3 bg-white  w-9 h-9 flex justify-center items-center rounded-full border border-gray-300 shadow">
                              {log.action.toLowerCase().includes("added") && (
                                <>
                                  {log.action.toLowerCase().includes("category") &&  <FolderPlus size={18} className="text-gray-600" /> }  
                                  {log.action.toLowerCase().includes("product") &&  <PackagePlus size={18} className="text-gray-600" /> }  
                                  {log.action.toLowerCase().includes("order") &&  <Boxes size={18} className="text-gray-600" /> }  
                                  {(log.action.toLowerCase().includes("member") || log.action.toLowerCase().includes("admin")) &&  <UserRoundPlus size={18} className="text-gray-600" /> }  
                                </>
                              ) }
                              {log.action.toLowerCase().includes("deleted") && <Trash2 size={18} className="text-red-400" />}
                              {log.action.toLowerCase().includes("updated") && <PenLine size={18} className="text-gray-600" />}
                            </div>

                            <div className="bg-white lg:w-10/12 w-full rounded-xl p-5 mr-7 shadow-sm border border-gray-200 font-poppins">
                              {/* Action & Details */}
                              <div className="mb-3">
                                <p className="text-sm text-gray-700 leading-relaxed break-words">
                                  <span className="font-semibold text-gray-900">{log.action}</span>
                                  <span className="text-gray-600 ">{log.details && <span>  — {log.details} </span>} </span>
                                </p>
                              </div>
                              <div className="border-t border-gray-100 my-3"></div>

                              {/* Bottom Section: User & Date-Time */}
                              <div className="lg:flex  justify-between items-center text-xs text-gray-500">
                                {/* Left: User */}
                                <div className="flex items-center  gap-1 lg:mb-0 mb-1.5">
                                  <UserRound size={14} className="text-gray-500" />
                                  <span className="font-medium text-gray-600">Performed by</span>
                                  <span>{log.userName} {log.user}</span>
                                </div>

                                {/* Right: Date & Time */}
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span>{log.createdAt.slice(0, 10)}</span>
                                  </div>
                                  <div className="w-[1px] h-4 bg-gray-300"></div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={14} className="text-gray-500" />
                                    <span>{log.createdAt.slice(11, 16)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>


                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ):(
            <div className='flex flex-col justify-center items-center text-center m-auto text-gray-400 h-screen '>
              <FileClock size={70} />
              <p className='text-xl'>No activities have been logged yet.<br/> Start performing actions to see your activity history!</p>
            </div>
          )
        )
    }
    </div>
  )
}

export default ActivityLog
