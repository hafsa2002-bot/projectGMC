import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SpinnerBlue from './SpinnerBlue'
import { Box, Boxes, Calendar, Clock, FileClock, FolderPlus, PackagePlus, PenLine, Plus, Trash2, UserRound } from 'lucide-react'

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
    axios.get("http://localhost:3003/activities")
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
              <p className='text-2xl font-medium mt-2 mb-10'>Activity History</p>
              <div className='bg-white p-4 pl-14 rounded-lg w-9/12 mb-20'>
                {Object.keys(groupedLogs).map((category) => (
                  groupedLogs[category].length > 0 && (
                    <div key={category}>
                      <div className='font-bold text-xl mb-5'>{category}</div>

                      {/* Timeline Wrapper */}
                      {/* relative z-0 */}
                      <div className=" pl-8  z-0 border-l-2  border-gray-300">
                        {groupedLogs[category].map((log, index) => (
                          <div key={index} className="relative z-0   flex items-start gap-4 mb-6">
                            
                            {/* Timeline Icon - Centered on the Line */}
                            <div className="absolute z-0  -left-12 top-5 w-8 h-8 flex justify-center items-center rounded-full border border-gray-300 shadow">
                              {log.action.toLowerCase().includes("added") && (
                                <>
                                  {log.action.toLowerCase().includes("category") &&  <FolderPlus size={18} className="text-gray-600" /> }  
                                  {log.action.toLowerCase().includes("product") &&  <PackagePlus size={18} className="text-gray-600" /> }  
                                  {log.action.toLowerCase().includes("order") &&  <Boxes size={18} className="text-gray-600" /> }  
                                </>
                              ) }
                              {log.action.toLowerCase().includes("deleted") && <Trash2 size={18} className="text-red-400" />}
                              {log.action.toLowerCase().includes("updated") && <PenLine size={18} className="text-gray-600" />}
                            </div>

                            {/* Log Details */}
                            <div className="     w-full rounded-lg p-4 mr-7 shadow-md">
                              {/* Action & Details & user name */}
                              <div className="text-sm text-gray-800 ">
                                <span className='font-semibold  font-poppins'>{log.action}:</span> {log.details} 
                                <span className='font-semibold ml-3 font-poppins'>By: </span> {log.user}
                              </div>

                              {/* Date-Time Info */}
                              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span>{log.createdAt.slice(0, 10)}</span> {/* Extracting Date */}
                                  </div>
                                  <div className="w-[1px] h-4 bg-gray-400"></div>
                                  <div className="flex items-center gap-1">
                                    <Clock size={14} className="text-gray-500" />
                                    <span>{log.createdAt.slice(11, 16)}</span> {/* Extracting Time */}
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
