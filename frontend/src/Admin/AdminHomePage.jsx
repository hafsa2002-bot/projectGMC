import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FileText, Folder, Layers, PackageX, TrendingDown, TriangleAlert, Wallet, X} from 'lucide-react'

function AdminHomePage() {
  const [stockInfo, setStockInfo] = useState({})
  const [showNotificationOutOfStock, setShowNotificationOutOfStock]= useState(false)
  const [showNotificationLowInStock, setShowNotificationLowInStock]= useState(false)
  const [showNotificationExpired, setShowNotificationExpired]= useState(false)
  const getStockInfo = () => {
    axios.get("http://localhost:3003/admin/stock")
      .then(response => {
        setStockInfo(response.data)
        console.log("Stock info :", response.data)
      })
      .catch(error => console.log("error: ", error))
  }
  const showOutOfStock = () => {
    if(stockInfo.totalOutOfStock > 0 ) setShowNotificationOutOfStock(true)
    else setShowNotificationOutOfStock(false)
  }
  const showLowInStock = () => {
    if(stockInfo.totalLowInStock > 0 ) setShowNotificationLowInStock(true)
    else setShowNotificationLowInStock(false)
  }
  const showExpired = () => {
    if(stockInfo.totalExpiredProducts > 0 ) setShowNotificationExpired(true)
    else setShowNotificationExpired(false)
  }
  useEffect(() => {
    getStockInfo();
  }, [])

  useEffect(() => {
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
    <div>
      <div className='border-b mb-5 border-gray-400 flex justify-between items-center py-5'>
        <div className='text-3xl text-gray-700 font-semibold'>
            <p>Dashboard</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        {
          showNotificationOutOfStock && (
            <div className='bg-blue-100 px-3 text-gray-600 py-2 rounded-lg flex items-center justify-between'>
              <Link to="/admin/items/out-of-stock" className='flex items-center  gap-4'>
                <TrendingDown className=' border-2 border-blue-300 text-blue-500 w-8 h-8 p-1 rounded-full'/>
                <div className='flex gap-3 items-center'>
                  <p className='text-lg'>Products Out Of Stock</p>
                  <div className='flex gap-2 items-center font-semibold'><span className='text-lg'>(</span>{ (stockInfo.totalOutOfStock == 1) ? <p>{stockInfo.totalOutOfStock} Product</p> : <p>{stockInfo.totalOutOfStock} Products</p>} <span className='text-lg'>)</span></div>
                </div>
              </Link>
              <div><X className='cursor-pointer' onClick={() => setShowNotificationOutOfStock(false)}/></div>
            </div>
          )
        }
        {
          showNotificationLowInStock && (
            <div className='bg-orange-50 px-3 text-gray-600 py-2 rounded-lg flex items-center justify-between'>
              <Link to="/admin/items/low-in-stock" className='flex items-center  gap-4'>
                <TrendingDown className='bg-orange-100 text-orange-500 w-8 h-8 p-1 rounded-full'/>
                <div className='flex gap-3 items-center'>
                  <p className='text-lg'>Products Low In Stock</p>
                  <div className='flex gap-2 items-center font-semibold'><span className='text-lg'>(</span>{ (stockInfo.totalLowInStock == 1) ? <p>{stockInfo.totalLowInStock} Product</p> : <p>{stockInfo.totalLowInStock} Products</p>} <span className='text-lg'>)</span></div>
                </div>
              </Link>
              <div><X className='cursor-pointer' onClick={() => setShowNotificationLowInStock(false)}/></div>
            </div>
          )
        }
        {
          showNotificationExpired && (
            <div className='bg-red-50 px-3 text-gray-600 py-2 rounded-lg flex items-center justify-between'>
              <Link to="/admin/items/expired-items" className='flex items-center  gap-4'>
                <TrendingDown className='bg-red-100 text-red-500 w-8 h-8 p-1 rounded-full'/>
                <div className='flex gap-3 items-center'>
                  <p className='text-lg'>Products Expired</p>
                  <div className='flex gap-2 items-center font-semibold'><span className='text-lg'>(</span>{ (stockInfo.totalExpiredProducts == 1) ? <p>{stockInfo.totalExpiredProducts} Product</p> : <p>{stockInfo.totalExpiredProducts} Products</p>} <span className='text-lg'>)</span></div>
                </div>
              </Link>
              <div><X className='cursor-pointer' onClick={() => setShowNotificationExpired(false)}/></div>
            </div>
          )
        }
      </div>
      <div className='px-3'>
        <p className='text-2xl font-semibold text-gray-700 mt-7 mb-4'>Inventory Summary</p>
        <div className='flex justify-between'>
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center'><FileText /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalProducts}</p>
              <p>Items</p>
            </div>
          </div>
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-yellow-100 text-yellow-400 flex justify-center items-center'><Folder fill='rgb(250, 204, 21)' /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalCategories}</p>
              <p>Categories</p>
            </div>
          </div>
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex justify-center items-center'><Layers /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalItems}</p>
              <p>Total Quantity</p>
            </div>
          </div>
          <div className='w-1/5 py-5 bg-white rounded-lg flex flex-col gap-3 justify-center items-center'>
            <div className='w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex justify-center items-center'><Wallet /></div>
            <div className='text-center text-gray-500'>
              <p className='font-semibold text-xl'>{stockInfo.totalValue} DH</p>
              <p>Total Value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHomePage
