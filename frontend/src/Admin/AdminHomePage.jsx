import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Bell, FileText, Folder, Layers, PackageX, TrendingDown, TriangleAlert, Wallet, X} from 'lucide-react'
import RecentItems from './RecentItems'
import RecentCategories from './RecentCategories'
import RecentActivities from './RecentActivities'
import DashboardStockLevels from './DashboardStockLevels'

function AdminHomePage() {
  const [stockInfo, setStockInfo] = useState({})
  const [showNotifications, setShowNotifications] = useState(false)
  const [showNotificationTitle, setShowNotifiactionTitle] = useState(false)
  const [showNotificationOutOfStock, setShowNotificationOutOfStock]= useState(false)
  const [showNotificationLowInStock, setShowNotificationLowInStock]= useState(false)
  const [showNotificationExpired, setShowNotificationExpired]= useState(false)
  const [numberOfNotifications, setNumberOfNotifications] = useState(0)
  const getStockInfo = () => {
    axios.get("http://localhost:3003/admin/stock")
      .then(response => {
        setStockInfo(response.data)
        // console.log("Stock info :", response.data)
      })
      .catch(error => console.log("error: ", error))
  }

  const showOutOfStock = () => {
    if(stockInfo.totalOutOfStock > 0 ){
      setShowNotificationOutOfStock(true)
      // setNumberOfNotifications(prev => prev+1)
    } 
    else setShowNotificationOutOfStock(false)
  }

  const showLowInStock = () => {
    if(stockInfo.totalLowInStock > 0 ){
      setShowNotificationLowInStock(true)
      // setNumberOfNotifications(prev => prev+1)
    } 
    else setShowNotificationLowInStock(false)
  }
  
  const showExpired = () => {
    if(stockInfo.totalExpiredProducts > 0 ){
      setShowNotificationExpired(true)
      // setNumberOfNotifications(prev => prev+1)
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
  }, [])
  
  useEffect(() => {
    calculateNumberOfNotifications()

    if(stockInfo.totalOutOfStock !== undefined){
      showOutOfStock()
    }
    if(stockInfo.totalLowInStock !== undefined){
      showLowInStock()
    }
    if(stockInfo.totalExpiredProducts !== undefined){
      showExpired()
    }
  }, [stockInfo])
  return (
    <div className='px-3'>
      <div className=' sticky top-0 w-full pr-10 bg-gray-100  border-gray-400 flex justify-between items-center py-5'>
        <div className='text-3xl text-gray-700 font-semibold'>
            <p>Dashboard</p>
        </div>
        <div className='cursor-pointer relative'>
          <div className='relative w-9 h-9 hover:bg-gray-300 rounded-full flex justify-center items-center' onMouseEnter={() => setShowNotifiactionTitle(true)} onMouseLeave={() => setShowNotifiactionTitle(false)}>
            <Bell 
              size={27} 
              fill={showNotifications ? `rgb(55, 65, 81)` : '#F3F4F6'} 
              strokeWidth={2}  
              onClick={() => setShowNotifications(!showNotifications)} 
              />
              {showNotificationTitle && (
                <div className='absolute top-12 right-0 text-sm px-3 py-1 text-white bg-gray-600 rounded-lg'>
                  <p>Notifications</p>
                </div>
              )}
              {(numberOfNotifications > 0) && (
                <div className='absolute w-6 h-6 border-[#F3F4F6] border-3 text-sm bg-red-600 text-white flex justify-center items-center rounded-full bottom-4 left-4'><p>{numberOfNotifications}</p></div>
              )}
          </div>
            {showNotifications && (
              <div className=' absolute bg-white w-96 h-[85vh] right-10 top-0 rounded-xl shadow-2xl'>
                <div className=' border-gray-400 shadow-lg text-gray-600 px-3 py-3 text-lg'>Notifications</div>
                  {(showNotificationExpired || showNotificationLowInStock || showNotificationOutOfStock) ? (
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
                                {/* <div><X className='cursor-pointer' onClick={() => setShowNotificationOutOfStock(false)}/></div> */}
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
                                {/* <div><X className='cursor-pointer' onClick={() => setShowNotificationLowInStock(false)}/></div> */}
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
                                {/* <div><X className='cursor-pointer' onClick={() => setShowNotificationExpired(false)}/></div> */}
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
        </div>
      </div>
        <hr className='w-full mb-5 text-gray-400'/>
      {/* Inventory Summary */}
      <div className=''>
        <p className='text-2xl font-semibold text-gray-700 mt-7 mb-4'>Inventory Summary</p>
        <div className='flex justify-between'>
          {/* Number of Items */}
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center'><FileText /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalProducts ? stockInfo.totalProducts :<p className='text-lg font-semibold'>N/A</p> }</p>
              <p>Items</p>
            </div>
          </div>
          {/* Number of categories */}
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-yellow-100 text-yellow-400 flex justify-center items-center'><Folder fill='rgb(250, 204, 21)' /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalCategories ? stockInfo.totalCategories : <p className='text-lg font-semibold'>N/A</p>}</p>
              <p>Categories</p>
            </div>
          </div>
          {/* Total Quantity */}
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex justify-center items-center'><Layers /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalItems ? stockInfo.totalItems : <p className='text-lg font-semibold'>N/A</p>}</p>
              <p>Total Quantity</p>
            </div>
          </div>
          {/* Total Value */}
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex justify-center items-center'><Wallet /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalValue ? stockInfo.totalValue :<p className='text-lg font-semibold'>N/A</p>} DH</p>
              <p>Total Value</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex mt-7 gap-5'>
        {/* Recent Activity */}
        <div className='w-1/2 bg-white rounded-lg overflow-hidden'>
            <RecentActivities/>
        </div>
        {/* Low In Stock Products */}
        <div className='w-1/2 bg-white rounded-lg overflow-hidden'>
          <DashboardStockLevels/>
        </div>
      </div>
      {/* recent Items added */}
      <div>
        <RecentItems/>
      </div>
      {/* Recent categories */}
      <div>
        <RecentCategories/>
      </div>
    </div>
  )
}

export default AdminHomePage
