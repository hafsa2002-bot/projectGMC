import { ArrowRight, Search, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../CartContext'

function SearchInput({setShowSearch}) {
    const [searchValue, setSearchValue] = useState("")
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [productsSearched, setProductsSearched] = useState([])
    const [categoriesSearched, setCategoriesSearched] = useState([])
    const navigate = useNavigate()
    const {currency} = useCart()
    const apiUrl = import.meta.env.VITE_API_URL;

    const getProducts = () => {
        axios.get(`${apiUrl}/admin/items/list`)
            .then(response => setProducts(response.data))
            .catch(error => console.log("Error: ", error))
    }

    const filterProducts = (name) => {
        const result = products?.filter(product => product.productName.toLowerCase().includes(name.toLowerCase()))
        setProductsSearched(result)
        console.log("products result: ", result)
    }

    const getCategories = () => {
        axios.get(`${apiUrl}/admin/items/categories`)
            .then(response => setCategories(response.data))
            .catch(error => console.log("Error: ", error))
    }
    
    const filterCategories = (name) => {
        const result = categories?.filter(category => category.categoryName.toLowerCase().includes(name.toLowerCase()))
        setCategoriesSearched(result)
        console.log("categories result: ", result)
    }

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])


  return (
    <div
        className="w-screen h-screen z-50 fixed top-0 right-0 flex justify-start items-start text-gray-800"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
        <div className="bg-white relative w-full py-5 flex justify-center items-center border-b border-gray-300 gap-3 px-4">
            <div className="lg:w-1/2 w-11/12 relative rounded-full py-2.5 pr-3 pl-4 border border-gray-400 flex justify-between items-center bg-white shadow-md">
                <input
                    type="search"
                    name="searchValue"
                    id="searchValue"
                    value={searchValue}
                    autoComplete="off"
                    onChange={(event) => {
                        setSearchValue(event.target.value)
                        if(event.target.value != ""){
                            filterCategories(event.target.value)
                            filterProducts(event.target.value)
                        }
                    }}
                    placeholder="Recherche"
                    className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                />
                <button>
                    <Search size={20} className="text-gray-600 hover:text-black" />
                </button>
                {/* search suggestions (categories, products) */}
                {
                    searchValue !== "" && (
                        <div className='absolute bg-white border border-gray-400 w-full left-0 rounded-xl px-5 py-3 mt-1 top-10 overflow-y-scroll hide-scrollbar h-[84vh] lg:h-auto  '>
                            <div className=' lg:flex  gap-6'>
                                {
                                    categoriesSearched.length > 0 
                                    && (
                                        <div className='lg:w-2/5 px-2'>
                                            <p className='border-b border-gray-300 text-gray-500 text-sm pb-1 mb-1.5'>CATEGORIES</p>
                                            <ul className=''>
                                                {
                                                    categoriesSearched.slice(0, 7).map((category, index) => (
                                                        <li key={index} className='py-2 font-semibold hover:bg-gray-100 hover:underline px-2 cursor-pointer' >
                                                            <div onClick={() => {
                                                                setShowSearch(false)
                                                                window.scrollTo(0, 0)
                                                                navigate(`/products/category/${category.categoryName}`)
                                                            }}
                                                            >
                                                                {category.categoryName}
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                                {
                                    productsSearched.length > 0 
                                    && (
                                        <div className='lg:w-3/5 px-2 '>
                                            <p className='border-b border-gray-300 text-gray-500 text-sm pb-1 mb-1.5 lg:pt-0 pt-5'>PRODUITS</p>
                                            <ul className='w-full '>
                                                {
                                                    productsSearched.slice(0, 7).map((product, index) => (
                                                        <li key={index} >
                                                            <div className='py-2 w-full flex gap-3 hover:bg-gray-50 cursor-pointer px-2'
                                                                onClick={() => {
                                                                    setShowSearch(false)
                                                                    navigate(`/products/${product._id}`)
                                                                }}
                                                            >
                                                                <div className='w-12 h-12 p-0.5 border border-gray-300 rounded-lg overflow-hidden'>
                                                                    <img className='w-full h-full' src={`${apiUrl}${product.productPhoto}`} alt={`${product.productName}`} />
                                                                </div>
                                                                <div className='lg:w-10/12 w-9/12'>
                                                                    <div className='font-semibold hover:underline truncate  max-w-11/12'>{product.productName}</div>
                                                                    <div className='text-gray-500 text-sm'> {product.price} {currency} </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                {categoriesSearched.length == 0 && productsSearched.length == 0 && (
                                    <div className='font-semibold text-gray-600 text-xl py-6 px-3'> 0 result for « {searchValue} »</div>
                                )}
                            </div>
                            {/* <div>
                                <div>Search "{searchValue}"</div>
                                <div><ArrowRight/></div>
                            </div> */}
                        </div>
                    )
                }
            </div>
            <div onClick={() => setShowSearch(false)}>
                <X/>
            </div>
        </div>
    </div>
  )
}

export default SearchInput
