import { ChevronDown, FileClock, House, LogOut, Menu, Package, Search, Settings, ShoppingCart, SquareKanban, UsersRound, CircleUserRound, UserRound, User } from 'lucide-react'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import Notifications from './Dashboard/Notifications'

function Navbar({firstLetters, userName}) {
    const [showSignOut, setShowSignOut] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')  
        navigate('/')                
    }
  return (
    <nav className='lg:hidden z-50   flex justify-between items-center bg-blue-500 w-full fixed top-0 py-4'>
        {/* navbar for mobile phone */}
        <div
            onClick={() => setShowMenu(!showMenu)}
            className="relative px-4"
        >
            <Menu size={35} color="white" />
            {showMenu && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    // h-[91vh]
                    className='absolute overflow-y-scroll   bg-white border border-gray-200 shadow-lg top-[53px] left-0  w-64 h-[91vh] text-gray-600 text-xl font-poppins px-4  flex flex-col justify-between'>
                    <div className='flex flex-col  gap-3 py-3 mt-4'>
                        <NavLink 
                            to="/admin"
                            onClick={() => setShowMenu(false)}
                            className={({isActive}) => isActive && window.location.pathname === "/admin" ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}>
                            <div><House size={27}/></div>
                            <div>Home</div>
                        </NavLink>
                        <NavLink
                            to="/admin/items"
                            onClick={() => setShowMenu(false)} 
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><Package size={27}/> </div>
                            <div>Items</div>
                        </NavLink>
                        {/* <NavLink
                            to="/admin/search"
                            onClick={() => setShowMenu(false)}
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><Search size={30}/></div>
                            <div>Search</div>
                        </NavLink> */}
                        <NavLink
                            to="/admin/orders" 
                            onClick={() => setShowMenu(false)}
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><ShoppingCart size={27}/></div>
                            <div>Orders</div>
                        </NavLink>
                        <NavLink
                            to="/admin/reports"
                            onClick={() => setShowMenu(false)} 
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><SquareKanban className='rotate-180' size={30}/></div>
                            <div>Reports</div>
                        </NavLink>
                        <NavLink
                            to="/admin/activities"
                            onClick={() => setShowMenu(false)}
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><FileClock size={28}/></div>
                            <div>Activity Log</div>
                        </NavLink>
                        <NavLink
                            to="/admin/members"
                            onClick={() => setShowMenu(false)}
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><UsersRound size={27}/></div>
                            <div>Members</div>
                        </NavLink>
                        {/* <NavLink
                            to="/admin/profile"
                            onClick={() => setShowMenu(false)}
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><UserRound size={28}/></div>
                            <div>Profile</div>
                        </NavLink> */}
                        <NavLink
                            to="/admin/profile"
                            onClick={() => setShowMenu(false)}
                            // className='flex items-center gap-3 px-4 py-3'
                            className={({isActive}) => isActive ? 'flex items-center gap-3 px-4 py-3 bg-blue-100 text-blue-500 rounded-lg' : 'flex items-center gap-3 px-4 py-3 '}
                        >
                            <div><UserRound size={27}/></div>
                            <div>Profile</div>
                        </NavLink>
                        
                    </div>
                    <div>
                        <div className='flex flex-col  justify-center border-t border-gray-400 px-3 py-4'>
                            {/* first letter of userName */}
                            <div className='flex justify-between items-center'>
                                <div  className='flex gap-3 items-center'>
                                    <div className='bg-gray-200 w-9 h-9 border-2 border-blue-300 rounded-full flex justify-center items-center'>
                                        <p className='text-lg font-semibold text-gray-600'>{firstLetters}</p> 
                                    </div>
                                    <div className='text-base flex items-center font-medium text-gray-600'>
                                        <p> {userName} </p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setShowSignOut(!showSignOut)}
                                    className=''
                                >
                                    {/* <ChevronDown size={27} /> */}
                                </div>
                            </div> 
                            <div
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleLogout()
                                }}
                                className='text-red-600 text-base  flex items-center  gap-4 pt-5 pb-3 px-3 '>
                                <div>
                                    <LogOut  size={23} />
                                </div>
                                <div>
                                    <p>Sign Out</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className='text-white flex justify-center items-center gap-2 font-semibold text-3xl '>
            <img className='h-12' src="/images/newLogo4.png" alt="" />
            <p>Novexa</p>
        </div>
        {/* <Link to={"/admin"} className='px-4 flex justify-center items-center   text-blue-500 font-semibold'>
            <CircleUserRound size={35} color='white' />
        </Link> */}
        <div className='flex justify-center items-center '>
            <Notifications/>
        </div>
    </nav>
  )
}

export default Navbar
