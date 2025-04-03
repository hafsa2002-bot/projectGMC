import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Bell, FileText, Folder, Layers, NotebookPen, PackageX, TrendingDown, TriangleAlert, Wallet, X} from 'lucide-react'
import RecentItems from './RecentItems'
import RecentCategories from './RecentCategories'
import RecentActivities from './RecentActivities'
import DashboardStockLevels from './DashboardStockLevels'
import RequestedProducts from './RequestedProducts'
import Notifications from './Notifications'
import RecentOrders from './RecentOrders'

function AdminHomePage() {
  const [stockInfo, setStockInfo] = useState({})
  // const [showNotifications, setShowNotifications] = useState(false)
  // const [showNotificationTitle, setShowNotifiactionTitle] = useState(false)
  // const [showNotificationOutOfStock, setShowNotificationOutOfStock]= useState(false)
  // const [showNotificationLowInStock, setShowNotificationLowInStock]= useState(false)
  // const [showNotificationExpired, setShowNotificationExpired]= useState(false)
  // const [numberOfNotifications, setNumberOfNotifications] = useState(0)
  
  const getStockInfo = () => {
    axios.get("http://localhost:3003/admin/stock")
      .then(response => {
        setStockInfo(response.data)
      })
      .catch(error => console.log("error: ", error))
  }
  useEffect(() => {
    getStockInfo();
  }, [stockInfo])
  

  

  return (
    <div className='lg:px-3 px-0'>
      <div className='lg:pl-0 pl-3 pr-10 bg-gray-100  border-gray-400 flex justify-between items-center py-5'>
        <div className='text-3xl text-gray-700 font-semibold'>
            <p>Dashboard</p>
        </div>
        <Notifications/>
      </div>
      <hr className='lg:w-full w-11/12 lg:m-0 m-auto mb-5 lg:pl-0 text-gray-400'/>
      
      {/*Inventory Summary */}
      <section className=''>
        <p className='text-2xl font-semibold text-gray-700 mt-7 mb-4 lg:pl-0 pl-3'>Inventory Summary</p>
        <div className='flex lg:flex-nowrap flex-wrap lg:gap-0 gap-8 lg:justify-between justify-center '>
          {/* Number of Items bg-blue-100 text-blue-600 */}
          <div className='lg:w-1/6 w-5/12 py-5 bg-white rounded-lg lg:flex hidden flex-col gap-3 justify-center items-center  '>
            <div className='w-10 h-10 rounded-lg bg-blue-500 text-white flex justify-center items-center'><FileText /></div>
            <div className='text-center text-gray-500'>
              <div className='font-semibold text-xl'>{stockInfo.totalProducts ? stockInfo.totalProducts :<p className='text-lg font-semibold'>N/A</p> }</div>
              <p>Items</p>
            </div>
          </div>
          {/* Number of categories bg-yellow-100 text-yellow-400 */}
          <div className='lg:w-1/6 w-5/12 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center '>
            <div className='w-10 h-10 rounded-lg bg-blue-500 text-white flex justify-center items-center'><Folder fill='white'/></div>
            <div className='text-center text-gray-500'>
              <div className='font-semibold text-xl'>{stockInfo.totalCategories ? stockInfo.totalCategories : <p className='text-lg font-semibold'>N/A</p>}</div>
              <p>Categories</p>
            </div>
          </div>
          {/* Total Quantity bg-purple-100 text-purple-600 */}
          <div className='lg:w-1/6 w-5/12 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center'><Layers /></div>
            <div className='text-center text-gray-500'>
              <div className='font-semibold text-xl'>{stockInfo.totalItems ? stockInfo.totalItems : <p className='text-lg font-semibold'>N/A</p>}</div>
              <p>Total Quantity</p>
            </div>
          </div>
          {/* Total Value bg-green-100 text-green-600 */}
          <div className='lg:w-1/6 w-5/12 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center'><Wallet /></div>
            <div className='text-center text-gray-500'>
              <div className='font-semibold text-xl'>{stockInfo.totalValue ? stockInfo.totalValue :<p className='text-lg font-semibold'>N/A</p>} DH</div>
              <p>Total Value</p>
            </div>
          </div>
          {/* awaiting payment bg-orange-100 text-orange-600 */}
          <div className='lg:w-1/6 w-5/12 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center'><NotebookPen /></div>
            <div className='text-center text-gray-500'>
              <div className='font-semibold text-xl'>{stockInfo.totalUnpaid ? stockInfo.totalUnpaid :<p className='text-lg font-semibold'>{stockInfo.totalUnpaid}</p>} DH</div>
              <p>Awaiting Payment</p>
            </div>
          </div>
        </div>
      </section>
      <section className='lg:flex lg:mt-14 mt-9 gap-6'>
        {/* Recent Activity */}
        <div className='lg:w-2/5 w-11/12 m-auto  bg-white rounded-lg overflow-hidden'>
            <RecentActivities/>
        </div>
        {/* Low In Stock Products */}
        <div className='lg:w-2/5 w-11/12 m-auto lg:mt-0 mt-9 bg-white rounded-lg overflow-hidden'>
          <DashboardStockLevels/>
        </div>
        {/* Requested Products */}
        <div className='lg:w-1/5 w-11/12 m-auto lg:mt-0 mt-9 bg-white rounded-lg overflow-hidden'>
            <RequestedProducts/>
        </div>
      </section>
      {/* recent orders */}
      <section className='mt-14'>
        <RecentOrders/>
      </section>
      {/* recent Items added */}
      <section className='mb-32 '>
        <RecentItems/>
      </section>
    </div>
  )
}

export default AdminHomePage
