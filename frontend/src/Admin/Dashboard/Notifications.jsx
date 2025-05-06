import { ArrowRight, Bell, Calendar, CalendarClock, CalendarX2, Package, PackageX, ShoppingCart, TrendingDown, TriangleAlert, X } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DeleteNotificationPopUp from './DeleteNotificationPopUp'
import { jwtDecode } from 'jwt-decode'

function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)
    const [showNotificationTitle, setShowNotifiactionTitle] = useState(false)
    // const [showDeleteNotificationPopUp, setShowDeleteNotificationPopUp] = useState(false)
    const [activeNotificationId, setActiveNotificationId] = useState(null);
    const currentDate = new Date().toLocaleDateString('en-CA');
    const token = localStorage.getItem("token");
    let userRole = null;
    const apiUrl = import.meta.env.VITE_API_URL;
    
    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.role;
    }

    const fetchData = () => {
        axios.get(`${apiUrl}/notifications`)
            .then(response => setNotifications(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => { 
        fetchData()
    }, [])

    return (
        <div className='relative cursor-pointer px-4 '>
            <div 
                className='relative w-10 h-10 border lg:border-gray-500 lg:text-gray-500 text-white border-white rounded-full hover:bg-gray-200 flex justify-center items-center' 
                onMouseEnter={() => setShowNotifiactionTitle(true)} 
                onMouseLeave={() => setShowNotifiactionTitle(false)}
                onClick={() => setShowNotifications(!showNotifications)} 
            >
                <Bell 
                    size={22} 
                    strokeWidth={2}  
                    // onClick={() => setShowNotifications(!showNotifications)} 
                />
                {showNotificationTitle && (
                    <div className='absolute  top-12 right-0 text-sm px-3 py-1 text-white bg-gray-600 rounded-lg'>
                        <p>Notifications</p>
                    </div>
                )}
                {(notifications.length > 0) && (
                    <div className='absolute min-w-6 min-h-6 px-0.5 border-[#F3F4F6] border-2 text-xs bg-red-600 text-white flex justify-center items-center rounded-full bottom-5 left-5'>
                        <p>{notifications.length}</p>
                    </div>
                )}
            </div>
                {showNotifications && (
                        <div className=' absolute z-20 bg-white lg:w-96 w-screen lg:h-[85vh] h-[90vh] overflow-x-scroll right-0 lg:top-10 top-14 lg:rounded-xl shadow-2xl'>
                            <div className=' border-gray-400 flex justify-between items-center shadow-lg font-semibold text-gray-600 px-3 py-3 text-lg sticky top-0 bg-white '>
                                <p>Notifications</p>
                                <div
                                    className='lg:hidden ' 
                                    onClick={() => setShowNotifications(false)}
                                >
                                    <X/>
                                </div>
                            </div>
                            <div className='mt-3'>
                                {
                                    notifications.length > 0 
                                    ?(
                                        // element can be an order or a product
                                        notifications.map((notif, index) => (
                                            <>
                                            {/* notification: new rder received */}
                                            {notif.type == "new order received"
                                            &&(
                                                <div className='flex  gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                    <div className='flex justify-center items-center border-2 border-green-300 text-green-500 w-10 h-10 p-1 mt-1.5 rounded-full'><ShoppingCart size={22} /></div>
                                                    <div className='flex flex-col justify-between gap-2 w-10/12'>
                                                        <div className='flex justify-between'>
                                                            <div className='w-10/12'>
                                                                <p className=''>{notif.message} </p>
                                                                <Link to={`/admin/view_order/${notif._id}`} className="cursor-pointer flex gap-1 justify-center items-center py-1 px-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-400 w-1/2 mt-2" >
                                                                    View Order 
                                                                    <ArrowRight size={17} />
                                                                </Link>
                                                            </div>
                                                            {userRole == "admin" && (
                                                                <div 
                                                                    onClick={() => setActiveNotificationId(notif._id)}
                                                                    // onClick={() => {setShowDeleteNotificationPopUp(true) }}
                                                                    className='w-7 h-7 bg-gray-50  flex justify-center items-center rounded-full'>
                                                                    <X size={18} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                            <div className=''><Calendar size={17}/></div>
                                                            {notif.createdAt.slice(0, 10) === currentDate ? <p>Today</p> : <p>{notif.createdAt.slice(0, 10)}</p>}
                                                            <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                            {notif.createdAt.slice(11,16)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {/* out of stock notification */}
                                            {notif.type=="out of stock" && (
                                                <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                    <div className='flex justify-center items-center border-2 border-red-300 text-red-500 w-10 h-10 p-1 rounded-full'>
                                                        <PackageX size={22} />
                                                    </div>
                                                    <div className='flex flex-col justify-between gap-2 w-10/12'>
                                                        <div className='flex justify-between'>
                                                            <p className='w-10/12'>{notif.message}</p>
                                                            {userRole == "admin" && (
                                                                <div 
                                                                    onClick={() => setActiveNotificationId(notif._id)}
                                                                    // onClick={() => {setShowDeleteNotificationPopUp(true)}}
                                                                    className='w-7 h-7 bg-gray-50  flex justify-center items-center rounded-full'>
                                                                    <X size={18} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                            <div className=''><Calendar size={17}/></div>
                                                            {notif.createdAt?.slice(0, 10) === currentDate ? <p>Today</p> : <p>{notif.createdAt?.slice(0, 10)}</p>}
                                                            <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                            {notif.createdAt?.slice(11,16)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {/* low in stock */}
                                            {notif.type =="low in stock" && (
                                                <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                    <div className='flex justify-center items-center border-2 border-orange-300 text-orange-500 w-10 h-10 p-1 rounded-full'>
                                                        <TrendingDown size={22}  />
                                                    </div>
                                                    <div className='flex flex-col justify-between gap-2 w-10/12 '>
                                                        <div className='flex justify-between '>
                                                            <p className='w-10/12'>{notif.message}</p>
                                                            {userRole == "admin" && (
                                                                <div 
                                                                    onClick={() => setActiveNotificationId(notif._id)}
                                                                    // onClick={() => {setShowDeleteNotificationPopUp(true)}}
                                                                    className='w-7 h-7 bg-gray-50  flex justify-center items-center rounded-full'>
                                                                    <X size={18} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                            <div className='mr-1'><Calendar size={17}/></div>
                                                            {notif.createdAt?.slice(0, 10) === currentDate ? <p>Today</p> : <p>{notif.createdAt?.slice(0, 10)}</p>} 
                                                            <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                            {notif.createdAt?.slice(11,16)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )} 
                                            {/* expired */}
                                            {notif.type=="expired" && (
                                                <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                    <div className='flex justify-center items-center border-2  border-gray-400 text-gray-500 w-10 h-10 p-1 rounded-full'>
                                                        <CalendarX2 size={22} />
                                                    </div>
                                                    <div className='flex flex-col justify-between gap-2 w-10/12 '>
                                                        <div className='flex justify-between'>
                                                            <p className='w-10/12'>{notif.message}</p>
                                                            {userRole == "admin" && (
                                                                <div 
                                                                    onClick={() => setActiveNotificationId(notif._id)}
                                                                    // onClick={() => {setShowDeleteNotificationPopUp(true)}}
                                                                    className='w-7 h-7 bg-gray-50  flex justify-center items-center rounded-full'>
                                                                    <X size={18} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                            <div className='mr-1'><Calendar size={17}/></div>
                                                            {notif.createdAt?.slice(0, 10) === currentDate ? <p>Today</p> : <p>{notif.createdAt?.slice(0, 10)}</p>} 
                                                            <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                            {notif.createdAt?.slice(11,16)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {/* expiring soon */}
                                            {notif.type=="expiring soon" && (
                                                <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                    <div className='flex justify-center items-center border-2 border-blue-300 text-blue-500 w-10 h-10 p-1 rounded-full'>
                                                        <CalendarClock size={22} />
                                                    </div>
                                                    <div className='flex flex-col juctify-between gap-2 w-10/12 '>
                                                        <div className='flex justify-between'>
                                                            <p className='w-10/12'>{notif.message}</p>
                                                            {userRole == "admin" && (
                                                                <div
                                                                    onClick={() => setActiveNotificationId(notif._id)}
                                                                    // onClick={() => {setShowDeleteNotificationPopUp(true)}}
                                                                    className='w-7 h-7 bg-gray-50  flex justify-center items-center rounded-full'>
                                                                    <X size={18} />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                            <div className='mr-1'><Calendar size={17}/></div>
                                                            {notif.createdAt?.slice(0, 10) === currentDate ? <p>Today</p> : <p>{notif.createdAt?.slice(0, 10)}</p>} 
                                                            <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                            {notif.createdAt?.slice(11,16)}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {activeNotificationId === notif._id && (
                                                <DeleteNotificationPopUp
                                                    notificationId={notif._id}
                                                    setShowDeleteNotificationPopUp={() => setActiveNotificationId(null)}
                                                    notifications={notifications}
                                                    setNotifications={setNotifications}
                                                />
                                            )}
                                            {/* {showDeleteNotificationPopUp && <DeleteNotificationPopUp notificationId={notif._id} setShowDeleteNotificationPopUp={setShowDeleteNotificationPopUp} />} */}
                                            </>
                                            
                                        ))
                                    )
                                    :(
                                        <div className=' flex flex-col gap-2 text-gray-500 justify-center items-center h-[75vh]'>
                                            <div><Bell size={50}/></div> 
                                            <div><p>All products are in stock and up to date!</p></div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )} 
        </div>   
  )
}

export default Notifications
