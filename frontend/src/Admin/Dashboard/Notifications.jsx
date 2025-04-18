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
    }, [notifications])
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
                        <div className=' absolute z-20 bg-white lg:w-96 w-screen h-[85vh] overflow-x-scroll right-0 lg:top-10 top-14 lg:rounded-xl shadow-2xl'>
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
                                                <div className='flex items-center gap-3 bg-white border-b border-gray-200 py-2 px-3'>
                                                    <div>
                                                        {(element.outOfStock && !element.isExpired) && <div className='flex justify-center items-center border-2 border-blue-300 text-blue-500 w-9 h-9 p-1 rounded-full'><PackageX size={22} /></div>} 
                                                        {(element.lowInStock && !element.outOfStock && !element.isExpired) && <div className='flex justify-center items-center border-2 border-orange-300 text-orange-500 w-9 h-9 p-1 rounded-full'><TrendingDown size={22}  /></div>} 
                                                        {/* {(element.isExpired) && <div className='flex justify-center items-center border-2 border-red-300 text-red-500 w-9 h-9 p-1 rounded-full'><CalendarX2 size={22}  /></div>}  */}
                                                        {/* {(element.isExpiringSoon  && !element.isExpired) && <div className='flex justify-center items-center border-2 border-red-300 text-red-500 w-9 h-9 p-1 rounded-full'><Calendar size={22}  /></div>} */}
                                                    </div>
                                                    {(element.outOfStock && !element.isExpired) && (
                                                        <div className='flex flex-col juctify-between gap-1.5 w-full'>
                                                            <p><span className='font-semibold'>Product out of stock: </span>{element.productName} </p>
                                                            <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                                <div className=''><Calendar size={17}/></div>
                                                                {element.lastUpdated.slice(0, 10) === currentDate ? <p>Today</p> : <p>{element.lastUpdated.slice(0, 10)}</p>}
                                                                <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                                {element.lastUpdated.slice(11,16)}
                                                            </div>
                                                        </div>
                                                    )} 
                                                    {(element.lowInStock && !element.outOfStock && !element.isExpired) && (
                                                        <div className='flex flex-col juctify-between gap-1.5 w-full '>
                                                            <p><span className='font-semibold'>Product low in stock: </span>{element.productName} </p>
                                                            <div className='flex justify-end items-center gap-1 mr-2 text-gray-600'>
                                                                <div className='mr-1'><Calendar size={17}/></div>
                                                                {element.lastUpdated.slice(0, 10) === currentDate ? <p>Today</p> : <p>{element.lastUpdated.slice(0, 10)}</p>} 
                                                                <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                                {element.lastUpdated.slice(11,16)}
                                                            </div>
                                                        </div>
                                                    )} 
                                                    {/* {element.isExpired && (
                                                        <div className='flex flex-col juctify-between gap-1.5 w-full '>
                                                            <p><span className='font-semibold'>Product expired: </span>{element.productName} </p>
                                                            <div className='flex justify-end items-center gap-1 mr-2 text-gray-600' >
                                                            <div className='mr-1'><Calendar size={17}/></div>
                                                                {element.lastUpdated.slice(0, 10) === currentDate ? <p>Today</p> : <p>{element.lastUpdated.slice(0, 10)}</p>} 
                                                                <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                                {element.lastUpdated.slice(11,16)}
                                                            </div>
                                                        </div>
                                                    )}  */}
                                                    {/* product near expiration: after n-days */}
                                                    {/* {
                                                        (element.isExpiringSoon && !element.isExpired) && (
                                                            <div className='flex flex-col juctify-between gap-1.5 w-full '>
                                                                <p className=''><span className='font-semibold'>Product near expiration: </span>{element.productName} - <p className='text-gray-400 font-semibold text-sm'> {element.daysLeftToExpire == 1 ? <span>One day left</span> : <span> {element.daysLeftToExpire} days left </span> } </p> </p>
                                                                <div className='flex justify-end items-center gap-1 mr-2 text-gray-600' >
                                                                <div className='mr-1'><Calendar size={17}/></div>
                                                                    {element.lastUpdated.slice(0, 10) === currentDate ? <p>Today</p> : <p>{element.lastUpdated.slice(0, 10)}</p>} 
                                                                    <span className='border p-[0.5px] bg-black rounded-full mt-1'> </span> 
                                                                    {element.lastUpdated.slice(11,16)}
                                                                </div>
                                                            </div>
                                                        )
                                                    } */}
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
                            {/* {(showNotificationExpired || showNotificationLowInStock || showNotificationOutOfStock) 
                            ?(
                                <div className='flex flex-col gap-[0.1px] mt-3'>
                                    {showNotificationOutOfStock && (
                                        <div className='bg-blue-100 px-3 text-gray-600 py-2  flex items-center justify-between border-b border-gray-400'>
                                            <Link to="/admin/items/out-of-stock" className='flex items-center   gap-4'>
                                                <TrendingDown className=' border-2 border-blue-300 text-blue-500 w-9 h-9 p-1 rounded-full'/>
                                                <div className='flex flex-col'>
                                                <p className='text-base'>Products Out Of Stock</p>
                                                <div className='flex gap-2 items-center text-base font-semibold'><span className=''>(</span>{ (stockInfo.totalOutOfStock == 1) ? <p>{stockInfo.totalOutOfStock} Product</p> : <p>{stockInfo.totalOutOfStock} Products</p>} <span>)</span></div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                    {showNotificationLowInStock && (
                                        <div className='bg-orange-100 px-3 text-gray-600 py-2  flex items-center justify-between border-b border-gray-400'>
                                        <Link to="/admin/items/low-in-stock" className='flex items-center  gap-4'>
                                            <TrendingDown className='border-2 border-orange-300  text-orange-500 w-9 h-9 p-1 rounded-full'/>
                                            <div className='flex flex-col'>
                                            <p className='text-base'>Products Low In Stock</p>
                                            <div className='flex gap-2 items-center text-base font-semibold'><span >(</span>{ (stockInfo.totalLowInStock == 1) ? <p>{stockInfo.totalLowInStock} Product</p> : <p>{stockInfo.totalLowInStock} Products</p>} <span >)</span></div>
                                            </div>
                                        </Link>
                                        </div>
                                    )}
                                    {showNotificationExpired && (
                                        <div className='bg-red-100 px-3 text-gray-600 py-2  flex items-center justify-between border-b border-gray-400'>
                                        <Link to="/admin/items/expired-items" className='flex items-center  gap-4'>
                                            <TrendingDown className='border-2 border-red-300 text-red-500 w-9 h-9 p-1 rounded-full'/>
                                            <div className='flex flex-col'>
                                            <p className='text-lg'>Products Expired</p>
                                            <div className='flex gap-2 text-base items-center font-semibold'><span >(</span>{ (stockInfo.totalExpiredProducts == 1) ? <p>{stockInfo.totalExpiredProducts} Product</p> : <p>{stockInfo.totalExpiredProducts} Products</p>} <span>)</span></div>
                                            </div>
                                        </Link>
                                        </div>
                                    )}
                                </div>
                            ):(
                                <div className=' flex flex-col gap-3 text-gray-500 justify-center items-center h-[75vh]'>
                                    <div><Bell size={50}/></div> 
                                    <div><p>All products are in stock and up to date!</p></div>
                                </div>
                            )} */}
                        </div>
                    )} 
            {/* <div className='cursor-pointer relative'>
                
                <div 
                    className='relative w-9 h-9 hover:bg-gray-300 rounded-full flex justify-center items-center' 
                    onMouseEnter={() => setShowNotifiactionTitle(true)} 
                    onMouseLeave={() => setShowNotifiactionTitle(false)}
                >
                    <Bell 
                        size={27} 
                        fill={showNotifications ? `rgb(55, 65, 81)` : '#F3F4F6'} 
                        strokeWidth={2}  
                        onClick={() => setShowNotifications(!showNotifications)} 
                    />
                    {showNotificationTitle && (
                        <div className='absolute  top-12 right-0 text-sm px-3 py-1 text-white bg-gray-600 rounded-lg'>
                            <p>Notifications</p>
                        </div>
                    )}
                    {(numberOfNotifications > 0) && (
                        <div className='absolute w-6 h-6 border-[#F3F4F6] border-3 text-sm bg-red-600 text-white flex justify-center items-center rounded-full bottom-4 left-4'><p>{numberOfNotifications}</p></div>
                    )}
                </div>
                {showNotifications && (
                    <div className=' absolute z-20 bg-white w-96 h-[85vh] right-10 top-0 rounded-xl shadow-2xl'>
                        <div className=' border-gray-400 shadow-lg text-gray-600 px-3 py-3 text-lg'>Notifications</div>
                        {(showNotificationExpired || showNotificationLowInStock || showNotificationOutOfStock) 
                        ?(
                            <div className='flex flex-col gap-[0.1px] mt-3'>
                                {showNotificationOutOfStock && (
                                    <div className='bg-blue-100 px-3 text-gray-600 py-2  flex items-center justify-between border-b border-gray-400'>
                                    <Link to="/admin/items/out-of-stock" className='flex items-center   gap-4'>
                                        <TrendingDown className=' border-2 border-blue-300 text-blue-500 w-9 h-9 p-1 rounded-full'/>
                                        <div className='flex flex-col'>
                                        <p className='text-base'>Products Out Of Stock</p>
                                        <div className='flex gap-2 items-center text-base font-semibold'><span className=''>(</span>{ (stockInfo.totalOutOfStock == 1) ? <p>{stockInfo.totalOutOfStock} Product</p> : <p>{stockInfo.totalOutOfStock} Products</p>} <span>)</span></div>
                                        </div>
                                    </Link>
                                    </div>
                                )}
                                {showNotificationLowInStock && (
                                    <div className='bg-orange-100 px-3 text-gray-600 py-2  flex items-center justify-between border-b border-gray-400'>
                                    <Link to="/admin/items/low-in-stock" className='flex items-center  gap-4'>
                                        <TrendingDown className='border-2 border-orange-300  text-orange-500 w-9 h-9 p-1 rounded-full'/>
                                        <div className='flex flex-col'>
                                        <p className='text-base'>Products Low In Stock</p>
                                        <div className='flex gap-2 items-center text-base font-semibold'><span >(</span>{ (stockInfo.totalLowInStock == 1) ? <p>{stockInfo.totalLowInStock} Product</p> : <p>{stockInfo.totalLowInStock} Products</p>} <span >)</span></div>
                                        </div>
                                    </Link>
                                    </div>
                                )}
                                {showNotificationExpired && (
                                    <div className='bg-red-100 px-3 text-gray-600 py-2  flex items-center justify-between border-b border-gray-400'>
                                    <Link to="/admin/items/expired-items" className='flex items-center  gap-4'>
                                        <TrendingDown className='border-2 border-red-300 text-red-500 w-9 h-9 p-1 rounded-full'/>
                                        <div className='flex flex-col'>
                                        <p className='text-lg'>Products Expired</p>
                                        <div className='flex gap-2 text-base items-center font-semibold'><span >(</span>{ (stockInfo.totalExpiredProducts == 1) ? <p>{stockInfo.totalExpiredProducts} Product</p> : <p>{stockInfo.totalExpiredProducts} Products</p>} <span>)</span></div>
                                        </div>
                                    </Link>
                                    </div>
                                )}
                            </div>
                        ):(
                            <div className=' flex flex-col gap-3 text-gray-500 justify-center items-center h-[75vh]'>
                                <div><Bell size={50}/></div> 
                                <div><p>All products are in stock and up to date!</p></div>
                            </div>
                        )}
                    </div>
                )} 
                
            </div> */}
        </div>
           
            
      
        

    
  )
}

export default Notifications
