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
    // const [categories, setCategories] = useState([])
    // const [showLogin, setShowLogin] = useState(false)
    // const [showMenu, setShowMenu] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showFavorite, setShowFavorite] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const {cart, favorites} = useCart()
    const navigate = useNavigate()
    /*
    const fetchData = () => {
        axios.get("http://localhost:3003/admin/items/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        fetchData()
    }, []);
    */

  return (
    <div>
        <div className='z-50   w-full shadow-md fixed top-0'>
            <nav className="bg-black text-white lg:px-6 px-3 lg:py-4 py-3 w-full shadow-md ">
                <div className="flex items-center justify-between w-full">
    
                    {/* Left side: Logo + NavLinks */}
                    <div className={`flex items-center  gap-8 lg:w-2/3 ${props.details ? 'w-1/2' : 'w-full'} `}>
                        {/* Logo */}
                        <Link 
                            to="/"
                            onClick={() => window.scrollTo(0, 0)} 
                            className={`flex items-center gap-2 outline-none  lg:w-1/2 ${!props.details && 'w-full flex lg:justify-start justify-center'} `}
                        >
                            <div className="lg:h-12 lg:w-12 w-9 h-9 overflow-hidden">
                            {/* <img src="/images/N1.png" className="w-full h-full object-cover" alt="Logo" /> */}
                            <img src="/images/newLogo4.png" className="w-full h-full object-cover" alt="Logo" />
                            </div>
                            {/* <h2 className="text-3xl font-poppins font-bold bg-gradient-to-r from-white via-stone-400 to-stone-500 bg-clip-text text-transparent">
                            Novexa
                            </h2> */}
                            <h2 className="text-4xl font-semibold tracking-wide text-white font-sans">
                                Novexa
                                {/* NOVEXA */}
                            </h2>
                        </Link>
                        {/* NavLinks - Desktop */}
                        <div className={`hidden lg:flex gap-6 text-base font-medium lg:w-1/2 justify-center `}>
                            <NavLink 
                                to="/"
                                onClick={() => window.scrollTo(0, 0)}  
                                className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300 pb-1 text-lg" : "text-white hover:text-yellow-300  text-lg"}>
                                Home
                            </NavLink>
                            <NavLink 
                                to="/products"
                                onClick={() => window.scrollTo(0, 0)}  
                                className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300 pb-1 text-lg" : "text-white hover:text-yellow-300  text-lg"}>
                                Products
                            </NavLink>
                            <NavLink 
                                to="/ContactUs"
                                onClick={() => window.scrollTo(0, 0)}  
                                className={({ isActive }) => isActive ? "text-yellow-300 border-b-2 border-yellow-300 pb-1 text-lg" : "text-white hover:text-yellow-300  text-lg"}>
                                Contact Us
                            </NavLink>
                        </div>
                    </div>
                    {!props.details && (
                        <Link to="/login" className=' lg:block hidden w-1/3 text-end text-black'>Login</Link>
                    )} 
                    {props.details && (
                        <div className="flex items-center justify-end gap-4 lg:w-1/3 w-1/2">
                            {/* Icons */}
                            <div className="flex items-center lg:gap-5 gap-3 text-white">
                                {/* search */}
                                <div 
                                    onClick={() => {
                                        setShowSearch(true)
                                        setShowFavorite(false);
                                        setShowCart(false);
                                        // setShowMenu(false);
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
                                        // setShowMenu(false);
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
                                        // setShowMenu(false);
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
                                {/* Menu
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
                                </div> */}
                            </div>
                        </div>
                    )}
                    
                </div>
                {/* Mobile Links */}
                <div className="lg:hidden flex justify-center gap-6 mt-5 text-sm font-medium">
                    <NavLink 
                        to="/"
                        onClick={() => window.scrollTo(0, 0)}  
                        className={({ isActive }) => isActive 
                            ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" 
                            : "text-white hover:text-yellow-300"}>
                        Home
                    </NavLink>
                    <NavLink 
                        to="/products"
                        onClick={() => window.scrollTo(0, 0)}  
                        className={({ isActive }) => isActive 
                            ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" 
                            : "text-white hover:text-text-yellow-300"}>
                        Products
                    </NavLink>
                    <NavLink 
                        to="/ContactUs"
                        onClick={() => window.scrollTo(0, 0)}  
                        className={({ isActive }) => isActive 
                            ? "text-yellow-300 border-b-2 border-yellow-300 pb-1" 
                            : "text-white hover:text-yellow-300"}>
                        Contact Us
                    </NavLink>
                </div>
            </nav>
        </div>
        <div className=''>
            <Outlet/>
        </div>
    </div>
  )
}

export default Nav
