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
import DashboardOrders from './DashboardOrders'
import WeekReport from '../Reports/WeekReport'
import IncomeReports from './IncomeReports'

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
    <div className='lg:px-0  px-0 font-poppins'>
      <div className='lg:pl-0 pl-3 pr-10 bg-gray-100  border-gray-400 flex justify-between items-center pt-5'>
        <div className='text-3xl pb-5 text-blue-600 border-b-3 font-semibold font-poppins'>
            <p>Dashboard</p>
        </div>
        <div className='lg:flex hidden pb-5'>
          <Notifications/>
        </div>
      </div>
      <hr className='lg:w-full w-11/12 lg:m-0 m-auto mb-5 lg:pl-0 text-gray-400'/>
      <div className=' mt-7 text-xl  text-red-600'>
        <p>Hello, Hafsa Barhoud</p>
        <p>Welcome back</p>
      </div>
      {/*Inventory Summary */}
      <section className=' mt-7'>
        {/* <p className='text-2xl font-semibold text-gray-700 mt-7 mb-4 lg:pl-0 pl-3'>Inventory Summary</p> */}
        <div className='flex lg:flex-nowrap flex-wrap lg:gap-10 gap-8 lg:justify-between justify-center '>
          {/* Number of Items bg-blue-100 text-blue-600 */}
          <div className='lg:w-1/4 w-5/12 py-5 bg-white rounded-lg  hidden flex-col gap-3 justify-center items-center  '>
            <div className='w-10 h-10 rounded-lg bg-blue-500 text-white flex justify-center items-center'><FileText /></div>
            <div className='text-center text-gray-600'>
              <div className='font-semibold text-xl text-black'>{stockInfo.totalProducts ? stockInfo.totalProducts :<p className='text-lg font-semibold'>N/A</p> }</div>
              <p>Items</p>
            </div>
          </div>
          {/* Number of categories bg-yellow-100 text-yellow-400 */}
          {/* <div className='lg:w-1/4 w-5/12 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center '>
            <div className='w-10 h-10 rounded-lg bg-blue-500 text-white flex justify-center items-center'><Folder fill='white'/></div>
            <div className='text-center text-gray-500'>
              <div className='font-semibold text-xl text-black'>{stockInfo.totalCategories ? stockInfo.totalCategories : <p className='text-lg font-semibold'>N/A</p>}</div>
              <p>Categories</p>
            </div>
          </div> */}
          <div className='lg:w-1/4 w-5/12 border border-gray-300 py-5 px-4 bg-white rounded-lg flex justify-between gap-3 items-center '>
            <div className='w-10 h-10 rounded-lg bg-blue-500 text-white flex justify-center items-center'><Folder fill='white'/></div>
            <div className='text-end text-gray-600'>
              <p className='text-lg'>Categories</p>
              <div className='font-semibold text-2xl text-black'>{stockInfo.totalCategories ? stockInfo.totalCategories : <p className='text-lg font-semibold'>N/A</p>}</div>
            </div>
          </div>
          {/* Total Quantity bg-purple-100 text-purple-600 */}
          <div className='lg:w-1/4 w-5/12 border border-gray-300 py-5 px-4 bg-white rounded-lg flex  gap-3 justify-between items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center'><Layers /></div>
            <div className='text-end text-gray-600'>
              <p className='text-lg'>Total Quantity</p>
              <div className='font-semibold text-2xl text-black'>{stockInfo.totalItems ? stockInfo.totalItems : <p className='text-lg font-semibold'>N/A</p>}</div>
            </div>
          </div>
          {/* Total Value bg-green-100 text-green-600 */}
          <div className='lg:w-1/4 w-5/12 border border-gray-300 py-5 px-4 bg-white rounded-lg flex gap-3 justify-between items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center'><Wallet /></div>
            <div className='text-end text-gray-600 w-11/12'>
              <p className='text-lg'>Total Value</p>
              <div className='font-semibold text-2xl text-black'>{stockInfo.totalValue ? stockInfo.totalValue.toFixed(2) :<p className='text-lg font-semibold'>N/A</p>} DH</div>
            </div>
          </div>
          {/* awaiting payment bg-orange-100 text-orange-600 */}
          <div className='lg:w-1/4 w-5/12 border border-gray-300 py-5 px-4 bg-white rounded-lg flex gap-3 justify-between items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center'><NotebookPen /></div>
            <div className='text-end text-gray-600 '>
              <p className='text-lg'>Awaiting Payment</p>
              <div className='font-semibold text-2xl text-black'>{stockInfo.totalUnpaid ? stockInfo.totalUnpaid.toFixed(2) :<p className='text-lg font-semibold'>N/A</p>} DH</div>
            </div>
          </div>
        </div>
      </section>
      {/* recent orders */}
      <section className='mt-7 '>
        <RecentOrders/>
      </section>
      {/* <section className='mt-14'>
        <div className="">
          <DashboardOrders/>
        </div>
      </section> */}
      {/* reports */}
      <section className='flex flex-col mt-14 '>
        <h1 className='lg:ml-0 ml-3 text-2xl font-bold text-gray-900'>Reports</h1>
        <div className='lg:flex gap-5 '>
          <div className='lg:w-1/2 w-11/12 m-auto lg:mx-0'>
            <h1 className='text-xl font-semibold pb-3'>Income tracker</h1>
            <div className=' bg-white rounded-xl border border-gray-300 lg:py-7 py-4'>
              <IncomeReports/>
            </div>

          </div>
          <div className='h-1/2 bg-green-100'>
            <p>Pipe line charts : popular products</p>
          </div>
        </div>
      </section>

      <section className='lg:flex lg:mt-14 mt-9 gap-6 '>
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
      
      {/* recent Items added */}
      <section className='mb-32  '>
        <RecentItems/>
      </section>
    </div>
  )
}

export default AdminHomePage
