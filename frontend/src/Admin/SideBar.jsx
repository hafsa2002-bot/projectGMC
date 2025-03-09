import { FileClock, LayoutDashboard, Package, Power, ScanBarcode, Search, Settings, ShoppingCart, SquareKanban, UsersRound } from 'lucide-react'
import React, {useState} from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'

function SideBar() {
    const [showSettings, setShowSettings] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)
    const [showItems, setShowItems] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const [showReports, setShowReports] = useState(false)
    const [showActivities, setShowActivities] = useState(false)
    const [showMembers, setShowMembers] = useState(false)
    const [showSettingsName, setShowSettingsName] = useState(false)
    
  return (
    <div className='flex bg-gray-100 min-h-screen'>
        <nav className='fixed  text-neutral-500 left-0 flex flex-col justify-between items-center bg-white w-20 h-screen border-r border-gray-300 shadow-lg'>
            <div className=' flex justify-center items-center text-2xl w-10 h-10 rounded-full bg-blue-200 text-blue-600 font-semibold mt-3'>
                <Link to={"/admin"}>N</Link>
            </div>
            <div className='flex flex-col gap-9'>
                <NavLink 
                    to="/admin" 
                    className={({ isActive }) => isActive && window.location.pathname === "/admin" ? 'relative cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'relative  px-4 py-1.5 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg'}
                    onMouseEnter={() => setShowDashboard(true)}
                    onMouseLeave={() => setShowDashboard(false)}
                >
                    <LayoutDashboard/>
                    {
                        showDashboard && (
                            <div className='absolute left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Dashboard</p>
                            </div>
                        )
                    }
                </NavLink>
                <NavLink 
                    to="/admin/items" 
                    className={({ isActive }) => isActive ? 'relative  cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'relative px-4 py-1.5 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg'}
                    onMouseEnter={() => setShowItems(true)}
                    onMouseLeave={() => setShowItems(false)}
                    >
                    <Package/>
                    {
                        showItems && (
                            <div className='absolute left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Items</p>
                            </div>
                        )
                    }
                </NavLink>
                {/* <NavLink to="/admin" className={({ isActive }) => isActive ? 'cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'px-4 py-1.5 cursor-pointer text-gray-600'}>
                    <ScanBarcode/>
                </NavLink> */}
                <NavLink 
                    to="/admin/search" 
                    className={({ isActive }) => isActive ? 'relative cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'relative px-4 py-1.5 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg'}
                    onMouseEnter={() => setShowSearch(true)}
                    onMouseLeave={() => setShowSearch(false)}
                >
                    <Search/>
                    {
                        showSearch && (
                            <div className='absolute left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Search</p>
                            </div>
                        )
                    }
                </NavLink>
                <NavLink 
                    to="/admin/purshase-order" 
                    className={({ isActive }) => isActive ? 'relative cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'relative px-4 py-1.5 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg'}
                    onMouseEnter={() => setShowOrder(true)}
                    onMouseLeave={() => setShowOrder(false)}
                    >
                    <ShoppingCart/>
                    {
                        showOrder && (
                            <div className='absolute left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Orders</p>
                            </div>
                        )
                    }
                </NavLink>
                <NavLink 
                    to="/admin/reports"  
                    className={({ isActive }) => isActive ? 'relative cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'relative px-4 py-1.5 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg'}
                    onMouseEnter={() => setShowReports(true)}
                    onMouseLeave={() => setShowReports(false)}
                >
                    <SquareKanban className='rotate-180'/>
                    {
                        showReports && (
                            <div className='absolute left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Reports</p>
                            </div>
                        )
                    }
                </NavLink>
                <NavLink 
                    to="/admin/activities" 
                    className={({ isActive }) => isActive ? 'relative cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'relative px-4 py-1.5 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg'}
                    onMouseEnter={() => setShowActivities(true)}
                    onMouseLeave={() => setShowActivities(false)}
                >
                    {/* <History/> */}
                    <FileClock/>
                    {
                        showActivities && (
                            <div className='absolute w-28 text-center left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Activity Log</p>
                            </div>
                        )
                    }
                </NavLink>
                <NavLink 
                    to="/admin/members" 
                    className={({ isActive }) => isActive ? 'relative cursor-pointer text-blue-500 bg-gray-100 px-4 py-1.5 rounded-lg' : 'relative px-4 py-1.5  cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg'}
                    onMouseEnter={() => setShowMembers(true)}
                    onMouseLeave={() => setShowMembers(false)}
                    >
                    <UsersRound/>
                    {
                        showMembers && (
                            <div className='absolute left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Members</p>
                            </div>
                        )
                    }
                </NavLink>
            </div>
            <div 
                className='relative mb-3 cursor-pointer ' 
                onClick={() => setShowSettings(!showSettings)}
                onMouseEnter={() => setShowSettingsName(true)}
                onMouseLeave={() => setShowSettingsName(false)}
            >
                <Settings/>
                {
                        showSettingsName && (
                            <div className='absolute left-20 bottom-0 text- px-3 py-1 text-white bg-gray-700 rounded-lg'>
                                <p>Settings</p>
                            </div>
                        )
                    }
                {showSettings && (
                    <div className=' text-stone-500 absolute w-52  py-2 left-16 bottom-0 bg-white border border-gray-400 rounded-md'>
                        <div className='flex items-center gap-3 border-b border-gray-400 px-3 pb-2'>
                            {/* first letter of userName */}
                            <div className='bg-gray-200 w-9 h-9 border-2 border-blue-300  rounded-full flex justify-center items-center'>
                                <p className='text-lg font-semibold text-gray-600'>HB</p> 
                            </div>
                            <div className='font-medium text-gray-600'>
                                <p>Hafsa Barhoud</p>
                            </div>
                        </div>
                        <div  className='flex items-center gap-3 pt-2 px-3'>
                            <div>
                                <Settings size={20} />
                            </div>
                            <div>
                                <p>Settings</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 py-2 px-3'>
                            <div>
                                <Power size={20} />
                            </div>
                            <div>
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
        <div className='ml-32 w-11/12 mr-8 mt-3'>
            <Outlet/>
        </div>
        
    </div>
  )
}

export default SideBar

