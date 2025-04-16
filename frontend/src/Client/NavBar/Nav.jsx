import React, {useState, useEffect} from 'react'
import { CircleUserRound, Heart, Menu, Search, ShoppingCart } from 'lucide-react'
import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom'
import axios from 'axios'
import Cart from './Cart'
import {useCart} from '../../CartContext'
import CategoriesMenu from './CategoriesMenu'
import Favorites from './Favorites'
import SearchInput from '../Search/SearchInput'

function Nav(props) {
    const [categories, setCategories] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showFavorite, setShowFavorite] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const {cart, favorites} = useCart()
    const navigate = useNavigate()

    const fetchData = () => {
        // fetch categories
        axios.get("http://localhost:3003/admin/items/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        fetchData()
    }, []);

  return (
    <div>
        <div className='z-50 border-b border-gray-300  w-full shadow-md fixed top-0'>
            <nav className="bg-black text-white lg:px-6 px-3 py-3 w-full shadow-md ">
                <div className="flex items-center justify-between w-full">
    
                    {/* Left side: Logo + NavLinks */}
                    <div className={`flex items-center gap-8 lg:w-2/3 ${props.details ? 'w-1/2' : 'w-full'} `}>
                        {/* Logo */}
                        <Link to="/" className={`flex items-center gap-2 outline-none  lg:w-1/2 ${!props.details && 'w-full flex lg:justify-start justify-center'} `}>
                            <div className="lg:h-10 lg:w-10 w-9 h-9 overflow-hidden">
                            <img src="/images/N1.png" className="w-full h-full object-cover" alt="Logo" />
                            </div>
                            <h2 className="text-3xl font-poppins font-bold bg-gradient-to-r from-white via-stone-400 to-stone-500 bg-clip-text text-transparent">
                            Novexa
                            </h2>
                        </Link>
                        {/* NavLinks - Desktop */}
                        <div className={`hidden lg:flex gap-6 text-base font-medium lg:w-1/2 justify-center`}>
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" : "text-stone-400 hover:text-white"}>
                                Home
                            </NavLink>
                            <NavLink 
                                to="/products" 
                                className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" : "text-stone-400 hover:text-white"}>
                                Products
                            </NavLink>
                            <NavLink 
                                to="/ContactUs" 
                                className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" : "text-stone-400 hover:text-white"}>
                                Contact Us
                            </NavLink>
                        </div>
                        {/* {!props.details && (
                            <div className='w-1/3'></div>
                        )} */}
                    </div>
                    {props.details && (
                        <div className="flex items-center justify-end gap-4 lg:w-1/3 w-1/2">
                            {/* Search */}
                            {/* <div className="lg:flex hidden items-center border border-stone-500 rounded-full px-3 py-1 w-7/12">
                                <input 
                                    type="search" 
                                    placeholder="Search for Products"
                                    className="bg-transparent text-sm text-white placeholder-stone-400 outline-none w-full" 
                                />
                                <button className="bg-white text-black rounded-full px-3 py-1 ml-2">
                                    <Search size={18} />
                                </button>
                            </div> */}
                            {/* Icons */}
                            <div className="flex items-center lg:gap-5 gap-3 text-white">

                                {/* search */}
                                <div 
                                    onClick={() => {
                                        setShowSearch(true)
                                        setShowFavorite(false);
                                        setShowCart(false);
                                        setShowMenu(false);
                                    }}
                                >
                                    <Search size={24}/>
                                </div>
                                {showSearch && <SearchInput setShowSearch={setShowSearch} />}
                                {/* Favorite */}
                                <div 
                                    onClick={() => {
                                        setShowFavorite(!showFavorite);
                                        setShowCart(false);
                                        setShowMenu(false);
                                        setShowSearch(false);
                                    }}
                                    className="cursor-pointer relative"
                                >
                                    <Heart size={24} />
                                    {favorites.length > 0 &&  (
                                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full text-xs px-2 py-0.5">
                                            {favorites.length}
                                        </span>
                                    )}
                                </div>
                                {showFavorite && <Favorites setShowFavorite={setShowFavorite} />}

                                {/* Cart */}
                                <div 
                                    onClick={() => {
                                        setShowCart(!showCart);
                                        setShowMenu(false);
                                        setShowFavorite(false);
                                        setShowSearch(false);
                                    }}
                                    className="cursor-pointer relative"
                                >
                                    <ShoppingCart size={24} />
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full text-xs px-2 py-0.5">
                                        {cart.length}
                                    </span>
                                </div>
                                {showCart && <Cart setShowCart={setShowCart} />}

                                {/* Menu */}
                                <div className="realtive">
                                    <button onClick={() => {
                                        setShowMenu(!showMenu);
                                        setShowFavorite(false);
                                        setShowCart(false);
                                        setShowSearch(false);
                                    }}>
                                        <Menu size={30} />
                                    </button>
                                    {showMenu && <CategoriesMenu categories={categories} setShowMenu={setShowMenu} />}
                                </div>
                            </div>
                        </div>
                    )}
                    
                </div>
                {/* Mobile Links */}
                <div className="lg:hidden flex justify-center gap-6 mt-5 text-sm font-medium">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive 
                            ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" 
                            : "text-stone-300 hover:text-white"}>
                        Home
                    </NavLink>
                    <NavLink 
                        to="/products" 
                        className={({ isActive }) => isActive 
                            ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" 
                            : "text-stone-300 hover:text-white"}>
                        Products
                    </NavLink>
                    <NavLink 
                        to="/ContactUs" 
                        className={({ isActive }) => isActive 
                            ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" 
                            : "text-stone-300 hover:text-white"}>
                        Contact Us
                    </NavLink>
                </div>
            </nav>

            {/* search, favorite, cart */}
            <div className='w-full'>
                {props.details && (
                    <div className='bg-white w-full text-black flex justify-between '>
                        <div className='w-1/3'></div>
                        {/* search */}
                        {/* <div className='w-1/3 border rounded-full flex justify-between items-center pl-3 pr-[1px] py-[1px]'>
                            <input
                                className='outline-none'
                                type="search" 
                                name="inputSearch" 
                                id="inputSearch"
                                placeholder='Search for Products'
                            />
                            <button className='bg-black rounded-full text-white px-4  my-[0.2px] py-2 cursor-pointer'>
                                <Search size={19} />
                            </button>
                        </div> */}
                        
                    </div>
                )}
            </div>
        </div>
        <div className=''>
            <Outlet/>
        </div>
    </div>
  )
}

export default Nav
