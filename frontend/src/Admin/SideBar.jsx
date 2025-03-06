import { FileClock, LayoutDashboard, Package, Power, ScanBarcode, Search, Settings, ShoppingCart, SquareKanban, UsersRound } from 'lucide-react'
import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'

function SideBar() {
    const [showSettings, setShowSettings] = useState(false)
  return (
    <div className='flex'>
        <nav className='fixed left-0'>
            <div>
                <LayoutDashboard/>
            </div>
            <div className=''>
                <Package/>
            </div>
            <div>
                <ScanBarcode/>
            </div>
            <div>
                <Search/>
            </div>
            <div>
                <ShoppingCart/>
            </div>
            <div>
                <SquareKanban className='rotate-90'/>
            </div>
            <div>
                {/* <History/> */}
                <FileClock/>
            </div>
            <div>
                <UsersRound/>
            </div>
            <div className='relative' onClick={() => setShowSettings(!showSettings)}>
                <Settings/>
                {showSettings && (
                    <div>
                        <div>
                            {/* first letter of userName */}
                            <div>H</div>
                            <div>Hafsa</div>
                        </div>
                        <div>
                            <div>
                                <Settings/>
                            </div>
                            <div>
                                <p>Settings</p>
                            </div>
                        </div>
                        <div>
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
        <Outlet/>
    </div>
  )
}

export default SideBar

