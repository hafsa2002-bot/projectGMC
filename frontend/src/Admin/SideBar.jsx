import { ChevronDown, CircleUserRound, FileClock, History, House, LayoutDashboard, LogOut, Menu, Package, Power, ScanBarcode, Search, Settings, ShoppingCart, SquareKanban, UserRound, UsersRound } from 'lucide-react'
import React, {useEffect, useState} from 'react'
import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function SideBar() {
    const [showSettings, setShowSettings] = useState(false)
    const [showSignOut, setShowSignOut] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showSideBar, setShowSideBar] = useState(false)
    const [user, setUser] = useState({})
    const [firstLetters, setFirstLetters] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    let userRole = null;
    
    if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.role; // Assuming the token has a `role` field
    }
    

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

    const firstLetterOfUserName = () => {
        const fullName = user.name.split(' ')
        const firstName = fullName[0]
        const lastName = fullName[1] || ' '
        const x = firstName[0] + lastName[0]
        // console.log("****** x = ", x)
        setFirstLetters(x.toUpperCase())
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (user && user.name) {
            firstLetterOfUserName()
        }
    }, [user])

    const handleLogout = () => {
        localStorage.removeItem('token')  
        navigate('/')                
    }
    
  return (
    <div className='flex  bg-gray-100 min-h-screen'>
        {/* sidebar for laptop */}
        <nav 
            onMouseEnter={() => setShowSideBar(true)}
            onMouseLeave={() => setShowSideBar(false)}
            className={`lg:flex hidden fixed  text-neutral-500 left-0 flex-col justify-between items-center bg-white h-screen border-r border-gray-300 shadow-lg ${showSideBar ? 'w-48' : 'w-20'}`}>
            <Link  to={"/admin"} onClick={() => setShowSettings(false)} className='outline-none'>
                {showSideBar
                ?(<div className='flex items-center gap-2'><img className='h-8 mt-4' src='/images/N2.png' alt='logo' /><p className='text-black font-poppins text-3xl mt-4'>Nov<span className='text-blue-500'>exa</span></p></div>)
                :(<img className='h-10 mt-4' src='/images/N2.png' alt='logo' />)}
            </Link>
            <div className='flex flex-col gap-4'>
                {/* dashboard */}
                <NavLink to="/admin" onClick={() => setShowSettings(false)} className={({ isActive }) => isActive && window.location.pathname === "/admin" ? 'relative cursor-pointer text-white bg-blue-500 px-3 py-3 rounded-lg font-medium ' : 'relative  px-3 py-3 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-lg'}>
                    {
                        showSideBar ? (
                            <div className='flex justify-start gap-3 items-center'>
                                <LayoutDashboard/>
                                <p className=' font-poppins '>Dashboard</p>
                            </div>
                        ):(<LayoutDashboard className='m-auto'/>)
                    }
                </NavLink>
                {/* items */}
                <NavLink to="/admin/items" onClick={() => setShowSettings(false)} className={({ isActive }) => isActive ? 'relative  cursor-pointer text-white bg-blue-500 px-3 py-3 rounded-lg font-medium ' : 'relative px-3 py-3 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-lg'}>
                    {
                        showSideBar ? (
                            <div className='flex justify-start gap-3 items-center '>
                                <Package/>
                                <p className=' font-poppins '>Items</p>
                            </div>
                        ):(<Package className='m-auto'/>)
                    }
                </NavLink>
                {/* Search */}
                <NavLink to="/admin/search" onClick={() => setShowSettings(false)} className={({ isActive }) => isActive ? 'relative cursor-pointer text-white bg-blue-500 px-3 py-3 rounded-lg font-medium ' : 'relative px-3 py-3 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-lg'}>
                    {
                        showSideBar ? (
                            <div className='flex justify-start gap-3 items-center'>
                                <Search/>
                                <p className='font-poppins '>Search</p>
                            </div>
                        ):(<Search className='m-auto'/>)
                    }
                </NavLink>
                {/* Orders */}
                <NavLink to="/admin/orders" onClick={() => setShowSettings(false)} className={({ isActive }) => isActive || location.pathname.includes("order") ? 'relative cursor-pointer text-white bg-blue-500 px-3 py-3 rounded-lg font-medium ' : 'relative px-3 py-3 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-lg'}>
                    {
                        showSideBar ? (
                            <div className='flex justify-start gap-3 items-center '>
                                <ShoppingCart/>
                                <p className='font-poppins'>Orders</p>
                            </div>
                        ):(<ShoppingCart className='m-auto'/>)
                    }
                </NavLink>
                {/* Reports */}
                <NavLink to="/admin/reports" onClick={() => setShowSettings(false)} className={({ isActive }) => isActive ? 'relative cursor-pointer text-white bg-blue-500 px-3 py-3 rounded-lg font-medium ' : 'relative px-3 py-3 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-lg'}>
                    {
                        showSideBar ? (
                            <div className='flex justify-start gap-3 items-center'>
                                <SquareKanban className='rotate-180'/>
                                <p className='font-poppins '>Reports</p>
                            </div>
                        ):(<SquareKanban className='rotate-180 m-auto'/>)
                    }
                </NavLink>
                {/* Activity Log */}
                <NavLink to="/admin/activities" onClick={() => setShowSettings(false)} className={({ isActive }) => isActive ? 'relative cursor-pointer text-white bg-blue-500 px-3 py-3 rounded-lg font-medium ' : 'relative px-3 py-3 cursor-pointer text-gray-500 hover:bg-gray-100 rounded-lg'}>
                    {
                        showSideBar ? (
                            <div className='flex justify-start gap-3 items-center '>
                                <History/>
                                <p className='font-poppins '>Activity Log</p>
                            </div>
                        ):(<History className='m-auto'/>)
                    }
                </NavLink>
                {/* Members */}
                {userRole === "admin" && (
                    <NavLink to="/admin/members" onClick={() => setShowSettings(false)} className={({ isActive }) => isActive ? 'relative cursor-pointer text-white bg-blue-500 px-3 py-3 rounded-lg font-medium ' : 'relative px-3 py-3  cursor-pointer text-gray-500 hover:bg-gray-100 rounded-lg'}>
                        {
                            showSideBar ? (
                                <div className='flex justify-start gap-3 items-center '>
                                    <UsersRound/>
                                    <p className='font-poppins '>Members</p>
                                </div>
                            ):(<UsersRound className='m-auto'/>)
                        }
                    </NavLink>
                )}
            </div>
            {/* settings */}
            <div 
                className='relative w-10/12 mb-3 cursor-pointer  px-3 py-3 text-gray-500 hover:bg-gray-100 rounded-lg' 
                onClick={() => setShowSettings(!showSettings)}
            >
                {
                    showSideBar 
                    ?(
                        <div className='flex  justify-start gap-3 items-center '>
                            <Settings strokeWidth={2} />
                            <p className='font-poppins font-semibold'>Settings</p>
                        </div>
                    ):(
                        <Settings strokeWidth={2} className='m-auto'/>
                    )
                }
                {showSettings && (
                    <div className={`text-gray-700 absolute z-999 w-48  pt-2 overflow-hidden bottom-0 bg-white border border-gray-400 rounded-md ${showSideBar ? 'left-32' : 'left-16'} `}>
                        {/* userName */}
                        <div className='flex items-center gap-3 cursor-default border-b border-gray-400 px-3 pb-2'>
                            <div className='bg-gray-200  w-9 h-9 border-2 border-blue-300  rounded-full flex justify-center items-center'>
                                <p className='text-lg font-semibold text-gray-600'> {firstLetters} </p> 
                            </div>
                            <div className='font-medium text-gray-600 max-w-2/3  truncate'>
                                <p>{user.name && user.name}</p>
                            </div>
                        </div>
                        <Link className='flex items-center gap-3 hover:bg-gray-100 py-2 pt-2 px-3'>
                            <div><UserRound size={20}  /></div>
                            <div>View Profile</div>
                        </Link>
                        <Link className='flex items-center gap-3 hover:bg-gray-100 py-2 pt-2 px-3'>
                            <div><Settings size={20}  /></div>
                            <div>Settings</div>
                        </Link>
                        <div
                            onClick={() => handleLogout()} 
                            className='flex items-center gap-3 hover:bg-gray-100 py-2 px-3 text-red-500'>
                            <div>
                                <LogOut  size={23} />
                            </div>
                            <div>
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>

        {/* navbar for mobile phone */}
        <nav className='lg:hidden z-50   flex justify-between items-center bg-blue-500 w-full fixed top-0 py-4'>
            <div
                onClick={() => setShowMenu(!showMenu)}
                className="relative px-4"
            >
                <Menu size={37} color="white" />
                {showMenu && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className='absolute overflow-y-scroll   bg-white border border-gray-200 shadow-lg top-[53px] left-0  w-64 h-[91vh] text-gray-600 text-xl font-semibold px-4  flex flex-col justify-between'>
                        <div className='flex flex-col  gap-3 py-3'>
                            <NavLink 
                                to="/admin"
                                className={({isActive}) => isActive && window.location.pathname === "/admin" ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}>
                                {/* className={`flex items-center gap-3 px-4 py-3 ${(isActive) ? 'bg-blue-100' : 'bg-white'}`} */}
                                <div><House size={30}/></div>
                                <div>Home</div>
                            </NavLink>
                            <NavLink
                                to="/admin/items" 
                                className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                                // className='flex items-center gap-3 px-4 py-3'
                            >
                                <div><Package size={30}/> </div>
                                <div>Items</div>
                            </NavLink>
                            <NavLink
                                to="/admin/search"
                                className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                                // className='flex items-center gap-3  px-4 py-3'
                            >
                                <div><Search size={30}/></div>
                                <div>Search</div>
                            </NavLink>
                            <NavLink
                                to="/admin/orders" 
                                className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                                // className='flex items-center gap-3 px-4 py-3'
                            >
                                <div><ShoppingCart size={30}/></div>
                                <div>Orders</div>
                            </NavLink>
                            <NavLink
                                to="/admin/reports" 
                                className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                                // className='flex items-center gap-3 px-4 py-3'
                            >
                                <div><SquareKanban className='rotate-180' size={30}/></div>
                                <div>Reports</div>
                            </NavLink>
                            <NavLink
                                to="/admin/activities"
                                className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                                // className='flex items-center gap-3 px-4 py-3'
                            >
                                <div><FileClock size={30}/></div>
                                <div>Activity Log</div>
                            </NavLink>
                            <NavLink
                                to="/admin/members"
                                className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                                // className='flex items-center gap-3 px-4 py-3'
                            >
                                <div><UsersRound size={30}/></div>
                                <div>Members</div>
                            </NavLink>
                            <div
                                // className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-200 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3  '}
                                className='flex items-center gap-3 px-4 py-3'
                            >
                                <div><Settings size={30}/></div>
                                <div>Settings</div>
                            </div>
                            
                        </div>
                        <div>
                            <div className='flex flex-col  justify-center border-t border-gray-400 px-3 py-4'>
                                {/* first letter of userName */}
                                <div className='flex justify-between items-center'>
                                    <div  className='flex gap-3 items-center'>
                                        <div className='bg-gray-200 w-9 h-9 border-2 border-blue-300  rounded-full flex justify-center items-center'>
                                            <p className='text-lg font-semibold text-gray-600'>HB</p> 
                                        </div>
                                        <div className='text-base flex items-center font-medium text-gray-600'>
                                            <p>Hafsa Barhoud</p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setShowSignOut(!showSignOut)}
                                        className=''
                                    >
                                        <ChevronDown size={28} />
                                    </div>
                                </div> 
                                    {showSignOut && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className='text-red-600 text-base  flex items-center justify-center gap-3 py-3 '>
                                            <div>
                                                <LogOut  size={23} />
                                            </div>
                                            <div>
                                                <p>Sign Out</p>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='text-white font-semibold text-3xl '>
                <p>Novexa</p>
            </div>
            <Link to={"/admin"} className='px-4 flex justify-center items-center   text-blue-500 font-semibold'>
                <CircleUserRound size={35} color='white' />
            </Link>
        </nav>
        <div className={` mx-0 w-full lg:w-10/12 lg:px-0 px-2 lg:mr-6 lg:mt-3 mt-20  ${showSideBar ? 'lg:w-10/12 lg:ml-52' : 'lg:w-11/12 lg:ml-26'}`}>
            <Outlet/>
        </div>
        
    </div>
  )
}

export default SideBar

