import React, {useState, useEffect} from 'react'
import { CircleUserRound, Heart, Menu, Search, ShoppingCart } from 'lucide-react'
import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom'
import axios from 'axios'
import Cart from './Cart'
import {useCart} from '../CartContext'

function Nav(props) {
    const [categories, setCategories] = useState([])
    const [login, setLogin] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showFavorite, setShowFavorite] = useState(false)
    const {cart} = useCart()
    const navigate = useNavigate()
    /*
    const [cart, setCart] = useState(() => {
        // load car from local storage on first render
        const savedCart = localStorage.getItem("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })
        */
    const fetchData = () => {
        // fetch categories
        axios.get("http://localhost:3003/admin/items/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    useEffect(() => {
        fetchData()
        // localStorage.setItem("cart", JSON.stringify(cart))
    }, []);

  return (
    <div>
        <div className='z-50 border-b border-gray-300  w-full shadow-md fixed top-0'>
            <nav  className='  bg-black text-white   py-3'>
                <div className='flex justify-between items-center px-5'>
                    <div className='lg:w-1/3 flex justify-start'>
                        <Link to="/" className=' gap-1.5 flex justify-center  items-center outline-none'>
                            <h2 className='text-4xl lg:text-5xl font-mono '>Novexa</h2>
                        </Link>
                    </div>
                    {/* links in laptop version */}
                    <div className=' w-1/3 text-lg font-semibold lg:flex hidden justify-center  gap-9  '>
                        <NavLink 
                            to={"/"}
                            className={({isActive}) => isActive ? 'border-b border-white  text-white' : 'text-stone-400'}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to={"/products"}
                            className={({isActive}) => isActive ? 'border-b border-white  text-white' : 'text-stone-400'}
                        >
                            Products
                        </NavLink>
                        <NavLink 
                            to={"/ContactUs"}
                            className={({isActive}) => isActive ? 'border-b border-white  text-white' : 'text-stone-400'}
                        >
                            Contact Us
                        </NavLink>
                    </div>
                    {/* links in mobile version */}
                    <div className=' text-lg font-semibold flex gap-5 lg:hidden justify-center items-center  lg:gap-9 text-stone-300 '>
                        <Link to={"/"} >Home</Link>
                        <Link to={"/products"} >Products</Link>
                        <Link to={"/ContactUs"} >Contact Us</Link>
                    </div>
                    <div className='relative lg:w-1/3 flex justify-end items-center ' >
                        {/* <Link to={"/login"} className='lg:flex hidden text-lg font-semibold border-2 px-4 py-1 rounded-full hover:bg-white hover:text-black hover:px-8 hover:mr-0 mr-2'>
                            <p>LogIn</p>
                        </Link> */}
                        {/* login link for laptop version */}
                        <div
                            onClick={() => setLogin(!login)}
                            // to={"/login"} 
                            className=''>
                            <CircleUserRound size={35} />
                            {login && (
                                <div className='border border-gray-300 cursor-pointer shadow-lg absolute z-50 top-10 right-0 rounded-2xl bg-white text-black w-64 px-3 py-3 flex flex-col'>
                                    <Link to="/login" className='bg-black text-white font-semibold text-lg rounded-full  text-center py-1.5'>Sign in</Link>
                                    <Link to="/signUp" className='text-gray-500 text-center mt-1 text-base'>Register</Link>
                                </div>
                            )}
                        </div>
                        {/* login link for mobile version */}
                        <Link to={"/login"} className='flex lg:hidden  '>
                            <CircleUserRound size={32} />
                        </Link>
                        {
                            props.details && (
                                <div className=''>
                                    <div className='relative flex items-center pl-5' >
                                        <button className='cursor-pointer' type='button' onClick={() => setShowMenu(!showMenu)}>
                                            <Menu size={35} className='' aria-hidden="true" />
                                        </button>
                                        {/* Comment *** Dropdown menu */}
                                        {showMenu && (
                                            <div className='absolute right-0 top-9 z-50 mt-2 w-60 py-4 rounded-md bg-white border border-gray-400 overflow-y-scroll max-h-[80vh]' >
                                                <ul className='flex flex-col'>
                                                {
                                                    categories.map((category, index) => (
                                                        <Link onClick={() => setShowMenu(false)} to={`/products/${category.categoryName}`} key={index} className='text-lg font-medium text-black pl-4 border-b border-stone-400 py-3 hover:bg-black hover:text-white' role='menuitem ' >
                                                            <p >{category.categoryName} </p>
                                                        </Link>
                                                    ))
                                                }
                                                </ul>
                                            </div>
                                            )
                                        }
                                    </div>
                                </div>
                            )        
                        }
                    </div>
                </div>  
            </nav>
            {/* serach, favorite, cart */}
            <div className='w-full'>
                {props.details && (
                    <div className='bg-white w-full text-black flex justify-between py-2 px-5'>
                        <div className='w-1/3'></div>
                        {/* search */}
                        <div className='w-1/3 border rounded-full flex justify-between items-center pl-3 pr-[1px] py-[1px]'>
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
                        </div>
                        <div className='w-1/3 flex justify-end items-center'>
                            <div className=' cursor-pointer mr-4'>
                                <Heart  size={28}/>
                            </div>
                            <div
                                onClick={() => setShowCart(!showCart)}
                                className='cursor-pointer relative flex justify-center items-center gap-1.5 text-sm'
                            >
                                <ShoppingCart size={28} />
                                <div className='absolute bottom-4 left-4 bg-black text-white rounded-full flex justify-center items-center h-4 px-2'>
                                    <p >{cart.length}</p>
                                </div>
                            </div>
                            {
                                showCart && (
                                <Cart setShowCart={setShowCart} />
                            )
                            }
                        </div>
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
