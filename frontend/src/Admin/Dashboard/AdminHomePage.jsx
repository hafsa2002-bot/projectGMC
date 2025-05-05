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
import { jwtDecode } from 'jwt-decode'
import MostPopularCharts from '../Reports/MostPopularCharts'

function AdminHomePage() {
  const [stockInfo, setStockInfo] = useState({})
  const [user, setUser] = useState({})
  const token = localStorage.getItem("token");
  const today = new Date();

  const fetchData = () => {
      axios.get("http://localhost:3003/users/data", {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
          .then(response => setUser(response.data))
          .catch(error => {
              console.log("Error: ", error)
              if (error.response && error.response.status === 401) {
                  // Unauthorized, likely token expired or invalid
                  handleLogout()
              }
          })
  }
  
  const getStockInfo = () => {
    axios.get("http://localhost:3003/admin/stock")
      .then(response => {
        setStockInfo(response.data)
      })
      .catch(error => console.log("error: ", error))
  }
  useEffect(() => {
    getStockInfo();
    fetchData()
  }, [])
  
  return (
    <div className='lg:px-0  px-0'>
      <div className='lg:pl-0 pl-3 pr-10 bg-gray-100  border-gray-400 flex justify-between items-center pt-5'>
        <div className='text-3xl pb-5 text-blue-600 border-b-3 font-semibold font-poppins'>
            <p>Dashboard</p>
        </div>
        <div className='lg:flex hidden pb-5'>
          <Notifications/>
        </div>
      </div>
      <hr className='lg:w-full w-11/12 lg:m-0 m-auto mb-5 lg:pl-0 text-gray-400'/>
      {/* hello section */}
      <div className="py-4 px-2  mt-2 ">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Hello, {user?.name} 👋
        </h1>
        <p className="text-gray-600">Today is: {today.toDateString()}</p>
      </div>
      {/*Inventory Summary */}
      <section className=' mt-4'>
        {/* <p className='text-2xl font-semibold text-gray-700 mt-7 mb-4 lg:pl-0 pl-3'>Inventory Summary</p> */}
        <div className='flex lg:flex-nowrap flex-wrap lg:gap-10 gap-8 lg:justify-between justify-center '>
          {/* Total Items */}
          <div className='lg:w-1/4 w-5/12 border border-gray-300 lg:py-5 py-3 px-4 bg-white rounded-lg  lg:flex lg:flex-row flex-col gap-3 lg:justify-between justify-center items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center lg:mx-0 mx-auto '><Layers /></div>
            <div className='lg:text-end text-center lg:mt-0 mt-2 text-gray-600'>
              <p className='text-lg'>Total Items</p>
              <div className='font-semibold  lg:text-2xl text-lg text-black'>{stockInfo.totalProducts ? stockInfo.totalProducts : <p className='text-lg font-semibold'>N/A</p>}</div>
            </div>
          </div>
          {/* total categories */}
          <div className='lg:w-1/4 w-5/12 border border-gray-300 lg:py-5 py-3 px-4 bg-white rounded-lg  lg:flex lg:flex-row flex-col gap-3 lg:justify-between justify-center items-center '>
            <div className='w-10 h-10 rounded-lg bg-blue-500 text-white flex justify-center items-center lg:mx-0 mx-auto '><Folder fill='white'/></div>
            <div className='lg:text-end text-center lg:mt-0 mt-2 text-gray-600'>
              <p className='text-lg'>Categories</p>
              <div className='font-semibold  lg:text-2xl text-lg text-black'>{stockInfo.totalCategories ? stockInfo.totalCategories : <p className='text-lg font-semibold'>N/A</p>}</div>
            </div>
          </div>
          {/* Total Value*/}
          <div className='lg:w-1/4 w-5/12  border border-gray-300 lg:py-5 py-3 px-4 bg-white rounded-lg lg:flex lg:flex-row flex-col gap-3 lg:justify-between justify-center  items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center lg:mx-0 mx-auto '><Wallet /></div>
            <div className='lg:text-end text-center lg:mt-0 mt-2 text-gray-600 w-11/12  '>
              <p className='text-lg'>Total Value</p>
              <div className='font-semibold lg:text-2xl text-lg text-black'>{stockInfo.totalValue ? stockInfo.totalValue.toFixed(2) :<p className='text-lg font-semibold'>N/A</p>} DH</div>
            </div>
          </div>
          {/* awaiting payment*/}
          <div className='lg:w-1/4 w-5/12 border border-gray-300 lg:py-5 py-3 px-4 bg-white rounded-lg  lg:flex lg:flex-row flex-col gap-3 justify-between items-center '>
            <div className='w-10 h-10 rounded-lg text-white bg-blue-500 flex justify-center items-center lg:mx-0 mx-auto '><NotebookPen /></div>
            <div className='lg:text-end text-center lg:mt-0 mt-2 text-gray-600 '>
              <p className='text-lg'>Awaiting Payment</p>
              <div className='font-semibold  lg:text-2xl text-lg text-black'>{stockInfo.totalUnpaid ? stockInfo.totalUnpaid.toFixed(2) :<p className='text-lg font-semibold'>N/A</p>} DH</div>
            </div>
          </div>
        </div>
      </section>

      {/* reports */}
      <section className='mt-9 '>
        {/* <h1 className='lg:ml-0 ml-3 text-2xl font-bold text-gray-900'>Reports</h1> */}
        <div className='lg:flex items-center justify-between gap-5 '>
          <div className='lg:w-1/2 w-11/12 m-auto lg:mx-0'>
            <h1 className='text-xl font-semibold pb-3'>Income tracker</h1>
            <div className=' bg-white rounded-xl border border-gray-300 lg:py-7 py-4'>
              <IncomeReports/>
            </div>

          </div>
          <div className='lg:w-1/2 w-11/12 lg:mx-0 m-auto lg:mt-0 mt-7'>
            <h1 className='text-xl font-semibold pb-3'>Most Popular Products</h1>
            <div className='hidden bg-white p-2 lg:flex justify-center rounded-lg border border-gray-300'>
              <MostPopularCharts h={240} w={600} outerRad={90} layout="vertical" align="right" verticalAlign="middle" fontSize={12} />
            </div>
            <div className='lg:hidden bg-white flex justify-center px-3 py-4 items-center rounded-lg border border-gray-300 '>
              <MostPopularCharts h={320} w={400} outerRad={120} layout="horizontal" align="left" verticalAlign="bottom" fontSize={14} />
            </div>
          </div>
        </div>
      </section>
      {/* recent orders */}
      <section className='mt-9 '>
        <RecentOrders/>
      </section>
      {/* <section className='mt-14'>
        <div className="">
          <DashboardOrders/>
        </div>
      </section> */}

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
      <section className='mb-10  '>
        <RecentItems/>
      </section>
    </div>
  )
}

export default AdminHomePage
