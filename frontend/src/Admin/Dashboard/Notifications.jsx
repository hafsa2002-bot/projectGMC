import { ArrowRight, Bell, Calendar, CalendarX2, Package, PackageX, ShoppingCart, TrendingDown, TriangleAlert, X } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)
    const [showNotificationTitle, setShowNotifiactionTitle] = useState(false)
    const currentDate = new Date().toLocaleDateString('en-CA');

    const fetchData = () => {
        axios.get("http://localhost:3003/notifications")
            .then(response => setNotifications(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => { 
        fetchData()
    }, [])
    /*
    // const [orders, setOrders]
    const [stockInfo, setStockInfo] = useState({})
    const [showNotifications, setShowNotifications] = useState(false)
    const [showNotificationTitle, setShowNotifiactionTitle] = useState(false)
    const [showNotificationOutOfStock, setShowNotificationOutOfStock]= useState(false)
    const [showNotificationLowInStock, setShowNotificationLowInStock]= useState(false)
    const [showNotificationExpired, setShowNotificationExpired]= useState(false)
    const [numberOfNotifications, setNumberOfNotifications] = useState(0)
    const [loading, setLoading] = useState(true)
    const getStockInfo = () => {
        axios.get("http://localhost:3003/admin/stock")
            .then(response => {
                setStockInfo(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log("error: ", error)
                setLoading(false)
            })
    }

    const showOutOfStock = () => {
        if(stockInfo.totalOutOfStock > 0 ){
            setShowNotificationOutOfStock(true)
        } 
        else setShowNotificationOutOfStock(false)
    }

    const showLowInStock = () => {
        if(stockInfo.totalLowInStock > 0 ){
            setShowNotificationLowInStock(true)
        } 
        else setShowNotificationLowInStock(false)
    }

    const showExpired = () => {
        if(stockInfo.totalExpiredProducts > 0 ){
            setShowNotificationExpired(true)
        } 
        else setShowNotificationExpired(false)
    }

    const calculateNumberOfNotifications = () => {
        let count = 0;
        if(stockInfo.totalOutOfStock > 0) count ++;
        if(stockInfo.totalLowInStock > 0) count ++;
        if(stockInfo.totalExpiredProducts > 0 ) count ++;
        setNumberOfNotifications(count)
    }

    useEffect(() => {
        getStockInfo();
    }, [stockInfo])

    useEffect(() => {
        calculateNumberOfNotifications()
        // chech if there is some out of stock products to show
        if(stockInfo.totalOutOfStock !== undefined){
            showOutOfStock()
        }
        // chech if there is some low in stock products to show
        if(stockInfo.totalLowInStock !== undefined){
            showLowInStock()
        }
        // chech if there is some expired products to show
        if(stockInfo.totalExpiredProducts !== undefined){
            showExpired()
        }
    }, [stockInfo])
  */
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
                                        notifications.map((element, index) => (
                                            //if it contains a contact object so it's an order
                                            element.contact 
                                            ?(
                                                <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                    <div className='flex justify-center items-center border-2 border-green-300 text-green-500 w-9 h-9 p-1 rounded-full'><ShoppingCart size={22} /></div>
                                                    <div className='flex flex-col juctify-between gap-2 w-full'>
                                                        <div className='flex justify-between items-start'>
                                                            <p className='font-semibold'>New Order Received! </p>
                                                            <Link to={`/admin/view_order/${element._id}`} className="cursor-pointer flex gap-1 justify-center items-center py-1 px-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-400 " >
                                                                View Order
                                                                <ArrowRight size={17} />
                                                            </Link>
                                                        </div>
                                                        <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                            <div className=''><Calendar size={17}/></div>
                                                            {element.createdAt.slice(0, 10) === currentDate ? <p>Today</p> : <p>{element.createdAt.slice(0, 10)}</p>}
                                                            <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                            {element.createdAt.slice(11,16)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ):(
                                                // <div className={`flex  ${(element.outOfStock && !element.isExpired) && 'bg-blue-400'} ${(element.lowInStock && !element.outOfStock) && 'bg-orange-400'} ${element.isExpired && 'bg-red-400'}`} >
                                                <div>
                                                    {(element.outOfStock && !element.isExpired) 
                                                        && (
                                                            <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                                <div className='flex justify-center items-center border-2 border-blue-300 text-blue-500 w-9 h-9 p-1 rounded-full'><PackageX size={22} /></div>
                                                                <div className='flex flex-col juctify-between gap-1.5 w-full'>
                                                                    <p><span className='font-semibold'>Product out of stock: </span>{element.productName} </p>
                                                                    <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                                        <div className=''><Calendar size={17}/></div>
                                                                        {element.lastUpdated.slice(0, 10) === currentDate ? <p>Today</p> : <p>{element.lastUpdated.slice(0, 10)}</p>}
                                                                        <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                                        {element.lastUpdated.slice(11,16)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    {(element.lowInStock && !element.outOfStock ) 
                                                        &&(
                                                            <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                                <div className='flex justify-center items-center border-2 border-orange-300 text-orange-500 w-9 h-9 p-1 rounded-full'><TrendingDown size={22}  /></div>
                                                                <div className='flex flex-col juctify-between gap-1.5 w-full '>
                                                                    <p><span className='font-semibold'>Product low in stock: </span>{element.productName} </p>
                                                                    <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                                        <div className='mr-1'><Calendar size={17}/></div>
                                                                        {element.lastUpdated.slice(0, 10) === currentDate ? <p>Today</p> : <p>{element.lastUpdated.slice(0, 10)}</p>} 
                                                                        <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                                        {element.lastUpdated.slice(11,16)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                        ))
                                    )
                                    :(
                                        <div className=' flex flex-col gap-3 text-gray-500 justify-center items-center h-[75vh]'>
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
