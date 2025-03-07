import React, {useState, useEffect} from 'react'
import { Menu } from 'lucide-react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'

function Nav(props) {
    const [categories, setCategories] = useState([])
    const [showMenu, setShowMenu] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showFavorite, setShowFavorite] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // fetch categories
        axios.get("https://dummyjson.com/products/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }, [showMenu, showFavorite, showCart]);

  return (
    <div>
        <nav  className=' z-50 bg-black text-white  border-b border-gray-300  w-full shadow-md fixed top-0 py-3'>
            <div className='flex justify-between items-center px-5'>
                <div className='w-1/3 flex justify-start'>
                    <Link to="/" className=' gap-1.5 flex justify-center  items-center'>
                        <h2 className=' text-5xl font-mono '>Novexa</h2>
                    </Link>
                </div>
                <div className='w-1/3 text-lg font-semibold flex justify-center  gap-9 text-stone-300 '>
                    <Link to={"/"} >Home</Link>
                    <Link to={"/products"} >Products</Link>
                    <Link to={"/ContactUs"} >Contact Us</Link>
                </div>
                <div className=' w-1/3 flex justify-end items-center' >
                    <Link to={"/login"} className='text-lg font-semibold border-2 px-4 py-1 rounded-full hover:bg-white hover:text-black hover:px-8 hover:mr-0 mr-2'>
                        <p>LogIn</p>
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
                                        <div className='absolute right-0 top-9 mt-2 w-60 py-4 rounded-md bg-white border border-gray-500 overflow-y-scroll h-[80vh]' >
                                            <ul className='flex flex-col'>
                                            {
                                                categories.map((v, index) => (
                                                    

                                                    <Link onClick={() => setShowMenu(false)} to={`/products/${v.slug}`} key={index} className='text-lg font-medium text-black pl-4 border-b py-3 hover:bg-black hover:text-white' role='menuitem ' tabindex="-1">
                                                        <p >{v.name} </p>
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
        <div className=''>
            <Outlet/>
        </div>
    </div>
  )
}

export default Nav
