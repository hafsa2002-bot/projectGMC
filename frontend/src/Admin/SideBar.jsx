import { FileClock, LayoutDashboard, Package, Power, ScanBarcode, Search, Settings, ShoppingCart, SquareKanban, UsersRound } from 'lucide-react'
import React, {useState} from 'react'
import { Outlet, Link } from 'react-router-dom'

function SideBar() {
    const [showSettings, setShowSettings] = useState(false)
  return (
    <div className='flex'>
        <nav className='fixed text-stone-700 left-0 flex flex-col justify-between items-center bg-blue-500 w-20 h-screen'>
            <div className='text-5xl text-white font-bold mt-3'>
                <Link to={"/admin"}>N</Link>
            </div>
            <div className='flex flex-col gap-7'>
                <div className='cursor-pointer'>
                    <LayoutDashboard/>
                </div>
                <div className='cursor-pointer'>
                    <Package/>
                </div>
                <div className='cursor-pointer'>
                    <ScanBarcode/>
                </div>
                <div className='cursor-pointer'>
                    <Search/>
                </div>
                <div className='cursor-pointer'>
                    <ShoppingCart/>
                </div>
                <div className='cursor-pointer'>
                    <SquareKanban className='rotate-90'/>
                </div>
                <div className='cursor-pointer'>
                    {/* <History/> */}
                    <FileClock/>
                </div>
                <div className='cursor-pointer'>
                    <UsersRound/>
                </div>
            </div>
            <div className='relative mb-3 cursor-pointer' onClick={() => setShowSettings(!showSettings)}>
                <Settings/>
                {showSettings && (
                    <div className='absolute w-52  py-2 left-16 bottom-0 bg-white border border-gray-400 rounded-md'>
                        <div className='flex items-center gap-3 border-b border-gray-400 px-3 pb-2'>
                            {/* first letter of userName */}
                            <div className='bg-gray-200 w-7 h-7  rounded-full flex justify-center items-center'>
                                <p className='text-lg font-semibold text-gray-500'>H</p> 
                            </div>
                            <div className='font-medium '>
                                <p>hafsa</p>
                            </div>
                        </div>
                        <div  className='flex gap-3 pt-2 px-3'>
                            <div>
                                <Settings/>
                            </div>
                            <div>
                                <p>Settings</p>
                            </div>
                        </div>
                        <div className='flex gap-3 py-2 px-3'>
                            <div>
                                <Power/>
                            </div>
                            <div>
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
        <div className='ml-32'>
            <Outlet/>
        </div>
        
    </div>
  )
}

export default SideBar

